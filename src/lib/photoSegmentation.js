let worker, sequence = 0
const pending = new Map()
export function segmentFish(pixels, bounds, core) {
  if (!worker) {
    worker = new Worker(`${import.meta.env.BASE_URL}photo-segmentation-worker.js`)
    worker.onmessage = ({ data }) => {
      const job = pending.get(data.id)
      if (!job) return
      pending.delete(data.id)
      if (data.error) job.reject(new Error(data.error))
      else job.resolve(new Uint8Array(data.alpha))
    }
    worker.onerror = () => {
      pending.forEach(job => job.reject(new Error('Photo segmentation worker failed')))
      pending.clear(); worker.terminate(); worker = undefined
    }
  }
  return new Promise((resolve, reject) => {
    const id = sequence++, data = new Uint8ClampedArray(pixels.data)
    pending.set(id, { resolve, reject })
    worker.postMessage({ id, buffer: data.buffer, width: pixels.width, height: pixels.height, bounds, core }, [data.buffer])
  })
}
