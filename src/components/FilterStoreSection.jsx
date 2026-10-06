import { STORE_FILTERS } from '../lib/tank'

export default function FilterStoreSection({ tank, onSetup }) {
  return <section className="filter-store-section" aria-labelledby="external-filter-heading">
    <div className="filter-store-heading"><div><h2 id="external-filter-heading">External filters</h2><p>Choose a model to see its canister, paired clear hoses, and glass lily pipes beside your tank.</p></div><span>5 models</span></div>
    <div className="filter-store-grid">
      {STORE_FILTERS.map(filter => <article className={`filter-product-card ${tank.filter === filter.id ? 'selected' : ''}`} key={filter.id}>
        <div className="filter-product-art"><img src={filter.modelArt} alt={`${filter.name} illustrated canister model`} /></div>
        <div className="filter-product-copy">
          <h3>{filter.name}</h3><p>{filter.note}</p>
          <dl><div><dt>Flow</dt><dd>{filter.flowLph.toLocaleString()} L/h</dd></div><div><dt>Body</dt><dd>{filter.widthCm} × {filter.heightCm} cm</dd></div><div><dt>Hose</dt><dd>{filter.hoseMm} mm</dd></div></dl>
          <a href={filter.sourceUrl} target="_blank" rel="noopener noreferrer">Product details at Green Aqua ↗</a>
          <div className="filter-product-action"><span>{filter.price} coins</span><button type="button" className="secondary-button" disabled={tank.filter === filter.id} onClick={() => onSetup('filter', filter.id)}>{tank.filter === filter.id ? 'In your room' : 'Choose filter'}</button></div>
        </div>
      </article>)}
    </div>
    <p className="filter-store-note">Flow figures are manufacturer-rated. The model is an illustration; check real dimensions, hose fit, cabinet space, and suitable flow before buying hardware.</p>
  </section>
}
