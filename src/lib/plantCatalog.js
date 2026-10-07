import products from './greenAquaPlantProducts.json' with { type: 'json' }
import { plantModelUri, plantPalette } from './plantModels.js'
import plantPhotos from './plantPhotos.json' with { type: 'json' }

export const PLANT_TYPES = [
  'Carpeting plants', 'Grass-like plants', 'Stem plants', 'Rosettes & swords',
  'Rhizome & epiphytes', 'Mosses & liverworts', 'Algae balls', 'Floating plants',
]

const excluded = /Terrarium Plant|Art Cards|\bAcorus pusillus\b|\bOphiopogon kyoto\b|Hygrophila pinnatifida and Moss|Microsorum and Anubias/i

function cleanName(productName) {
  let name = productName.replace(/^(?:Tropica|Dennerle|Green Aqua|Stoffels|ADA|Aqua Art)\s+(?:Plant|Plants|növény)\s*-\s*/i, '')
    .replace(/\s*[-–]?\s*(?:In[- ]Vitro|Pot in Single Package|Mini Pot|Bunch|PAD\s*[-–]?\s*9x9cm)\b/gi, '')
    .replace(/\s+PAD\s*$/i, '')
    .replace(/Narrowgrown\s+on\s+Mangrove\s+Wood.*$/i, 'Narrow')
    .replace(/\s+(?:rooted|grown)\s+on\s+(?:large\s+)?(?:Mangrove\s+)?Wood.*$/i, '')
    .replace(/\s+on\s+(?:large\s+)?(?:Mangrove\s+)?Wood.*$/i, '')
    .replace(/\s+on\s+(?:lava\s+)?Stone.*$/i, '')
    .replace(/\s+on\s+Coconuts?\b.*$/i, '')
    .replace(/\s+(?:S|M|XL|XXL)\s*$/i, '')
    .replace(/\s*[-–]\s*(?:XL|XXL|4-5cm|2-3cm)\s*$/i, '')
    .replace(/\s+With Suction Cup\.?$/i, '')
    .replace(/\s+\d{4}\s*$/i, '')
    .replace(/\s+/g, ' ').trim().replace(/[.\s-]+$/, '')
  name = name.replace(/^Micranthemum (?:sp\.|tweediei|tweedei) Monte Carlo$/i, 'Micranthemum tweediei Monte Carlo')
    .replace(/^(?:Hemianthus|Micranthemum) callitrichoides Cuba$/i, 'Micranthemum callitrichoides Cuba')
    .replace(/^Rotala (?:Vietnam|sp\.|rotundifolia) Hra$/i, 'Rotala rotundifolia Hra')
    .replace(/^Bucephalandra Kedagang$/i, 'Bucephalandra sp. Kedagang')
    .replace(/^Anubias (?:barteri var\. )?nana\b/i, 'Anubias barteri var. nana')
    .replace(/^Anubias barteri nana\b/i, 'Anubias barteri var. nana')
    .replace(/^Taxiphyllum spec\./i, 'Taxiphyllum sp.')
    .replace(/^Vesicularia dubyana Christmass Moss$/i, 'Vesicularia dubyana Christmas Moss')
    .replace(/^Rotala rotundifoliagreen$/i, 'Rotala rotundifolia Green')
    .replace(/^Hygrophyla\b/i, 'Hygrophila')
    .replace(/^Helanthium tenellum sp\. Green$/i, 'Helanthium tenellum Green')
    .replace(/^Echinodorus tenellus$/i, 'Helanthium tenellum')
    .replace(/^Eleocharis parvula mini pusilla$/i, 'Eleocharis pusilla')
    .replace(/^Bacopa salzmanii Purple$/i, 'Bacopa salzmannii Purple')
    .replace(/^Ammaniagracilis$/i, 'Ammannia gracilis')
    .replace(/^Nymphoides sp\. Taiwan$/i, 'Nymphoides hydrophylla Taiwan')
    .replace(/^Hydrocotyle sp\. Japan$/i, 'Hydrocotyle tripartita')
    .replace(/^Hemianthus micranthemoides$/i, 'Micranthemum micranthemoides')
    .replace(/^Rotala sp\. Vietnam Hra$/i, 'Rotala rotundifolia Hra')
    .replace(/^Pogostemon stellata Eusteralis$/i, 'Pogostemon stellatus Eusteralis')
    .replace(/^Pogostemon stellatus Eustralis$/i, 'Pogostemon stellatus Eusteralis')
    .replace(/^Cryptocoryne sp\. Flamingo$/i, 'Cryptocoryne Flamingo')
    .replace(/^Cryptocoryne balanse$/i, 'Cryptocoryne crispatula var. Balansae')
    .replace(/^Anubias sp\. Pangolino$/i, 'Anubias barteri var. nana Pangolino')
    .replace(/^Anubias barteri Petite$/i, 'Anubias barteri var. nana Petite')
    .replace(/^Taxiphyllum (?:sp\.|Spiky) Spiky Moss$/i, 'Taxiphyllum sp. Spiky')
    .replace(/^Taxiphyllum sp\. Spiky Moss$/i, 'Taxiphyllum sp. Spiky')
    .replace(/^Taxiphyllum Spiky Moss$/i, 'Taxiphyllum sp. Spiky')
    .replace(/^Taxiphyllum sp\. Flame moss$/i, 'Taxiphyllum sp. Flame Moss')
    .replace(/^Taxiphyllum Taiwan Moss$/i, 'Taxiphyllum alternans Taiwan Moss')
    .replace(/^Taxiphyllum barbieri(?: Moss| Vesicularia Bogor Moss)?$/i, 'Taxiphyllum barbieri')
    .replace(/^Riccia fluitans Moss$/i, 'Riccia fluitans')
    .replace(/^Vesicularia dubyana Christmas Moss$/i, 'Vesicularia montagnei Christmas Moss')
    .replace(/^Vesicularia dubyana Christmas$/i, 'Vesicularia montagnei Christmas Moss')
    .replace(/^Vesicularia montagnei$/i, 'Vesicularia montagnei Christmas Moss')
    .replace(/^Anubias barteri sp\.$/i, 'Anubias barteri')
  return name
}

function plantKey(name) {
  return name.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

export function plantTypeFor(plant) {
  if (plant.plantType) return plant.plantType
  const name = plant.name.toLowerCase()
  if (/cladophora aegagrophila/.test(name)) return 'Algae balls'
  if (/phyllanthus|limnobium|salvinia|spirodela/.test(name)) return 'Floating plants'
  if (/moss|taxiphyllum|vesicularia|riccardia|riccia|fissidens|monosolenium|callicostella|climacium|solenostoma/.test(name)) return 'Mosses & liverworts'
  if (/eleocharis|lilaeopsis|vallisneria|cyperus|juncus|sagittaria|utricularia graminifolia/.test(name)) return 'Grass-like plants'
  if (/micranthemum (?:tweediei|callitrichoides)|glossostigma|marsilea|hydrocotyle tripartita|staurogyne repens|littorella|helanthium tenellum/.test(name)) return 'Carpeting plants'
  if (/anubias|bucephalandra|microsorum|bolbitis/.test(name)) return 'Rhizome & epiphytes'
  if (/cryptocoryne|echinodorus|aponogeton|nymphaea|crinum|blyxa|eriocaulon|lagenandra|helanthium|pogostemon helferi|schismatoglottis|gratiola|ceratopteris/.test(name)) return 'Rosettes & swords'
  return 'Stem plants'
}

const genericHeight = {
  'Carpeting plants': 5, 'Grass-like plants': 16, 'Stem plants': 30,
  'Rosettes & swords': 22, 'Rhizome & epiphytes': 17,
  'Mosses & liverworts': 7, 'Algae balls': 5, 'Floating plants': 9,
}

export function modelHeightCm(name, type = plantTypeFor({ name })) {
  const lower = name.toLowerCase()
  if (/cladophora/.test(lower)) return 5
  if (/monte carlo|callitrichoides|glossostigma|marsilea|lilaeopsis|utricularia graminifolia|helanthium tenellum/.test(lower)) return 5
  if (/eleocharis.*(?:mini|pusilla|parvula)/.test(lower)) return 7
  if (/eleocharis vivipara|vallisneria|aponogeton|crinum|echinodorus palaefolius/.test(lower)) return 45
  if (/cyperus helferi|nymphaea lotus/.test(lower)) return 35
  if (/echinodorus|bolbitis|microsorum/.test(lower)) return /mini|petite|reni|green gnome/.test(lower) ? 15 : 32
  if (/cryptocoryne parva|anubias.*(?:petite|bonsai|mini|pangolino)|bucephalandra.*mini|pogostemon helferi|eriocaulon/.test(lower)) return 8
  if (/anubias.*nana|bucephalandra/.test(lower)) return 11
  if (/cryptocoryne spiralis|cryptocoryne crispatula/.test(lower)) return 35
  if (/\bmini\b|\bcompact\b|\bkompakt\b/.test(lower)) return 12
  if (/staurogyne repens|hydrocotyle verticillata/.test(lower)) return 10
  if (/rotala|ludwigia|limnophila|hygrophila|bacopa|pogostemon stellatus/.test(lower)) return 35
  return genericHeight[type] || 20
}

const representativeScore = product =>
  - (/in[- ]vitro/i.test(product.name) ? 4 : 0)
  - (/pad|pot in single package|mini pot/i.test(product.name) ? 2 : 0)
  - (/on (?:mangrove )?wood|on lava stone/i.test(product.name) ? 1 : 0)
  + (/foreground|midground|background|moss|floating/i.test(product.category) ? 1 : 0)

const bySpecies = new Map()
for (const product of products) {
  if (excluded.test(product.name) || !product.photo || !product.url) continue
  const name = cleanName(product.name)
  if (!name || /^(?:moss|plant|root)$/i.test(name)) continue
  const key = plantKey(name)
  const old = bySpecies.get(key)
  if (!old || representativeScore(product) > representativeScore(old.product)) bySpecies.set(key, { name, product })
}

const idFor = name => {
  if (/^Anubias barteri var\. nana Kirin$/i.test(name)) return 'anubias'
  if (/^Rotala rotundifolia$/i.test(name)) return 'fern'
  if (/^Micranthemum tweediei Monte Carlo$/i.test(name)) return 'grass'
  return `ga-${plantKey(name).replaceAll(' ', '-')}`
}

export const aquariumPlantListings = [...bySpecies.values()].map(({ name, product }) => {
  const type = plantTypeFor({ name })
  const heightCm = modelHeightCm(name, type)
  const photograph = plantPhotos[idFor(name)]
  const position = type === 'Floating plants' ? 'surface' : /foreground|midground|background/i.exec(product.category)?.[0]?.toLowerCase()
    || (type === 'Carpeting plants' || type === 'Algae balls' ? 'foreground' : type === 'Stem plants' ? 'background' : 'midground')
  return {
    id: idFor(name), name, scientific: name, plantType: type, position,
    description: `${type} · ${position}. An illustrated ${heightCm} cm mature-height estimate; confirm this cultivar's care and final size before planting.`,
    price: { anubias: 5, fern: 7, grass: 6 }[idFor(name)] ?? Math.max(3, Math.min(25, Math.round(Number(product.price) || 6))),
    art: plantModelUri(name, type), artAspectRatio: 1,
    heightCm, heightIsEstimate: true, photo: photograph?.path || '',
    photoCredit: photograph?.credit, photoSource: photograph?.source || product.url,
    photoFit: 'contain',
    supplierSource: product.url,
    tag: type, color: plantPalette(name)[2],
  }
}).sort((a, b) => PLANT_TYPES.indexOf(a.plantType) - PLANT_TYPES.indexOf(b.plantType) || a.name.localeCompare(b.name))

const plantingAdvice = {
  'Carpeting plants': 'Divide into small portions and space them across the foreground. Let runners or creeping stems knit together; trim before the carpet shades its lower growth.',
  'Grass-like plants': 'Plant small clumps with room for runners or new blades. Keep the crown above the substrate and trim tired foliage without pulling up established roots.',
  'Stem plants': 'Separate and plant stems with room for light to reach lower leaves. Prune the tops and replant healthy cuttings to build a fuller group.',
  'Rosettes & swords': 'Set the roots in substrate while leaving the crown exposed. Remove damaged outer leaves and allow space for the mature rosette.',
  'Rhizome & epiphytes': 'Attach to rock or wood without burying the rhizome. Slow-growing leaves benefit from stable conditions and gentle pruning.',
  'Mosses & liverworts': 'Attach a thin layer to wood or stone and trim regularly so the lower growth still receives light and flow.',
  'Algae balls': 'Keep the ball in a cool, clean spot and rotate it occasionally to maintain a rounded form. This is a spherical alga, not a rooted vascular plant.',
  'Floating plants': 'Keep at the water surface with room for light and air exchange. Thin excess growth so plants below are not completely shaded.',
}

export const plantProfiles = Object.fromEntries(aquariumPlantListings.map(plant => [plant.id, {
  headline: `${plant.plantType} for the ${plant.position}, with a distinctive ${plant.name.split(' ')[0]} form.`,
  sourceUrl: plant.supplierSource,
  facts: [
    ['Plant group', plant.plantType],
    ['Aquascape position', plant.position],
    ['Model height', `About ${plant.heightCm} cm (illustration estimate)`],
    ['Photograph', plant.photoCredit ? `${plant.photoCredit} · species/cultivar reference` : 'Awaiting a verified cultivar photograph'],
    ['Care details', 'Check the linked cultivar listing'],
  ],
  sections: [
    ['Meet this plant', `${plant.name} is listed by Green Aqua among its aquarium plants. Learn and Fish store show a real reference photograph with its source credit. Its separate tank model follows the ${plant.plantType.toLowerCase()} growth form, with its own leaf shape and arrangement.`],
    ['Where it belongs', `This listing is shown in the ${plant.position} of an aquascape. The tank illustration uses an approximate mature height of ${plant.heightCm} cm against the aquarium's stated height, so it is a scale guide rather than a guarantee of final growth.`],
    ['Planting & care', `${plantingAdvice[plant.plantType]} Balance light and nutrients, and confirm cultivar-specific light, CO₂ and final-size guidance on the linked listing.`],
  ],
}]))

export const plantCatalogStats = { sourceProducts: products.length, aquariumListings: products.filter(product => !excluded.test(product.name)).length, distinctPlants: aquariumPlantListings.length }
