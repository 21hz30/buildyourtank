import { tetraDetails, tetraListings } from './tetraCatalog.js'
import { additionalFish, additionalFishDetails } from './fishCatalog.js'
import { aquariumPlantListings } from './plantCatalog.js'
import { SCAPES } from './scapes.js'

export const STORAGE_KEY = 'buildyourtank:v1'
// Tank illustrations show full-grown fish at the upper end of each listed adult length.
export const CATALOG = {
  fish: [
    {
      id: 'tetra', name: 'Congo tetra', scientific: 'Phenacogrammus interruptus',
      description: 'An iridescent African schooler Keep 7–8 together with generous open swimming space in a 200 L or larger aquarium',
      price: 4, load: 1, adultLengthCm: 9, art: '/art/congo-tetra.svg', artLengthRatio: 232 / 260, artAspectRatio: 260 / 150, photo: '/art/congo-tetra.jpg', tag: 'Schooling', color: '#8ed0db',
      photoCredit: 'André Karwath', photoSource: 'https://commons.wikimedia.org/wiki/File:Phenacogrammus_interruptus_(aka).jpg', photoLicense: 'CC BY-SA 2.5', photoLicenseUrl: 'https://creativecommons.org/licenses/by-sa/2.5/',
    },
    ...tetraListings,
    {
      id: 'angelfish', name: 'Angelfish', scientific: 'Pterophyllum scalare',
      description: 'A tall, graceful South American cichlid that needs a spacious, planted aquarium and stable, clean water',
      price: 12, load: 4, adultLengthCm: 15, art: '/art/angelfish.svg', artLengthRatio: 217 / 230, artAspectRatio: 230 / 240, photo: '/art/angelfish-photo.jpg', tag: 'Room to grow', color: '#e6c08b',
      photoCredit: 'Karelj', photoSource: 'https://commons.wikimedia.org/wiki/File:Pterophyllum_scalare_1.jpg', photoLicense: 'Public domain', photoLicenseUrl: 'https://commons.wikimedia.org/wiki/File:Pterophyllum_scalare_1.jpg#Licensing',
    },
    {
      id: 'betta', name: 'Betta', scientific: 'Betta splendens',
      description: 'A warm-water labyrinth fish with flowing fins One male needs a calm, planted home with gentle flow and surface access',
      price: 10, load: 2, adultLengthCm: 7, art: '/art/betta.svg', artLengthRatio: 255 / 260, artAspectRatio: 260 / 190, photo: '/art/betta-photo.jpg', tag: 'Solo swimmer', color: '#df9996',
      photoCredit: 'Pharaoh Hound', photoSource: 'https://commons.wikimedia.org/wiki/File:Betta_splendens_male_doubletail.jpg', photoLicense: 'CC BY-SA 3.0', photoLicenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    {
      id: 'danio', name: 'Celestial pearl danio', scientific: 'Danio margaritatus',
      description: 'A tiny spotted schooler from Myanmar Keep at least six in a densely planted aquarium with peaceful companions',
      price: 5, load: 1, adultLengthCm: 3, art: '/art/pearl-danio.svg', artLengthRatio: 246 / 260, artAspectRatio: 260 / 130, photo: '/art/celestial-pearl-danio-photo.jpg', tag: 'Easygoing', color: '#c1bced',
      photoCredit: 'Pseudogastromyzon', photoSource: 'https://commons.wikimedia.org/wiki/File:Celestial_pearl_danio_(male).jpg', photoLicense: 'Public domain', photoLicenseUrl: 'https://commons.wikimedia.org/wiki/File:Celestial_pearl_danio_(male).jpg#Licensing',
    },
    {
      id: 'rasbora', name: 'Harlequin rasbora', scientific: 'Trigonostigma heteromorpha',
      description: 'A peaceful copper-colored schooler with a distinctive dark wedge Keep at least eight with plants and swimming room',
      price: 6, load: 1, adultLengthCm: 4, art: '/art/rasbora.svg', artLengthRatio: 248 / 260, artAspectRatio: 260 / 140, photo: '/art/harlequin-rasbora-photo.jpg', tag: 'Peaceful school', color: '#e8bd91',
      photoCredit: 'Billyhill', photoSource: 'https://commons.wikimedia.org/wiki/File:Trigonostigma_heteromorpha.JPG', photoLicense: 'CC BY-SA 3.0', photoLicenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    {
      id: 'cichlid', name: 'Nigerian red cichlid', scientific: 'Pelvicachromis taeniatus “Nigerian red”',
      description: 'A colorful West African dwarf cichlid best kept as a compatible pair with caves, fine substrate and clear territories',
      price: 11, load: 3, adultLengthCm: 9, art: '/art/cichlid.svg', artLengthRatio: 249 / 260, artAspectRatio: 260 / 150, photo: '/art/nigerian-red-photo.jpg', tag: 'Pair · cave spawner', color: '#deb1cc',
      photoCredit: 'Neale Monks', photoSource: 'https://commons.wikimedia.org/wiki/File:Pelvicachromis_taeniatus.JPG', photoLicense: 'CC BY-SA 3.0', photoLicenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    ...additionalFish,
  ],
  plants: aquariumPlantListings,
}
export const SIZES = [
  { id: '60p', name: '60cm', dimensions: '60 × 30 × 36 cm', lengthCm: 60, heightCm: 36, litres: 65, price: 18, capacity: 13 },
  { id: '120p', name: '120cm', dimensions: '120 × 50 × 50 cm', lengthCm: 120, heightCm: 50, litres: 300, price: 36, capacity: 28 },
  { id: '150p', name: '150cm', dimensions: '150 × 60 × 50 cm', lengthCm: 150, heightCm: 50, litres: 450, price: 48, capacity: 40 },
]
export const SANDS = [
  { id: 'sand', name: 'ADA Power Sand Advance', price: 4, ph: 7.0, color: '#dbcaab' },
  { id: 'gravel', name: 'Tropica Aquarium Soil', price: 6, ph: 7.2, color: '#b0b5a6' },
  { id: 'soil', name: 'ADA Aqua Soil Amazonia', price: 8, ph: 6.7, color: '#958e76' },
]
export const GLASS = [{ id: 'regular', name: 'Regular glass', price: 0 }, { id: 'clear', name: 'Super white glass', price: 5 }]
export const FISH_DETAILS = {
  tetra: { temperament: 'Peaceful · school of 7–8', diet: 'Omnivore · varied small foods', space: '200 L+ · long swimming area', waste: 'Low' },
  ...tetraDetails,
  angelfish: { temperament: 'Social · territorial when spawning', diet: 'Omnivore · varied foods', space: 'Tall 150 L+ aquarium · group of 4–6', waste: 'Medium' },
  betta: { temperament: 'Territorial · one male per setup', diet: 'Carnivore · protein-rich foods', space: 'Calm 40 L+ aquarium · secure lid', waste: 'High' },
  danio: { temperament: 'Peaceful · group of 6 or more', diet: 'Omnivore · fine foods', space: 'Densely planted 30 L+ aquarium', waste: 'Low' },
  rasbora: { temperament: 'Very peaceful · school of 8 or more', diet: 'Omnivore · small foods', space: '65 L+ · plants and open water', waste: 'Low' },
  cichlid: { temperament: 'Pair-forming · territorial when spawning', diet: 'Varied omnivorous foods', space: '100 L+ · caves and visual barriers', waste: 'High' },
  ...additionalFishDetails,
}
export const FILTERS = [
  { id: 'sponge', name: 'Sponge filter', price: 8, capacity: 13 },
  { id: 'hang', name: 'Hang-on filter', price: 13, capacity: 25 },
  { id: 'canister', name: 'Canister filter', price: 20, capacity: 40 },
]
export const IDEAS = [
  { id: 'green', name: 'The little jungle', note: 'Lots of leaves A bright little school', fish: { tetra: 4 }, plants: { anubias: 2, fern: 1, grass: 1 }, sand: 'soil', scape: 'woodland-pillars' },
  { id: 'quiet', name: 'The quiet corner', note: 'One betta A soft place to slow down', fish: { betta: 1 }, plants: { anubias: 1, fern: 2 }, sand: 'sand', scape: 'branching-banks' },
  { id: 'sunny', name: 'The sunny school', note: 'Easygoing swimmers and open space', fish: { danio: 3, rasbora: 2 }, plants: { grass: 2, fern: 1 }, sand: 'gravel', scape: 'stone-ridge' },
]
export function createTank() {
  return { version: 1, name: 'My little world', size: '60p', fish: { tetra: 3, angelfish: 1 }, plants: { anubias: 1, fern: 1 }, sand: 'sand', scape: 'classic', filter: 'sponge', glass: 'regular', water: { temperature: 25, hardness: 7, nutrients: 3, co2: 0 }, isPublic: false, earned: 0, care: {}, savedAt: null }
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
    scape: SCAPES.some(x => x.id === value.scape) ? value.scape : 'classic',
    filter: FILTERS.some(x => x.id === value.filter) ? value.filter : 'sponge',
    glass: GLASS.some(x => x.id === value.glass) ? value.glass : 'regular',
    water: { ...(typeof value.water?.ph === 'number' && value.water.ph >= 4 && value.water.ph <= 9 ? { ph: value.water.ph } : {}), temperature: typeof value.water?.temperature === 'number' && value.water.temperature >= 18 && value.water.temperature <= 32 ? value.water.temperature : 25, hardness: typeof value.water?.hardness === 'number' && value.water.hardness >= 1 && value.water.hardness <= 20 ? value.water.hardness : 7, nutrients: typeof value.water?.nutrients === 'number' && value.water.nutrients >= 0 && value.water.nutrients <= 10 ? value.water.nutrients : 3, co2: Number.isInteger(value.water?.co2) && value.water.co2 >= 0 && value.water.co2 <= 10 ? value.water.co2 : 0 },
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
  if (!item || ![-1, 1].includes(delta)) return { error: 'Choose a catalog item first' }
  const count = (tank[type][id] || 0) + delta
  if (count < 0 || count > (type === 'fish' ? 12 : 6)) return { error: `That is enough ${item.name.toLowerCase()} for this demo` }
  if (delta > 0 && item.price > remainingCoins(tank)) return { error: 'A few more coins needed Try a care task or remove an item' }
  return { tank: { ...tank, [type]: { ...tank[type], [id]: count } } }
}
export function changeSetup(tank, field, value) {
  const options = field === 'size' ? SIZES : field === 'sand' ? SANDS : field === 'filter' ? FILTERS : field === 'scape' ? SCAPES : []
  if (!options.some(x => x.id === value)) return { error: 'Choose one of the available options' }
  const next = { ...tank, [field]: value }
  if (remainingCoins(next) < 0) return { error: 'This setup needs a few more coins Try a care task first' }
  return { tank: next }
}
export function today() {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
export function careForTank(tank, action, day = today()) {
  if (!['feed', 'water'].includes(action)) return { error: 'Choose a care action' }
  if (tank.care[action] === day) return { error: action === 'feed' ? 'Already fed today A little food goes a long way' : 'Fresh water already added today' }
  if (action === 'feed' && !Object.values(tank.fish).some(count => count > 0)) return { error: 'Add a swimmer before feeding time' }
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
  if (load > capacity) warnings.push('Too many swimmers for this setup A bigger tank or stronger filter can help')
  if (tank.fish.betta > 0 && fishCount > 1) warnings.push('Bettas like their own space Try a solo tank to avoid fin-nipping')
  if (tank.fish.angelfish > 0 && tank.fish.tetra > 0) warnings.push('As angelfish grow, tiny fish can look like food Keep an eye on this mix')
  if (tank.fish.cichlid > 0 && fishCount > tank.fish.cichlid) warnings.push('Dwarf cichlids can claim territory Add hiding places and give them room')
  const ph = tank.water?.ph ?? SANDS.find(x => x.id === tank.sand).ph
  const parameterWarnings = []
  if (ph < 6 || ph > 8) parameterWarnings.push('The pH setting is outside this demo’s usual freshwater band (6–8)')
  if (tank.water?.temperature < 22 || tank.water?.temperature > 28) parameterWarnings.push('The temperature setting is outside this demo’s usual tropical band (22–28 °C)')
  if (tank.water?.nutrients > 7) parameterWarnings.push('The nutrient setting is high in this demo Try a smaller dose and review your care routine')
  if (tank.water?.co2 >= 8) parameterWarnings.push('The CO₂ setting is high in this demo In a real tank, verify dissolved CO₂ and watch your fish for distress')
  warnings.push(...parameterWarnings)
  const quality = Math.max(30, Math.min(96, 98 - load * 1.3 + plantCount * 1.5 - Math.max(0, load - capacity) * 3 - parameterWarnings.length * 8))
  return { load, capacity, plantCount, fishCount, warnings, quality: Math.round(quality), ph: ph.toFixed(1), status: load > capacity ? 'Needs some room' : 'Looking good' }
}
export function simulate(tank) {
  const health = getHealth(tank)
  const co2 = tank.water?.co2 || 0
  return { ...health, quality: Math.max(20, Math.round(health.quality - (health.load > health.capacity ? 22 : 6) + Math.min(health.plantCount * 2, 8))), growth: health.plantCount ? co2 > 0 && co2 < 8 ? 'A little fuller with CO₂' : 'A little fuller' : 'No plants yet', outlook: health.warnings.length ? 'A few things to watch' : 'A happy little habitat' }
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
