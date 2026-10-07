import { useEffect, useId, useMemo, useRef } from 'react'
import { fishSwimPlan, swimTransform } from '../lib/fishSwimming'
import { fishModelSvg } from '../lib/fishModels'

export default function SwimmingFish({ fish, size, scape, depth }) {
  const spaceRef = useRef(null)
  const imageRef = useRef(null)
  const modelId = useId()
  const model = useMemo(() => fishModelSvg(fish, modelId), [fish.id, fish.name, fish.visual, modelId])
  const phase = [...fish.key].reduce((seed, letter) => seed + letter.charCodeAt(0), 0)
  const plan = useMemo(() => fishSwimPlan(fish, size, fish.key, scape), [fish.key, fish.scientific, fish.adultLengthCm, fish.artAspectRatio, size.lengthCm, size.heightCm, scape?.id])

  useEffect(() => {
    const space = spaceRef.current, image = imageRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let disposed = false, animation, step = 0, position = plan.start
    const updateMotion = () => {
      if (reducedMotion.matches) animation?.pause()
      else animation?.play()
    }
    reducedMotion.addEventListener('change', updateMotion)
    const pose = (point, facing = 1) => {
      image.style.transform = `rotate(${point.angle || 0}deg) scaleX(${facing})`
      space.style.zIndex = point.attached ? 7 : depth
      space.dataset.state = point.attached ? (plan.habit.mode === 'cling' ? 'attached' : 'resting') : 'swimming'
      space.dataset.surface = point.material || ''
    }
    async function animate(points, duration) {
      animation = space.animate(points.map(point => ({ transform: swimTransform(point), ...(point.offset !== undefined ? { offset: point.offset } : {}) })), {
        duration, easing: 'cubic-bezier(.3, 0, .7, 1)', fill: 'forwards',
      })
      updateMotion()
      try { await animation.finished } catch { return false }
      if (disposed) return false
      space.style.transform = swimTransform(points.at(-1))
      animation.cancel()
      return true
    }
    async function swim() {
      space.style.transform = swimTransform(position)
      pose(position)
      if (position.attached && !await animate([position, position], 7000)) return
      while (!disposed) {
        const leg = plan.leg(position, step++)
        pose({ angle: 0 }, leg.facing)
        if (!await animate(leg.points, leg.duration)) break
        position = leg.end
        pose(position, leg.facing)
        if (leg.dwellDuration && !await animate([position, position], leg.dwellDuration)) break
      }
    }
    swim()
    return () => {
      disposed = true
      animation?.cancel()
      reducedMotion.removeEventListener('change', updateMotion)
    }
  }, [plan, depth])

  // The moving space has the tank's dimensions, so percentage translations
  // scale with room previews, resizing and observer zoom without JS layout.
  return <div ref={spaceRef} className="fish-swim-space" data-fish={fish.id} data-habit={plan.habit.id} style={{ transform: swimTransform(plan.start), zIndex: depth }}>
    <div className={`scene-fish scene-fish-${fish.id}`} style={{ width: `${plan.width}%`, '--fin-period': `${.65 + phase % 11 * .045}s`, '--gill-period': `${1.15 + phase % 7 * .1}s`, '--motion-phase': `${-phase % 29 * .17}s` }}>
      <div ref={imageRef} className="fish-anatomy" aria-hidden="true" dangerouslySetInnerHTML={{ __html: model }} />
    </div>
  </div>
}
