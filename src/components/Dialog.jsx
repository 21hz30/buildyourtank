import { useEffect, useId, useRef } from 'react'
import Icon from './Icon'

export default function Dialog({ title, onClose, children, className = '' }) {
  const ref = useRef(null)
  const titleId = useId()
  useEffect(() => {
    const dialog = ref.current
    dialog.showModal()
    return () => dialog.close()
  }, [])
  return <dialog ref={ref} aria-labelledby={titleId} className={`dialog ${className}`} onCancel={onClose} onClick={event => { if (event.target === ref.current) { const bounds = ref.current.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose() } }}>
    <div className="dialog-heading"><h2 id={titleId}>{title}</h2><button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog"><Icon name="close" /></button></div>
    {children}
  </dialog>
}
