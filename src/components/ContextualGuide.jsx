import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { getCurrentPageGuide, getGuide } from '../lib/contextualGuide'

function targetSelector(target) {
  return `[data-guide="${CSS.escape(target)}"]`
}

export default function ContextualGuide({ route, mode = 'full', stepIndex = 0, onStepChange, onSkip, onFinish }) {
  const allSteps = mode === 'page' ? getCurrentPageGuide(route) : getGuide()
  const [targetRect, setTargetRect] = useState(null)
  const [targetReady, setTargetReady] = useState(false)
  const panelRef = useRef(null)
  const step = allSteps[Math.min(Math.max(stepIndex, 0), Math.max(allSteps.length - 1, 0))]
  const isLast = stepIndex >= allSteps.length - 1

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [])

  useEffect(() => {
    if (!step || mode !== 'full' || route === step.route) return
    window.location.hash = `#/${step.route}`
  }, [mode, route, step])

  useEffect(() => {
    if (!step) return undefined
    let cancelled = false
    let frame = 0
    let timeout = 0
    const findTarget = () => {
      if (cancelled) return
      const target = document.querySelector(targetSelector(step.target))
      const rect = target?.getBoundingClientRect()
      if (target && rect && rect.width > 0 && rect.height > 0 && (!step.route || route === step.route)) {
        target.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'nearest' })
        frame = window.requestAnimationFrame(() => {
          if (cancelled) return
          const nextRect = target.getBoundingClientRect()
          setTargetReady(true)
          setTargetRect({ top: nextRect.top, left: nextRect.left, width: nextRect.width, height: nextRect.height })
        })
        return
      }
      setTargetReady(false)
      setTargetRect(null)
      timeout = window.setTimeout(findTarget, 80)
    }
    findTarget()
    return () => { cancelled = true; window.cancelAnimationFrame(frame); window.clearTimeout(timeout) }
  }, [route, step])

  useEffect(() => {
    if (!targetReady) return undefined
    const update = () => {
      const target = step && document.querySelector(targetSelector(step.target))
      const rect = target?.getBoundingClientRect()
      if (rect && rect.width > 0 && rect.height > 0) setTargetRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height })
    }
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, { passive: true })
    return () => { window.removeEventListener('resize', update); window.removeEventListener('scroll', update) }
  }, [step, targetReady])

  useEffect(() => {
    panelRef.current?.focus({ preventScroll: true })
  }, [step?.id])

  if (!step) return null

  function handleKeyDown(event) {
    if (event.key === 'Escape') { event.preventDefault(); onSkip(); return }
    if (event.key !== 'Tab') return
    const controls = [...panelRef.current.querySelectorAll('button:not([disabled])')]
    if (!controls.length) return
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }

  const pageLabel = step.route === 'my-tanks' ? 'My tanks' : step.route === 'ideas' ? 'Tank idea' : step.route === 'store' ? 'Fish store' : 'Learn'
  return <div className="contextual-guide" role="presentation">
    <div className="contextual-guide-backdrop" aria-hidden="true" />
    {targetRect && <div className="contextual-guide-spotlight" aria-hidden="true" style={{ top: targetRect.top - 8, left: targetRect.left - 8, width: targetRect.width + 16, height: targetRect.height + 16 }} />}
    <section ref={panelRef} className={`contextual-guide-panel ${targetRect ? 'has-target' : 'no-target'}`} role="dialog" aria-modal="true" aria-labelledby="contextual-guide-title" tabIndex={-1} onKeyDown={handleKeyDown}>
      <div className="contextual-guide-kicker"><span><Icon name="book" size={15} />Workspace guide</span><span>Step {Math.min(stepIndex + 1, allSteps.length)} of {allSteps.length}</span></div>
      <div className="contextual-guide-progress" aria-hidden="true"><span style={{ width: `${((stepIndex + 1) / allSteps.length) * 100}%` }} /></div>
      <p className="contextual-guide-page">{pageLabel}</p>
      <h2 id="contextual-guide-title">{step.title}</h2>
      <p className="contextual-guide-text">{step.text}</p>
      <p className="contextual-guide-next"><strong>Next:</strong> {step.nextAction}</p>
      {!targetReady && <p className="contextual-guide-wait" role="status">Loading this page area…</p>}
      <div className="contextual-guide-actions">
        <button className="text-link" onClick={onSkip}>Skip guide</button>
        <div className="contextual-guide-pagination">
          <button className="secondary-button" onClick={() => onStepChange(stepIndex - 1)} disabled={stepIndex === 0}>Back</button>
          <button className="primary-button" onClick={() => isLast ? onFinish() : onStepChange(stepIndex + 1)}>{isLast ? 'Finish' : 'Next'}<Icon name={isLast ? 'check' : 'arrow'} size={15} /></button>
        </div>
      </div>
    </section>
  </div>
}
