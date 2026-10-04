import { CATALOG, FILTERS, SANDS, SIZES } from '../lib/tank'
import Icon from './Icon'

export default function Catalog({ tank, tab, onTab, onItem, onSetup, readOnly }) {
  return <aside id="tank-store" className="catalog" aria-label="Aquarium store">
    <div className="catalog-heading"><div><h2>A little of this.</h2><p>A little of that. Make it yours.</p></div><span className="store-symbol"><Icon name="leaf" size={22} /></span></div>
    <div className="catalog-tabs" role="tablist" aria-label="Store categories">
      {[['fish', 'fish', 'Fish'], ['plants', 'leaf', 'Plants'], ['setup', 'sliders', 'Setup']].map(([id, icon, label], i, options) => <button key={id} id={`tab-${id}`} type="button" role="tab" tabIndex={tab === id ? 0 : -1} aria-selected={tab === id} aria-controls={`panel-${id}`} className={tab === id ? 'active' : ''} onClick={() => onTab(id)} onKeyDown={event => { if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const index = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (i + (event.key === 'ArrowRight' ? 1 : 2)) % 3; onTab(options[index][0]); document.getElementById(`tab-${options[index][0]}`).focus() } }}><Icon name={icon} size={16} />{label}</button>)}
    </div>
    <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="catalog-panel">
      {tab !== 'setup' ? <div className="catalog-list">{CATALOG[tab].map(item => <div key={item.id} className="catalog-item">
        <div className={`item-art item-art-${item.id}`} style={{ '--item-color': item.color }}><img src={item.art} alt="" /></div>
        <div className="item-description"><h3>{item.name}</h3><p>{item.tag}</p><span className="item-price"><span className="tiny-coin" />{item.price}</span></div>
        <div className="item-quantity">{tank[tab][item.id] > 0 ? <><button type="button" onClick={() => onItem(tab, item.id, -1)} disabled={readOnly} aria-label={`Remove ${item.name}`}><Icon name="minus" size={13} /></button><span aria-label={`${item.name} quantity`}>{tank[tab][item.id]}</span></> : null}<button type="button" className={tank[tab][item.id] ? '' : 'add-item'} onClick={() => onItem(tab, item.id, 1)} disabled={readOnly} aria-label={`Add ${item.name}`}><Icon name="plus" size={14} /></button></div>
      </div>)}</div> : <div className="setup-panel">
        <label htmlFor="tank-size">Tank size <span>Room to grow</span></label>
        <select id="tank-size" value={tank.size} onChange={event => onSetup('size', event.target.value)} disabled={readOnly}>{SIZES.map(size => <option key={size.id} value={size.id}>{size.name} · {size.litres} L · {size.price} coins</option>)}</select>
        <p className="setup-dimensions">{SIZES.find(size => size.id === tank.size).dimensions}</p>
        <div className="setup-label">The ground beneath them</div>
        <div className="sand-options">{SANDS.map(sand => <button key={sand.id} disabled={readOnly} aria-pressed={tank.sand === sand.id} onClick={() => onSetup('sand', sand.id)}><i style={{ background: sand.color }} />{sand.name}<small>{sand.price} coins</small></button>)}</div>
        <label htmlFor="tank-filter">Keep the water moving</label>
        <select id="tank-filter" value={tank.filter} onChange={event => onSetup('filter', event.target.value)} disabled={readOnly}>{FILTERS.map(filter => <option key={filter.id} value={filter.id}>{filter.name} · {filter.price} coins</option>)}</select>
        <p className="setup-dimensions">A stronger filter supports more swimmers.</p>
      </div>}
    </div>
    <div className="catalog-note"><Icon name="info" size={15} /><span>{readOnly ? 'A snapshot of someone’s little world.' : 'Remove an item to get its coins back.'}</span></div>
  </aside>
}
