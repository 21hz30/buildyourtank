import { useEffect, useState } from 'react'
import Icon from './Icon'
import PlantPhoto from './PlantPhoto'
import { ENCYCLOPEDIA, ENCYCLOPEDIA_CATEGORIES } from '../lib/learning'
import { filterLearningEntries, fishGroupFor, groupFishEntries } from '../lib/fishGroups'
import { PLANT_TYPES, plantTypeFor } from '../lib/plantCatalog'
import { PLANT_NUTRITION_GUIDE } from '../lib/plantNutrition'

const categoryName = id => ENCYCLOPEDIA_CATEGORIES.find(category => category.id === id)?.name
const fishGroups = groupFishEntries(ENCYCLOPEDIA)
const plantGroups = PLANT_TYPES.map((name, index) => ({ id: `plant-type-${index}`, name, entries: ENCYCLOPEDIA.filter(entry => entry.category === 'plants' && entry.kind !== 'guide' && plantTypeFor(entry) === name) })).filter(group => group.entries.length)
const plantGroupFor = entry => entry.kind === 'guide' ? null : plantGroups.find(group => group.name === plantTypeFor(entry))
function libraryLink(category = 'all', group = '', search = '') {
  const params = new URLSearchParams()
  if (category !== 'all') params.set('category', category)
  if (group) params.set('group', group)
  if (search) params.set('q', search)
  return `#/learn${params.size ? `?${params}` : ''}`
}
function entryLink(entry, search = '') {
  const group = entry.category === 'fish' ? fishGroupFor(entry) : entry.category === 'plants' ? plantGroupFor(entry) : null
  return `${libraryLink(entry.category, group?.id, search)}&entry=${encodeURIComponent(entry.id)}`
}
function readLocation() {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
  const groupId = params.get('group') || ''
  const category = params.get('category') || 'all'
  return { entryId: params.get('entry'), groupId, category: groupId && category !== 'plants' ? 'fish' : ENCYCLOPEDIA_CATEGORIES.some(item => item.id === category) ? category : 'all', search: params.get('q') || '' }
}

function EntryArt({ entry, className = '', showCredit = false }) {
  return <div className={`library-art library-art-${entry.category} ${entry.artType === 'photo' ? 'library-art-photo' : ''} ${entry.photoFit === 'contain' ? 'library-art-contain' : ''} ${className}`} style={{ '--item-color': entry.color || '#c3d8e2' }}>
    {entry.category === 'plants' && entry.kind !== 'guide' ? <PlantPhoto src={entry.art} name={entry.name} /> : entry.art ? <img src={entry.art} alt={entry.name} loading="lazy" onError={event => { event.currentTarget.onerror = null; if (entry.illustration) event.currentTarget.src = entry.illustration }} /> : <Icon name={entry.icon} size={70} />}
    {showCredit && entry.artCredit && <span className="entry-photo-credit">Photo: <a href={entry.artSource} target="_blank" rel="noreferrer">{entry.artCredit}</a>{entry.artLicense && <> · <a href={entry.artLicenseUrl} target="_blank" rel="noreferrer">{entry.artLicense}</a></>}</span>}
  </div>
}

function EntryCard({ entry, search = '' }) {
  const group = entry.category === 'fish' ? fishGroupFor(entry) : entry.category === 'plants' ? plantGroupFor(entry) : null
  return <a className={`library-card ${entry.kind === 'guide' ? 'library-guide-card' : ''}`} href={entryLink(entry, search)}>
    <EntryArt entry={entry} />
    <div className="library-card-copy"><span className="library-category">{entry.kind === 'guide' ? 'Plant care guide' : group?.name || categoryName(entry.category)}</span><h2>{entry.name}</h2>{entry.scientific && <span className="library-scientific">{entry.scientific}</span>}<p>{entry.headline}</p><span className="library-read">{entry.kind === 'guide' ? 'Read the guide' : 'Explore entry'} <Icon name="arrow" size={15} /></span></div>
  </a>
}

function FishGroupCard({ group, search }) {
  return <a className="library-card fish-group-card" href={libraryLink('fish', group.id, search)}>
    <div className="fish-group-art" aria-hidden="true">{group.entries.slice(0, 3).map(entry => <EntryArt key={entry.id} entry={entry} />)}</div>
    <div className="library-card-copy"><span className="library-category">Fish group · {group.entries.length} {group.entries.length === 1 ? 'entry' : 'entries'}{search.trim() ? ' matching your search' : ''}</span><h2>{group.name}</h2><span className="fish-group-chinese">{group.chinese}</span><p>{group.summary}</p><span className="library-read">Explore group <Icon name="arrow" size={15} /></span></div>
  </a>
}

function PlantGroupCard({ group, search }) {
  return <a className="library-card fish-group-card" href={libraryLink('plants', group.id, search)}>
    <div className="fish-group-art" aria-hidden="true">{group.entries.slice(0, 3).map(entry => <EntryArt key={entry.id} entry={entry} />)}</div>
    <div className="library-card-copy"><span className="library-category">Plant group · {group.entries.length} entries</span><h2>{group.name}</h2><p>Explore the species and cultivars in this aquascaping group.</p><span className="library-read">Explore group <Icon name="arrow" size={15} /></span></div>
  </a>
}

function FishGroupProfile({ group }) {
  return <section className="fish-group-profile" aria-label={`About ${group.name}`}>
    <div className="fish-group-profile-heading"><span className="library-category">Fish group field guide</span><h2>Understanding {group.name.toLowerCase()}</h2><p>{group.summary}</p></div>
    <div className="fish-group-facts">{[['Characteristics', group.characteristics], ['Distribution', group.distribution], ['Morphology', group.morphology], ['Habits', group.habits]].map(([title, content], index) => <section key={title}><span className="entry-section-number">0{index + 1}</span><div><h3>{title}</h3><p>{content}</p></div></section>)}</div>
    <div className="fish-group-sources"><span>Further reading</span>{group.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.name} <Icon name="arrow" size={12} /></a>)}</div>
  </section>
}

function PlantNutritionLink() {
  return <a className="plant-nutrition-link" href={entryLink(PLANT_NUTRITION_GUIDE)}><Icon name="leaf" size={24} /><span><strong>What do aquatic plants need to grow?</strong><small>Learn about essential nutrients, potassium shortages and other deficiency signs.</small></span><Icon name="arrow" size={18} /></a>
}

function NutrientTable({ entry }) {
  return <section className="plant-nutrition-table" aria-labelledby="nutrient-table-heading"><h2 id="nutrient-table-heading">Essential nutrients & signs of shortage</h2><p id="nutrient-table-intro">{entry.nutrientIntro}</p><div className="nutrient-table-scroll" role="region" aria-label="Nutrient comparison" tabIndex={0}><table aria-describedby="nutrient-table-intro"><caption>What each nutrient does and what too little may look like</caption><thead><tr><th scope="col">Nutrient</th><th scope="col">Why plants need it</th><th scope="col">If there is too little</th></tr></thead><tbody>{entry.nutrients.map(nutrient => <tr key={nutrient.name}><th scope="row">{nutrient.name}<span>{nutrient.symbol}</span></th><td>{nutrient.role}</td><td>{nutrient.deficiency}</td></tr>)}</tbody></table></div></section>
}

export default function LearnPage() {
  const [location, setLocation] = useState(readLocation)
  const { entryId, category, groupId } = location
  const [search, setSearch] = useState(() => readLocation().search)
  useEffect(() => {
    const handleHash = () => { const next = readLocation(); setLocation(next); setSearch(next.search) }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])
  const entry = ENCYCLOPEDIA.find(item => item.id === entryId)
  const query = search.trim().toLowerCase()
  const selectedGroup = category === 'fish' ? fishGroups.find(group => group.id === groupId) : null
  const selectedPlantGroup = category === 'plants' ? plantGroups.find(group => group.id === groupId) : null
  const entries = filterLearningEntries(ENCYCLOPEDIA, { category, groupId: selectedGroup?.id, search })
    .filter(item => !selectedPlantGroup || (item.category === 'plants' && item.kind !== 'guide' && plantTypeFor(item) === selectedPlantGroup.name))
  const visibleGroups = groupFishEntries(entries)
  const visiblePlantGroups = plantGroups.map(group => ({ ...group, entries: group.entries.filter(entry => entries.includes(entry)) })).filter(group => group.entries.length)
  const guideEntries = entries.filter(item => item.kind === 'guide')
  const otherEntries = entries.filter(item => item.kind !== 'guide' && item.category !== 'fish' && item.category !== 'plants')
  const clearFilters = () => { setSearch(''); window.location.hash = libraryLink(category, selectedGroup?.id || selectedPlantGroup?.id) }

  if (entry) {
    const entryGroup = entry.category === 'fish' ? fishGroupFor(entry) : entry.category === 'plants' ? plantGroupFor(entry) : null
    const related = ENCYCLOPEDIA.filter(item => item.category === entry.category && item.id !== entry.id && (!entryGroup || (entry.category === 'fish' ? fishGroupFor(item)?.id : plantGroupFor(item)?.id) === entryGroup.id)).slice(0, 3)
    return <main className="browse-main encyclopedia-main" data-guide="learn" tabIndex={-1}>
      <div className="library-breadcrumb"><a href={libraryLink(entry.category, entryGroup?.id, search)}><Icon name="arrow" size={15} />{entryGroup ? `Back to ${entryGroup.name}` : 'Back to the library'}</a><span>{entryGroup ? <a href={libraryLink(entry.category)}>All {entry.category} groups</a> : categoryName(entry.category)}</span></div>
      <article className="encyclopedia-entry" data-guide="learn-search">
        <div className="entry-overview"><EntryArt entry={entry} className="entry-hero-art" showCredit /><div className="entry-profile"><span className="library-category">{categoryName(entry.category)} · Field guide</span><h1>{entry.name}</h1>{entry.scientific && <p className="entry-scientific">{entry.scientific}</p>}{entry.chinese && <p className="entry-chinese">{entry.chinese}</p>}<p className="entry-headline">{entry.headline}</p><dl className="entry-facts">{entry.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>{entry.sourceUrl && <a className="entry-source-link" href={entry.sourceUrl} target="_blank" rel="noreferrer">Care reference: Green Aqua <Icon name="arrow" size={13} /></a>}</div></div>
        {entry.galleryPhotos?.length > 0 && <div className="entry-photo-gallery">{entry.galleryPhotos.map(photo => <figure key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy" /><figcaption>{photo.alt} · Photo: <a href={photo.source} target="_blank" rel="noreferrer">{photo.credit}</a> · <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a> (display crop)</figcaption></figure>)}</div>}
        {entry.nutrients?.length > 0 && <NutrientTable entry={entry} />}
        <div className="entry-sections">{entry.sections.map(([title, content], i) => <section key={title}><span className="entry-section-number">0{i + 1}</span><div><h2>{title}</h2><p>{content}</p></div></section>)}</div>
        {entry.sources?.length > 0 && <section className="entry-reading-sources" aria-label="Guide sources"><h2>Sources & further reading</h2><p>Deficiency patterns vary by species. The general plant reference explains leaf symptoms; the aquarium references cover nutrient supply and care.</p><ul>{entry.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.name} <Icon name="arrow" size={13} /></a></li>)}</ul></section>}
      </article>
      {((entry.category === 'plants' && entry.kind !== 'guide') || entry.id === 'supply-fertilizer') && <PlantNutritionLink />}
      <div className="entry-store-link"><Icon name={entry.icon} size={23} /><div><h2>Bring what you learn into your tank</h2><p>Explore the fish, plants and supplies in Fish store</p></div><a className="secondary-button" href="#/store">Visit Fish store <Icon name="arrow" size={15} /></a></div>
      {related.length > 0 && <section className="related-library"><h2>Keep exploring</h2><div className="library-grid">{related.map(item => <EntryCard key={item.id} entry={item} />)}</div></section>}
      <p className="page-footnote">Care ranges are general starting points Needs vary by population, life stage and setup; confirm species identity and current product instructions for a real aquarium</p>
    </main>
  }

  return <main className="browse-main encyclopedia-main" data-guide="learn" tabIndex={-1}>
    {(selectedGroup || selectedPlantGroup) && <div className="library-breadcrumb"><a href={libraryLink(category, '', search)}><Icon name="arrow" size={15} />All {category} groups</a><span>{categoryName(category)} · {(selectedGroup || selectedPlantGroup).name}</span></div>}
    <div className="section-heading"><div><h1>{selectedGroup || selectedPlantGroup ? <>{(selectedGroup || selectedPlantGroup).name} <em>field guide</em></> : <>The aquarium <em>library</em></>}</h1><p>{selectedGroup ? selectedGroup.chinese : selectedPlantGroup ? 'Meet each plant and its aquascaping role' : 'Explore fish by group, understand plants and discover aquarium care'}</p></div><span className="library-count"><Icon name="book" size={22} /><strong>{selectedGroup || selectedPlantGroup ? (selectedGroup || selectedPlantGroup).entries.length : ENCYCLOPEDIA.length}</strong> entries to explore</span></div>
    {!selectedGroup && !selectedPlantGroup && <section className="library-intro"><div><span className="library-category">A little knowledge, always within reach</span>{category === 'plants' ? <><h2>Grow a little<br /><em>underwater world</em></h2><p>Explore {plantGroups.length} plant groups by growth form, then meet every species and cultivar in the Green Aqua collection.</p></> : <><h2>Know your fish<br /><em>Understand their world</em></h2><p>Explore {fishGroups.length} fish groups — their characteristics, distribution, morphology and habits — then meet every fish within them.</p></>}</div><div className="library-intro-art" aria-hidden="true"><img src={category === 'plants' ? ENCYCLOPEDIA.find(item => item.id === 'plant-anubias')?.art : '/art/betta.svg'} alt="" /><span>{category === 'plants' ? 'Aquatic plants' : 'Betta splendens'}</span></div></section>}
    <div className="library-tools"><div className="browse-tabs" role="group" aria-label="Encyclopedia categories">{ENCYCLOPEDIA_CATEGORIES.map(item => <button key={item.id} aria-pressed={category === item.id} onClick={() => { window.location.hash = libraryLink(item.id, '', search) }}>{item.name}</button>)}</div><label className="search-field" data-guide="learn-search"><Icon name="search" size={16} /><input aria-label="Search the encyclopedia" placeholder={selectedGroup ? `Search within ${selectedGroup.name}…` : 'A fish, a group, a plant…'} value={search} onChange={event => setSearch(event.target.value)} /></label></div>
    {category === 'fish' && <label className="fish-group-picker">Fish group<select value={selectedGroup?.id || ''} onChange={event => { window.location.hash = libraryLink('fish', event.target.value, search) }}><option value="">All fish groups</option>{fishGroups.map(group => <option key={group.id} value={group.id}>{group.name} ({group.entries.length})</option>)}</select></label>}
    {category === 'plants' && <label className="fish-group-picker">Plant group<select value={selectedPlantGroup?.id || ''} onChange={event => { window.location.hash = libraryLink('plants', event.target.value, search) }}><option value="">All plant groups</option>{plantGroups.map(group => <option key={group.id} value={group.id}>{group.name} ({group.entries.length})</option>)}</select></label>}
    {selectedGroup && <FishGroupProfile group={selectedGroup} />}
    {selectedPlantGroup && <PlantNutritionLink />}
    <div className="library-results" aria-live="polite">{entries.length} {entries.length === 1 ? 'entry' : 'entries'}{query ? ` matching “${search.trim()}”` : ` · ${selectedGroup?.name || selectedPlantGroup?.name || categoryName(category)}`}{query && <button onClick={clearFilters}>Clear search</button>}</div>
    {entryId && <p className="inline-help" role="status">That entry is not available You can explore the library below</p>}
    {groupId && !selectedGroup && !selectedPlantGroup && <p className="inline-help" role="status">That group is not available. Explore the groups below.</p>}
    {selectedGroup || selectedPlantGroup ? <section aria-label={`Entries in ${(selectedGroup || selectedPlantGroup).name}`}><h2 className="library-section-title">{category === 'fish' ? 'Fish' : 'Plants'} in this group</h2><div className="library-grid">{entries.map(item => <EntryCard key={item.id} entry={item} search={search} />)}</div></section> : <>
      {guideEntries.length > 0 && <section className="learning-guides" aria-label="Plant care guides"><h2 className="library-section-title">Plant care guides</h2>{guideEntries.map(item => <EntryCard key={item.id} entry={item} search={search} />)}</section>}
      {visibleGroups.length > 0 && <section aria-label="Fish groups"><div className="fish-group-section-heading"><h2 className="library-section-title">Explore fish groups</h2><span>{visibleGroups.length} groups · {entries.filter(item => item.category === 'fish').length} fish entries</span></div><div className="library-grid">{visibleGroups.map(group => <FishGroupCard key={group.id} group={group} search={search} />)}</div></section>}
      {visiblePlantGroups.length > 0 && <section aria-label="Plant groups"><div className="fish-group-section-heading"><h2 className="library-section-title">Explore plant groups</h2><span>{visiblePlantGroups.length} groups · {visiblePlantGroups.reduce((sum, group) => sum + group.entries.length, 0)} plant entries</span></div><div className="library-grid">{visiblePlantGroups.map(group => <PlantGroupCard key={group.id} group={group} search={search} />)}</div></section>}
      {otherEntries.length > 0 && <section aria-label="Other library entries">{category === 'all' && <h2 className="library-section-title library-other-title">Equipment & care</h2>}<div className="library-grid">{otherEntries.map(item => <EntryCard key={item.id} entry={item} search={search} />)}</div></section>}
    </>}
    {!entries.length && <div className="empty-state"><Icon name="search" size={28} /><h2>No entries found</h2><p>Try another name or choose a different group or category.</p><button className="secondary-button" onClick={clearFilters}>Clear search</button><a className="secondary-button" href={libraryLink('fish')}>Explore all fish groups</a></div>}
    <p className="page-footnote">A reference library for fish, plants, substrates, equipment and care supplies Open an entry to find habitat, care and usage details</p>
  </main>
}
