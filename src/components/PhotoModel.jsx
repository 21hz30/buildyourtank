import { useEffect, useMemo, useRef } from 'react'
import { fishPhotoSpec, photoMotion } from '../lib/photoModels'
import { photoTexture, subscribePhotoMotion } from '../lib/photoTextures'

function triangle(ctx, texture, a, b, c, pa, pb, pc, width, height) {
  const ax = a.x * width, ay = a.y * height, bx = b.x * width, by = b.y * height, cx = c.x * width, cy = c.y * height
  const det = (bx - ax) * (cy - ay) - (cx - ax) * (by - ay)
  if (Math.abs(det) < .001) return
  const xx = ((pb.x - pa.x) * (cy - ay) - (pc.x - pa.x) * (by - ay)) / det
  const xy = ((pc.x - pa.x) * (bx - ax) - (pb.x - pa.x) * (cx - ax)) / det
  const yx = ((pb.y - pa.y) * (cy - ay) - (pc.y - pa.y) * (by - ay)) / det
  const yy = ((pc.y - pa.y) * (bx - ax) - (pb.y - pa.y) * (cx - ax)) / det
  const center = { x: (pa.x + pb.x + pc.x) / 3, y: (pa.y + pb.y + pc.y) / 3 }
  const expand = p => { const distance = Math.hypot(p.x - center.x, p.y - center.y) || 1; return { x: p.x + (p.x - center.x) / distance * .45, y: p.y + (p.y - center.y) / distance * .45 } }
  const ea = expand(pa), eb = expand(pb), ec = expand(pc)
  ctx.save(); ctx.beginPath(); ctx.moveTo(ea.x, ea.y); ctx.lineTo(eb.x, eb.y); ctx.lineTo(ec.x, ec.y); ctx.closePath(); ctx.clip()
  ctx.transform(xx, yx, xy, yy, pa.x - xx * ax - xy * ay, pa.y - yx * ax - yy * ay)
  ctx.drawImage(texture, 0, 0, width, height); ctx.restore()
}

export default function PhotoModel({ item, type, onReady, onError }) {
  const ref = useRef(null)
  const ready = useRef(onReady), error = useRef(onError)
  ready.current = onReady; error.current = onError
  const spec = useMemo(() => type === 'fish' ? fishPhotoSpec(item) : { source: item.photo, plantType: item.plantType }, [item.id, item.photo, item.plantType, type])
  useEffect(() => {
    let disposed = false, unsubscribe, observer
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = true, texture
    const target = ref.current
    const stop = () => { unsubscribe?.(); unsubscribe = undefined }
    const draw = time => {
      if (!texture || disposed) return
      const ctx = target.getContext('2d'), w = target.width, h = target.height
      ctx.clearRect(0, 0, w, h)
      if (type !== 'fish' || reduced.matches || time === null) { ctx.drawImage(texture.canvas, 0, 0, w, h); return }
      const phase = [...(item.key || item.id)].reduce((n, char) => n + char.charCodeAt(0), 0) * .17
      const resting = target.closest('.fish-swim-space')?.dataset.state !== 'swimming'
      const t = time * (resting ? .65 : 1) + phase
      const cols = 14, rows = 8, nodes = [], warped = []
      for (let y = 0; y <= rows; y++) for (let x = 0; x <= cols; x++) {
        const point = { x: x / cols, y: y / rows }, moved = photoMotion(point.x, point.y, t, { middle: item.id === 'betta' ? .36 : .5 })
        nodes.push(point); warped.push({ x: moved.x * w, y: moved.y * h })
      }
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const a = y * (cols + 1) + x, b = a + 1, c = a + cols + 1, d = c + 1
        triangle(ctx, texture.canvas, nodes[a], nodes[b], nodes[c], warped[a], warped[b], warped[c], w, h)
        triangle(ctx, texture.canvas, nodes[b], nodes[d], nodes[c], warped[b], warped[d], warped[c], w, h)
      }
    }
    const update = () => {
      stop()
      if (texture && type === 'fish' && visible && !reduced.matches) unsubscribe = subscribePhotoMotion(draw)
      else draw(null)
    }
    photoTexture(spec, type, item.name).then(result => {
      if (disposed) return
      texture = result
      const scale = Math.min(1, 480 / result.canvas.width)
      target.width = Math.round(result.canvas.width * scale); target.height = Math.round(result.canvas.height * scale)
      target.dataset.photoState = 'ready'
      ready.current?.(result.aspectRatio)
      draw(null); update()
    }).catch(reason => { if (!disposed) { target.dataset.photoState = 'error'; target.dataset.photoError = reason.message; error.current?.() } })
    if (type === 'fish') {
      observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update() })
      observer.observe(target)
      reduced.addEventListener('change', update)
    }
    return () => { disposed = true; stop(); observer?.disconnect(); reduced.removeEventListener('change', update) }
  }, [spec, item.id, item.key, item.name, type])
  return <canvas ref={ref} className={`photo-model photo-model-${type}`} data-photo-source={spec.source} data-photo-state="loading" aria-hidden="true" />
}
