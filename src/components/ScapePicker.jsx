import { SCAPES } from '../lib/scapes'

export default function ScapePicker({ value, onChange, compact = false }) {
  return <section className={`scape-picker ${compact ? 'scape-picker-compact' : ''}`} aria-label="Hardscape presets">
    <div className="scape-picker-heading"><div><h2>Choose a hardscape</h2><p>Woods and stones only · fish and plants stay as they are</p></div><span>Free to switch</span></div>
    <div className="scape-options" role="group" aria-label="Choose a hardscape preset">
      {SCAPES.map(scape => <button type="button" className="scape-option" key={scape.id} aria-pressed={value === scape.id} onClick={() => onChange(scape.id)}>
        <span className={`scape-option-art scape-option-art-${scape.id}`}><img src={scape.art} alt="" /></span>
        <span className="scape-option-copy"><strong>{scape.name}</strong><small>{scape.detail}</small><em>{scape.material}</em></span>
      </button>)}
    </div>
  </section>
}
