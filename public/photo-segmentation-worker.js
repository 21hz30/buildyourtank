// OpenCV runs in a worker so photo isolation never stops fish or UI animation.
importScripts('vendor/opencv.js')
const ready = new Promise(resolve => {
  if (self.cv.Mat) resolve(true)
  else self.cv.onRuntimeInitialized = () => resolve(true)
})
let queue = Promise.resolve()
self.onmessage = ({ data }) => {
  queue = queue.then(async () => {
    await ready
    const { id, buffer, width, height, bounds, core } = data
    let src, rgb, mask, bg, fg
    try {
      const cv = self.cv
      src = cv.matFromImageData({ data: new Uint8ClampedArray(buffer), width, height })
      rgb = new cv.Mat(); cv.cvtColor(src, rgb, cv.COLOR_RGBA2RGB)
      mask = new cv.Mat(); bg = new cv.Mat(); fg = new cv.Mat()
      const x = Math.max(1, Math.floor(bounds[0] * width)), y = Math.max(1, Math.floor(bounds[1] * height))
      const right = Math.min(width - 1, Math.ceil(bounds[2] * width)), bottom = Math.min(height - 1, Math.ceil(bounds[3] * height))
      cv.grabCut(rgb, mask, new cv.Rect(x, y, right - x, bottom - y), bg, fg, 3, cv.GC_INIT_WITH_RECT)
      let visible = 0
      for (let i = 0; i < mask.data.length; i++) if (mask.data[i] === 1 || mask.data[i] === 3) visible++
      if (visible < 8) {
        // Camouflaged fish need a small body sample to distinguish them from
        // similarly colored leaves and stones in their source photograph.
        mask.data.fill(0)
        for (let py = y; py < bottom; py++) for (let px = x; px < right; px++) mask.data[py * width + px] = 3
        const centerX = core ? core[0] * width : (x + right) / 2, centerY = core ? core[1] * height : (y + bottom) / 2
        const radiusX = Math.max(2, (right-x)*.055), radiusY = Math.max(2, (bottom-y)*.055)
        for (let py = y; py < bottom; py++) for (let px = x; px < right; px++) if (((px-centerX)/radiusX)**2 + ((py-centerY)/radiusY)**2 < 1) mask.data[py * width + px] = 1
        cv.grabCut(rgb, mask, new cv.Rect(), bg, fg, 3, cv.GC_INIT_WITH_MASK)
      }
      const alpha = new Uint8Array(width * height)
      for (let i = 0; i < alpha.length; i++) alpha[i] = (mask.data[i] === 1 || mask.data[i] === 3) ? 255 : 0
      // Keep the photographed animal, removing isolated pebbles, bubbles and
      // leaf fragments without discarding connected fins or barbels.
      const visited = new Uint8Array(alpha.length), stack = new Int32Array(alpha.length)
      let largest = [], largestScore = -1
      for (let start = 0; start < alpha.length; start++) {
        if (!alpha[start] || visited[start]) continue
        let head = 0, tail = 1, score = 0
        stack[0] = start; visited[start] = 1
        const component = []
        while (head < tail) {
          const p = stack[head++], px = p % width, py = Math.floor(p / width)
          component.push(p)
          score += 1
          for (const dy of [-1,0,1]) for (const dx of [-1,0,1]) {
            const nx = px+dx, ny = py+dy, q = ny*width+nx
            if (nx >= 0 && nx < width && ny >= 0 && ny < height && alpha[q] && !visited[q]) { visited[q] = 1; stack[tail++] = q }
          }
        }
        if (score > largestScore) { largest = component; largestScore = score }
      }
      alpha.fill(0)
      for (const p of largest) alpha[p] = 255
      self.postMessage({ id, alpha: alpha.buffer }, [alpha.buffer])
    } catch (error) { self.postMessage({ id, error: String(error) }) }
    finally { src?.delete(); rgb?.delete(); mask?.delete(); bg?.delete(); fg?.delete() }
  })
}
