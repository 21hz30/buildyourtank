export const STORAGE_KEY = 'buildyourtank:v1'
export const CATALOG = {
  fish: [
    { id: 'tetra', name: 'Congo tetra', scientific: 'Phenacogrammus interruptus', description: 'An iridescent schooler that enjoys company and swimming space.', price: 4, load: 1, art: '/art/congo-tetra.svg', tag: 'Schooling', color: '#8ed0db' },
    { id: 'angelfish', name: 'Angelfish', scientific: 'Pterophyllum scalare', description: 'A graceful swimmer that needs room to grow.', price: 12, load: 4, art: '/art/angelfish.png', tag: 'Room to grow', color: '#e6c08b' },
    { id: 'betta', name: 'Betta', scientific: 'Betta splendens', description: 'Flowing fins, a big personality. Best kept solo.', price: 10, load: 2, art: '/art/betta.svg', tag: 'Solo swimmer', color: '#df9996' },
    { id: 'danio', name: 'Celestial pearl danio', scientific: 'Danio margaritatus', description: 'A small spotted explorer. Keep a suitable group with gentle neighbors.', price: 5, load: 1, art: '/art/pearl-danio.svg', tag: 'Easygoing', color: '#c1bced' },
    { id: 'rasbora', name: 'Harlequin rasbora', scientific: 'Trigonostigma heteromorpha', description: 'A peaceful schooler with a copper glow.', price: 6, load: 1, art: '/art/rasbora.svg', tag: 'Peaceful', color: '#e8bd91' },
    { id: 'cichlid', name: 'Nigerian red cichlid', scientific: 'Pelvicachromis taeniatus', description: 'A colorful cave dweller with a territorial streak.', price: 11, load: 3, art: '/art/cichlid.svg', tag: 'Territorial', color: '#deb1cc' },
  ],
  plants: [
    { id: 'anubias', name: 'Anubias Kirin', description: 'Broad leaves. Low light. A lovely first plant.', price: 5, art: '/art/anubias.svg', tag: 'Low light', color: '#aac8a4' },
    { id: 'fern', name: 'Rotala rotundifolia', description: 'A stem plant that adds height and cover to the background.', price: 7, art: '/art/rotala.svg', tag: 'Background stems', color: '#7cbca6' },
    { id: 'grass', name: 'Monte Carlo', description: 'A compact green carpet for the foreground.', price: 6, art: '/art/monte-carlo.svg', tag: 'Carpet plant', color: '#b8ce8a' },
  ],
}
export const SIZES = [
  { id: '60p', name: '60P', dimensions: '60 × 30 × 36 cm', litres: 65, price: 18, capacity: 13 },
  { id: '120p', name: '120P', dimensions: '120 × 50 × 50 cm', litres: 300, price: 36, capacity: 28 },
  { id: '150p', name: '150P', dimensions: '150 × 60 × 50 cm', litres: 450, price: 48, capacity: 40 },
]
export const SANDS = [
  { id: 'sand', name: 'ADA Power Sand Advance', price: 4, ph: 7.0, color: '#dbcaab' },
  { id: 'gravel', name: 'Tropica Aquarium Soil', price: 6, ph: 7.2, color: '#b0b5a6' },
  { id: 'soil', name: 'ADA Aqua Soil Amazonia', price: 8, ph: 6.7, color: '#958e76' },
]
export const GLASS = [{ id: 'regular', name: 'Regular glass', price: 0 }, { id: 'clear', name: 'Super white glass', price: 5 }]
export const FISH_DETAILS = {
  tetra: { temperament: 'Peaceful · schooling', diet: 'Omnivore', space: 'Swimming room for a group', waste: 'Low' },
  angelfish: { temperament: 'Watch smaller tankmates', diet: 'Omnivore · higher food needs', space: 'A larger, taller aquarium', waste: 'Medium' },
  betta: { temperament: 'Territorial · solo setup', diet: 'Carnivore', space: 'A calm, planted solo home', waste: 'High' },
  danio: { temperament: 'Gentle · suitable groups', diet: 'Omnivore', space: 'A smaller planted habitat', waste: 'Low' },
  rasbora: { temperament: 'Peaceful · schooling', diet: 'Omnivore', space: 'Open swimming space and cover', waste: 'Low' },
  cichlid: { temperament: 'Territorial · needs hiding places', diet: 'Omnivore · higher food needs', space: 'A larger aquarium with caves', waste: 'High' },
}
export const FILTERS = [
  { id: 'sponge', name: 'Sponge filter', price: 8, capacity: 13 },
  { id: 'hang', name: 'Hang-on filter', price: 13, capacity: 25 },
  { id: 'canister', name: 'Canister filter', price: 20, capacity: 40 },
]
export const IDEAS = [
  { id: 'green', name: 'The little jungle', note: 'Lots of leaves. A bright little school.', fish: { tetra: 4 }, plants: { anubias: 2, fern: 1, grass: 1 }, sand: 'soil' },
  { id: 'quiet', name: 'The quiet corner', note: 'One betta. A soft place to slow down.', fish: { betta: 1 }, plants: { anubias: 1, fern: 2 }, sand: 'sand' },
  { id: 'sunny', name: 'The sunny school', note: 'Easygoing swimmers and open space.', fish: { danio: 3, rasbora: 2 }, plants: { grass: 2, fern: 1 }, sand: 'gravel' },
]
export function createTank() {
  return { version: 1, name: 'My little world', size: '60p', fish: { tetra: 3, angelfish: 1 }, plants: { anubias: 1, fern: 1 }, sand: 'sand', filter: 'sponge', glass: 'regular', water: { temperature: 25, hardness: 7, nutrients: 3 }, isPublic: false, earned: 0, care: {}, savedAt: null }
}
function quantities(input, options, max) {
  const result = {}
  if (!input || typeof input !== 'object' || Array.isArray(input)) return result
  for (const item of options) {
    if (Number.isInteger(input[item.id]) && input[item.id] > 0 && input[item.id] <= max) result[item.id] = input[item.id]
  }
  return result
}
export function normalizeTank(value) {
  if (!value || value.version !== 1 || typeof value.name !== 'string' || !SIZES.some(x => x.id === value.size)) return null
  const tank = {
    version: 1, name: value.name.slice(0, 40) || 'My little world', size: value.size,
    fish: quantities(value.fish, CATALOG.fish, 12), plants: quantities(value.plants, CATALOG.plants, 6),
    sand: SANDS.some(x => x.id === value.sand) ? value.sand : 'sand',
    filter: FILTERS.some(x => x.id === value.filter) ? value.filter : 'sponge',
    glass: GLASS.some(x => x.id === value.glass) ? value.glass : 'regular',
    water: { ...(typeof value.water?.ph === 'number' && value.water.ph >= 4 && value.water.ph <= 9 ? { ph: value.water.ph } : {}), temperature: typeof value.water?.temperature === 'number' && value.water.temperature >= 18 && value.water.temperature <= 32 ? value.water.temperature : 25, hardness: typeof value.water?.hardness === 'number' && value.water.hardness >= 1 && value.water.hardness <= 20 ? value.water.hardness : 7, nutrients: typeof value.water?.nutrients === 'number' && value.water.nutrients >= 0 && value.water.nutrients <= 10 ? value.water.nutrients : 3 },
    isPublic: value.isPublic === true,
    earned: Number.isInteger(value.earned) && value.earned >= 0 && value.earned <= 10000 ? value.earned : 0,
    care: {}, savedAt: typeof value.savedAt === 'string' ? value.savedAt.slice(0, 40) : null,
  }
  for (const action of ['feed', 'water', 'fertilizer']) if (typeof value.care?.[action] === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value.care[action])) tank.care[action] = value.care[action]
  if (tankCost(tank) > 100 + tank.earned) return null
  return tank
}
export function tankCost(tank) {
  return SIZES.find(x => x.id === tank.size).price + SANDS.find(x => x.id === tank.sand).price + FILTERS.find(x => x.id === tank.filter).price + (GLASS.find(x => x.id === tank.glass)?.price || 0) + ['fish', 'plants'].reduce((sum, type) => sum + CATALOG[type].reduce((s, item) => s + item.price * (tank[type][item.id] || 0), 0), 0)
}
export function remainingCoins(tank) { return 100 + tank.earned - tankCost(tank) }
export function changeItem(tank, type, id, delta) {
  const item = CATALOG[type]?.find(x => x.id === id)
  if (!item || ![-1, 1].includes(delta)) return { error: 'Choose a catalog item first.' }
  const count = (tank[type][id] || 0) + delta
  if (count < 0 || count > (type === 'fish' ? 12 : 6)) return { error: `That is enough ${item.name.toLowerCase()} for this demo.` }
  if (delta > 0 && item.price > remainingCoins(tank)) return { error: 'A few more coins needed. Try a care task or remove an item.' }
  return { tank: { ...tank, [type]: { ...tank[type], [id]: count } } }
}
export function changeSetup(tank, field, value) {
  const options = field === 'size' ? SIZES : field === 'sand' ? SANDS : field === 'filter' ? FILTERS : []
  if (!options.some(x => x.id === value)) return { error: 'Choose one of the available options.' }
  const next = { ...tank, [field]: value }
  if (remainingCoins(next) < 0) return { error: 'This setup needs a few more coins. Try a care task first.' }
  return { tank: next }
}
export function today() {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
export function careForTank(tank, action, day = today()) {
  if (!['feed', 'water'].includes(action)) return { error: 'Choose a care action.' }
  if (tank.care[action] === day) return { error: action === 'feed' ? 'Already fed today. A little food goes a long way.' : 'Fresh water already added today.' }
  if (action === 'feed' && !Object.values(tank.fish).some(count => count > 0)) return { error: 'Add a swimmer before feeding time.' }
  const reward = action === 'feed' ? 5 : 8
  return { tank: { ...tank, earned: tank.earned + reward, care: { ...tank.care, [action]: day } }, reward }
}
export function getHealth(tank) {
  const size = SIZES.find(x => x.id === tank.size)
  const filter = FILTERS.find(x => x.id === tank.filter)
  const load = CATALOG.fish.reduce((sum, fish) => sum + fish.load * (tank.fish[fish.id] || 0), 0)
  const plantCount = Object.values(tank.plants).reduce((sum, count) => sum + count, 0)
  const fishCount = Object.values(tank.fish).reduce((sum, count) => sum + count, 0)
  const capacity = Math.min(size.capacity, filter.capacity) + Math.min(plantCount, 6)
  const warnings = []
  if (load > capacity) warnings.push('Too many swimmers for this setup. A bigger tank or stronger filter can help.')
  if (tank.fish.betta > 0 && fishCount > 1) warnings.push('Bettas like their own space. Try a solo tank to avoid fin-nipping.')
  if (tank.fish.angelfish > 0 && tank.fish.tetra > 0) warnings.push('As angelfish grow, tiny fish can look like food. Keep an eye on this mix.')
  if (tank.fish.cichlid > 0 && fishCount > tank.fish.cichlid) warnings.push('Dwarf cichlids can claim territory. Add hiding places and give them room.')
  const ph = tank.water?.ph ?? SANDS.find(x => x.id === tank.sand).ph
  const parameterWarnings = []
  if (ph < 6 || ph > 8) parameterWarnings.push('The pH setting is outside this demo’s usual freshwater band (6–8).')
  if (tank.water?.temperature < 22 || tank.water?.temperature > 28) parameterWarnings.push('The temperature setting is outside this demo’s usual tropical band (22–28 °C).')
  if (tank.water?.nutrients > 7) parameterWarnings.push('The nutrient setting is high in this demo. Try a smaller dose and review your care routine.')
  warnings.push(...parameterWarnings)
  const quality = Math.max(30, Math.min(96, 98 - load * 1.3 + plantCount * 1.5 - Math.max(0, load - capacity) * 3 - parameterWarnings.length * 8))
  return { load, capacity, plantCount, fishCount, warnings, quality: Math.round(quality), ph: ph.toFixed(1), status: load > capacity ? 'Needs some room' : 'Looking good' }
}
export function simulate(tank) {
  const health = getHealth(tank)
  return { ...health, quality: Math.max(20, Math.round(health.quality - (health.load > health.capacity ? 22 : 6) + Math.min(health.plantCount * 2, 8))), growth: health.plantCount ? 'A little fuller' : 'No plants yet', outlook: health.warnings.length ? 'A few things to watch' : 'A happy little habitat' }
}
export function snapshotLink(tank, base) {
  const { id, ...snapshot } = tank
  const bytes = new TextEncoder().encode(JSON.stringify({ ...snapshot, care: {}, savedAt: null }))
  const payload = btoa(String.fromCharCode(...bytes)).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '')
  return `${base.split('#')[0]}#tank=${payload}`
}
export function readSnapshot(hash) {
  if (!hash.startsWith('#tank=')) return { tank: null, invalid: false }
  try {
    const payload = hash.slice(6)
    if (payload.length > 12000) throw new Error('Oversize snapshot')
    const decoded = atob(payload.replaceAll('-', '+').replaceAll('_', '/'))
    const tank = normalizeTank(JSON.parse(new TextDecoder().decode(Uint8Array.from(decoded, x => x.charCodeAt(0)))))
    return { tank, invalid: !tank }
  } catch { return { tank: null, invalid: true } }
}
export function loadTank(storage) {
  try { return normalizeTank(JSON.parse(storage.getItem(STORAGE_KEY))) || createTank() } catch { return createTank() }
}
