import { useEffect, useState } from 'react'
import Icon from './Icon'
import { ENCYCLOPEDIA, ENCYCLOPEDIA_CATEGORIES } from '../lib/learning'

const categoryName = id => ENCYCLOPEDIA_CATEGORIES.find(category => category.id === id)?.name
const entryLink = id => `#/learn?entry=${encodeURIComponent(id)}`
function readEntry() { return new URLSearchParams(window.location.hash.split('?')[1] || '').get('entry') }

function EntryArt({ entry, className = '', showCredit = false }) {
  return <div className={`library-art library-art-${entry.category} ${entry.artType === 'photo' ? 'library-art-photo' : ''} ${entry.photoFit === 'contain' ? 'library-art-contain' : ''} ${className}`} style={{ '--item-color': entry.color || '#c3d8e2' }}>
    {entry.art ? <img src={entry.art} alt={entry.name} loading="lazy" onError={event => { event.currentTarget.onerror = null; if (entry.illustration) event.currentTarget.src = entry.illustration }} /> : <Icon name={entry.icon} size={70} />}
    {showCredit && entry.artCredit && <span className="entry-photo-credit">Photo: <a href={entry.artSource} target="_blank" rel="noreferrer">{entry.artCredit}</a>{entry.artLicense && <> · <a href={entry.artLicenseUrl} target="_blank" rel="noreferrer">{entry.artLicense}</a></>}</span>}
  </div>
}

function EntryCard({ entry }) {
  return <a className="library-card" href={entryLink(entry.id)}>
    <EntryArt entry={entry} />
    <div className="library-card-copy"><span className="library-category">{categoryName(entry.category)}</span><h2>{entry.name}</h2>{entry.scientific && <span className="library-scientific">{entry.scientific}</span>}<p>{entry.headline}</p><span className="library-read">Explore entry <Icon name="arrow" size={15} /></span></div>
  </a>
}

export default function LearnPage() {
  const [entryId, setEntryId] = useState(readEntry)
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  useEffect(() => {
    const handleHash = () => setEntryId(readEntry())
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])
  const entry = ENCYCLOPEDIA.find(item => item.id === entryId)
  const query = search.trim().toLowerCase()
  const entries = ENCYCLOPEDIA.filter(item => (category === 'all' || item.category === category) && (!query || [item.name, item.scientific, item.chinese, item.headline, ...item.facts.flat(), ...item.sections.flat()].join(' ').toLowerCase().includes(query)))

  if (entry) {
    const related = ENCYCLOPEDIA.filter(item => item.category === entry.category && item.id !== entry.id).slice(0, 3)
    return <main className="browse-main encyclopedia-main">
      <div className="library-breadcrumb"><a href="#/learn"><Icon name="arrow" size={15} />Back to the library</a><span>{categoryName(entry.category)}</span></div>
      <article className="encyclopedia-entry">
        <div className="entry-overview"><EntryArt entry={entry} className="entry-hero-art" showCredit /><div className="entry-profile"><span className="library-category">{categoryName(entry.category)} · Field guide</span><h1>{entry.name}</h1>{entry.scientific && <p className="entry-scientific">{entry.scientific}</p>}{entry.chinese && <p className="entry-chinese">{entry.chinese}</p>}<p className="entry-headline">{entry.headline}</p><dl className="entry-facts">{entry.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>{entry.sourceUrl && <a className="entry-source-link" href={entry.sourceUrl} target="_blank" rel="noreferrer">Care reference: Green Aqua <Icon name="arrow" size={13} /></a>}</div></div>
        {entry.galleryPhotos?.length > 0 && <div className="entry-photo-gallery">{entry.galleryPhotos.map(photo => <figure key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy" /><figcaption>{photo.alt} · Photo: <a href={photo.source} target="_blank" rel="noreferrer">{photo.credit}</a> · <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a> (display crop)</figcaption></figure>)}</div>}
        <div className="entry-sections">{entry.sections.map(([title, content], i) => <section key={title}><span className="entry-section-number">0{i + 1}</span><div><h2>{title}</h2><p>{content}</p></div></section>)}</div>
      </article>
      <div className="entry-store-link"><Icon name={entry.icon} size={23} /><div><h2>Bring what you learn into your tank.</h2><p>Explore the fish, plants and supplies in Fish store.</p></div><a className="secondary-button" href="#/store">Visit Fish store <Icon name="arrow" size={15} /></a></div>
      {related.length > 0 && <section className="related-library"><h2>Keep exploring</h2><div className="library-grid">{related.map(item => <EntryCard key={item.id} entry={item} />)}</div></section>}
      <p className="page-footnote">Care ranges are general starting points. Needs vary by population, life stage and setup; confirm species identity and current product instructions for a real aquarium.</p>
    </main>
  }

  return <main className="browse-main encyclopedia-main">
    <div className="section-heading"><div><h1>The aquarium <em>library.</em></h1><p>Meet every fish. Understand every plant. Get to know the tools that care for them.</p></div><span className="library-count"><Icon name="book" size={22} /><strong>{ENCYCLOPEDIA.length}</strong> entries to explore</span></div>
    <section className="library-intro"><div><span className="library-category">A little knowledge, always within reach</span><h2>Know your fish.<br /><em>Understand their world.</em></h2><p>From natural habitats and tankmates to planting and daily care — a guide you can come back to whenever a question comes up.</p></div><div className="library-intro-art" aria-hidden="true"><img src="/art/betta.svg" alt="" /><span>Betta splendens</span></div></section>
    <div className="library-tools"><div className="browse-tabs" role="group" aria-label="Encyclopedia categories">{ENCYCLOPEDIA_CATEGORIES.map(item => <button key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.name}</button>)}</div><label className="search-field"><Icon name="search" size={16} /><input aria-label="Search the encyclopedia" placeholder="A fish, a plant, a question…" value={search} onChange={event => setSearch(event.target.value)} /></label></div>
    <div className="library-results" aria-live="polite">{entries.length} {entries.length === 1 ? 'entry' : 'entries'}{query ? ` matching “${search.trim()}”` : ` · ${categoryName(category)}`}{(query || category !== 'all') && <button onClick={() => { setCategory('all'); setSearch('') }}>Clear filters</button>}</div>
    {entryId && <p className="inline-help" role="status">That entry is not available. You can explore the library below.</p>}
    <div className="library-grid">{entries.map(item => <EntryCard key={item.id} entry={item} />)}</div>
    {!entries.length && <div className="empty-state"><Icon name="search" size={28} /><h2>No entries found.</h2><p>Try another name or choose a different category.</p><button className="secondary-button" onClick={() => { setCategory('all'); setSearch('') }}>Show all entries</button></div>}
    <p className="page-footnote">A reference library for fish, plants, substrates, equipment and care supplies. Open an entry to find habitat, care and usage details.</p>
  </main>
}
