import { useEffect, useId, useRef, useState } from 'react'
import Dialog from './Dialog'
import Icon from './Icon'
import { GUIDE_DESTINATIONS, guideDuration, guideScript, moveGuideStep, validateGuide } from '../lib/guide'

function download(content, filename, type) {
  const url = URL.createObjectURL(new Blob([content], { type }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.hidden = true
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 60000)
}

export function GuideWelcome({ guide, progress, onStart, onClose, onEdit, storageOkay = true }) {
  const complete = progress.status === 'completed'
  return <Dialog title={complete ? 'A world of possibilities awaits' : guide.title} className="guide-welcome" onClose={onClose}>
    <div className="guide-welcome-symbol"><Icon name={complete ? 'check' : 'leaf'} size={32} /></div>
    <p className="guide-eyebrow">{complete ? 'Guide reviewed' : 'Your first tank guide'}</p>
    <p className="dialog-intro">{complete ? 'You have explored every guide step. Keep building, come back to a step, or shape the guide for your next demo.' : 'A little direction, at your own pace. Follow the steps while using the real workspace, from your first idea to a tank you can care for and share.'}</p>
    <div className="guide-welcome-path">{['Build a habitat', 'Learn & choose', 'Care & share'].map((label, index) => <div key={label}><span>0{index + 1}</span><strong>{label}</strong></div>)}</div>
    <p className="guide-welcome-note">{guide.steps.length} editable steps · Pause anytime · Jump to any step<br />Guide navigation does not make purchases or perform care for you.</p>
    {!storageOkay && <p className="guide-storage-warning" role="status">Browser saving is unavailable. Guide progress and edits will last for this session only. Export your edits from the guide editor.</p>}
    <button className="primary-button dialog-cta" onClick={onStart}>{complete ? 'Explore the guide again' : progress.status === 'new' ? 'Start my guide' : 'Continue my guide'}<Icon name="arrow" size={16} /></button>
    <div className="guide-welcome-links"><button className="text-link" onClick={onClose}>Explore on my own</button><button className="text-link" onClick={onEdit}><Icon name="edit" size={14} />Edit guide & demo script</button></div>
  </Dialog>
}

export function GuidePanel({ guide, progress, onJump, onNext, onPause, onAction, onEdit, storageOkay }) {
  const [showScript, setShowScript] = useState(false)
  const [awayFromGuide, setAwayFromGuide] = useState(false)
  const panel = useRef(null)
  const index = Math.max(0, guide.steps.findIndex(step => step.id === progress.stepId))
  const step = guide.steps[index]
  const stepHeading = useRef(null)
  const previousStep = useRef(progress.stepId)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setAwayFromGuide(!entry.isIntersecting))
    observer.observe(panel.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (previousStep.current !== progress.stepId) stepHeading.current?.focus({ preventScroll: true })
    previousStep.current = progress.stepId
  }, [progress.stepId])
  return <section ref={panel} className="guide-panel" aria-label="First tank guide">
    <div className="guide-panel-top"><span className="guide-eyebrow"><Icon name="leaf" size={15} />First tank guide</span><div><button className="text-link" onClick={onEdit}><Icon name="edit" size={14} />Edit guide & script</button><button className="guide-pause" onClick={onPause}>Pause guide</button></div></div>
    <div className="guide-panel-body"><div className="guide-position"><label htmlFor="guide-step">Step {index + 1} of {guide.steps.length}</label><select id="guide-step" value={step.id} onChange={event => onJump(event.target.value)}>{guide.steps.map((item, i) => <option key={item.id} value={item.id}>{String(i + 1).padStart(2, '0')} · {item.title}{progress.reviewed.includes(item.id) ? ' ✓' : ''}</option>)}</select><progress max={guide.steps.length} value={progress.reviewed.length} aria-label="Guide steps reviewed" /><small>{progress.reviewed.length} of {guide.steps.length} reviewed</small></div>
      <div className="guide-step-copy"><h2 ref={stepHeading} tabIndex={-1}>{step.title}</h2><p>{step.summary}</p><ol>{step.instructions.map((line, i) => <li key={i}>{line}</li>)}</ol></div>
      <div className="guide-step-actions"><button className="secondary-button" onClick={() => onAction(step)}>{GUIDE_DESTINATIONS[step.destination].label}<Icon name="arrow" size={15} /></button><div className="guide-pagination"><button className="guide-back" disabled={index === 0} onClick={() => onJump(guide.steps[index - 1].id)}>Back</button><button className="primary-button" onClick={onNext}>{index === guide.steps.length - 1 ? 'Finish & review' : 'Next step'}<Icon name="check" size={15} /></button></div><small>Next marks this step as reviewed.</small></div>
    </div>
    <div className="guide-panel-bottom"><button className="text-link" aria-expanded={showScript} onClick={() => setShowScript(!showScript)}><Icon name="book" size={14} />{showScript ? 'Hide recording script' : 'Show recording script'}</button><span>Explore freely. Your place is saved in this browser.</span></div>
    {showScript && <div className="guide-recording"><div><span className="guide-eyebrow">English narration · {step.seconds}s scene</span><p>{step.narration}</p></div><div><span className="guide-eyebrow">录制说明</span><p>{step.recording}</p></div></div>}
    {!storageOkay && <p className="guide-storage-warning" role="status">Guide saving is unavailable in this browser. Export your configuration and script before leaving.</p>}
    {awayFromGuide && <button className="guide-return" onClick={() => { panel.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' }); stepHeading.current?.focus({ preventScroll: true }) }}><Icon name="book" size={16} />Step {index + 1} · Back to guide<Icon name="arrow" size={15} /></button>}
  </section>
}

export function GuideEditor({ guide, defaults, onSave, onClose, storageOkay = true }) {
  const [draft, setDraft] = useState(() => structuredClone(guide))
  const [selectedId, setSelectedId] = useState(guide.steps[0].id)
  const [error, setError] = useState('')
  const [exported, setExported] = useState(null)
  const importId = useId()
  const selected = draft.steps.find(step => step.id === selectedId) || draft.steps[0]
  const index = draft.steps.findIndex(step => step.id === selected.id)
  const updateStep = (field, value) => { setError(''); setDraft(current => ({ ...current, steps: current.steps.map(step => step.id === selected.id ? { ...step, [field]: value } : step) })) }
  function validated() {
    const result = validateGuide(draft)
    setError(result.error || '')
    return result.guide
  }
  function exportDraft(format) {
    const config = validated()
    if (!config) return
    const document = format === 'json'
      ? { label: 'Exported JSON', content: `${JSON.stringify(config, null, 2)}\n`, filename: 'build-your-tank-guide.json', type: 'application/json' }
      : { label: 'Exported recording script', content: guideScript(config), filename: 'build-your-tank-demo-script.md', type: 'text/markdown;charset=utf-8' }
    setExported(document)
    download(document.content, document.filename, document.type)
  }
  async function importConfig(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (file.size > 2000000) { setError('Choose a guide JSON file smaller than 2 MB.'); return }
    try {
      const result = validateGuide(JSON.parse(await file.text()))
      if (result.error) { setError(result.error); return }
      setDraft(result.guide); setSelectedId(result.guide.steps[0].id); setError('')
    } catch { setError('This file could not be read. Import a valid guide JSON configuration.') }
  }
  return <Dialog title="Shape your guide & demo" className="guide-editor" onClose={onClose}>
    <p className="dialog-intro">Reorder the steps and edit the guide, English narration and recording notes together. Save applies to this browser. Export JSON to keep or share your edits; export Markdown for recording.</p>
    {!storageOkay && <p className="guide-storage-warning" role="status">Browser saving is unavailable. Use Export JSON and Export script to keep your edits before leaving this session.</p>}
    <div className="guide-editor-tools"><span><Icon name="clock" size={15} />Planned runtime: {Math.floor(guideDuration(draft) / 60)}m {guideDuration(draft) % 60}s</span><div><label className="secondary-button" htmlFor={importId}>Import JSON</label><input id={importId} className="guide-file-input" type="file" accept=".json,application/json" onChange={importConfig} /><button className="secondary-button" onClick={() => exportDraft('json')}>Export JSON</button><button className="secondary-button" onClick={() => exportDraft('markdown')}>Export script</button></div></div>
    {exported && <div className="guide-export-preview"><label>{exported.label}<textarea readOnly rows={6} value={exported.content} onFocus={event => event.target.select()} /></label><div><p>Select and copy this text if your browser does not download the file.</p><button className="text-link" onClick={() => setExported(null)}>Close export preview</button></div></div>}
    <details className="guide-opening"><summary>Guide title, opening & closing narration</summary><label>Guide title<input maxLength={100} value={draft.title} onChange={event => setDraft({ ...draft, title: event.target.value })} /></label>{[['introduction', 'Opening narration', 'introSeconds'], ['closing', 'Closing narration', 'outroSeconds']].map(([field, label, duration]) => <div key={field}><label>{label}<textarea rows={3} maxLength={3000} value={draft[field]} onChange={event => setDraft({ ...draft, [field]: event.target.value })} /></label><label className="guide-duration">Scene duration (seconds)<input type="number" min={5} max={180} value={draft[duration]} onChange={event => setDraft({ ...draft, [duration]: Number(event.target.value) })} /></label></div>)}</details>
    <div className="guide-editor-layout"><nav className="guide-editor-outline" aria-label="Edit guide steps"><ol>{draft.steps.map((step, i) => <li className={selected.id === step.id ? 'selected' : ''} key={step.id}><button className="guide-edit-select" aria-current={selected.id === step.id ? 'step' : undefined} onClick={() => setSelectedId(step.id)}><span>{String(i + 1).padStart(2, '0')}</span>{step.title}</button><div><button aria-label={`Move ${step.title} up`} disabled={i === 0} onClick={() => setDraft(current => moveGuideStep(current, step.id, -1))}>↑</button><button aria-label={`Move ${step.title} down`} disabled={i === draft.steps.length - 1} onClick={() => setDraft(current => moveGuideStep(current, step.id, 1))}>↓</button></div></li>)}</ol></nav>
      <div className="guide-editor-fields"><span className="guide-eyebrow">Step {index + 1} · {selected.id}</span><label>Step title<input maxLength={100} value={selected.title} onChange={event => updateStep('title', event.target.value)} /></label><label>Short description<textarea rows={2} maxLength={500} value={selected.summary} onChange={event => updateStep('summary', event.target.value)} /></label><label>What to do · one instruction per line<textarea rows={4} value={selected.instructions.join('\n')} onChange={event => updateStep('instructions', event.target.value.split('\n'))} /></label><label>Open this feature<select value={selected.destination} onChange={event => updateStep('destination', event.target.value)}>{Object.entries(GUIDE_DESTINATIONS).map(([id, destination]) => <option key={id} value={id}>{destination.label}</option>)}</select></label><label>English demo narration<textarea rows={4} maxLength={3000} value={selected.narration} onChange={event => updateStep('narration', event.target.value)} /></label><label>Recording notes / 录制说明<textarea rows={3} maxLength={3000} value={selected.recording} onChange={event => updateStep('recording', event.target.value)} /></label><label className="guide-duration">Scene duration (seconds)<input type="number" min={5} max={180} value={selected.seconds} onChange={event => updateStep('seconds', Number(event.target.value))} /></label></div>
    </div>
    {error && <p className="guide-editor-error" role="alert">{error}</p>}
    <div className="guide-editor-footer"><button className="text-link" onClick={() => { setDraft(structuredClone(defaults)); setSelectedId(defaults.steps[0].id); setError('') }}>Reset draft to default</button><div><button className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" onClick={() => { const config = validated(); if (config) onSave(config) }}>Save guide & script<Icon name="check" size={16} /></button></div></div>
  </Dialog>
}
