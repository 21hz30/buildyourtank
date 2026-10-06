import { greenAquaSpecies } from './greenAquaSpecies.js'
import { fishModel, fishModelAspectRatio } from './fishModels.js'

export const FISH_TYPES = [
  'Tetras', 'Rasboras', 'Betta fish', 'Danios & minnows', 'Barbs',
  'Guppies & livebearers', 'Cichlids', 'Gouramis', 'Catfish & plecos',
  'Loaches', 'Rainbowfish', 'Gobies', 'Killifish & ricefish',
  'Algae eaters', 'Puffers', 'Other fish',
]

const genusGroups = {
  Tetras: 'Phenacogrammus Paracheirodon Petitella Hemigrammus Hyphessobrycon Inpaichthys Nematobrycon Axelrodia Brycinus Arnoldichthys Thayeria Nannostomus',
  Rasboras: 'Trigonostigma Boraras Microdevario Sundadanio Celestichthys',
  'Betta fish': 'Betta',
  'Danios & minnows': 'Danio Brachydanio Tanichthys Notropis',
  Barbs: 'Puntius Puntigrus Desmopuntius Sahyadria',
  'Guppies & livebearers': 'Poecilia Xiphophorus Dermogenys',
  Cichlids: 'Pelvicachromis Pterophyllum Mikrogeophagus Apistogramma Labidochromis Pseudotropheus Maylandia Symphysodon',
  Gouramis: 'Trichogaster Trichopodus Trichopsis Sphaerichthys Macropodus',
  'Catfish & plecos': 'Macrotocinclus Ancistrus Corydoras Hypancistrus Pseudacanthicus Kryptopterus Loricaria Rineloricaria',
  Loaches: 'Pangio Beaufortia Ambastaia Botia Chromobotia Yaoshania',
  Rainbowfish: 'Melanotaenia Glossolepis Pseudomugil Iriatherina',
  Gobies: 'Stiphodon Brachygobius',
  'Killifish & ricefish': 'Epiplatys Poropanchax Oryzias',
  'Algae eaters': 'Crossocheilus',
  Puffers: 'Carinotetraodon Dichotomyctere',
}

export function fishTypeFor(fish) {
  const genus = fish.scientific?.split(' ')[0]
  return FISH_TYPES.find(type => genusGroups[type]?.split(' ').includes(genus)) || 'Other fish'
}

export function fishSpeciesKey(fish) {
  const scientific = fish.scientific || ''
  const match = scientific.match(/^([A-Za-z]+)\s+(sp\.?\s+L\d+|[a-z-]+)/i)
  return match ? `${match[1]} ${match[2]}`.toLowerCase().replace(/\s+/g, ' ') : scientific.toLowerCase()
}

export function uniqueStoreFish(fish) {
  const candidates = fish.filter(item => !['diamond-head-neon-tetra', 'gold-neon-tetra'].includes(item.id))
  return candidates.filter((item, index) => candidates.findIndex(other => fishSpeciesKey(other) === fishSpeciesKey(item)) === index)
}

function groupDescription(fish) {
  const group = fish.groupSize ? ` Green Aqua suggests a group of ${fish.groupSize}` : ''
  return `${fish.name} is listed at up to ${fish.adultLengthCm} cm, with a minimum aquarium of ${fish.minTankLitres} L${group}`
}

export const additionalFish = greenAquaSpecies.map(fish => {
  const typeGroup = fishTypeFor(fish)
  return {
    ...fish,
    description: fish.id === 'axelrodia-riesei'
      ? 'A tiny ruby-red tetra from Colombia Keep at least 6–8 together in a calm, planted 54 L+ aquarium with subdued light, soft acidic water and suitably tiny foods'
      : groupDescription(fish),
    price: fish.price,
    load: Math.max(1, Math.ceil(fish.adultLengthCm / 4)),
    art: fishModel(fish),
    artLengthRatio: 1,
    artAspectRatio: fishModelAspectRatio(fish),
    tag: typeGroup,
    color: '#9bc4bf',
    photoCredit: fish.photoCredit || 'Green Aqua',
    photoSource: fish.photoSource || fish.sourceUrl,
    photoLicense: fish.photoLicense,
    photoLicenseUrl: fish.photoLicenseUrl,
    photoFit: fish.id === 'axelrodia-riesei' ? 'contain' : undefined,
  }
})

export const additionalFishDetails = Object.fromEntries(additionalFish.map(fish => [fish.id, {
  temperament: fish.groupSize ? `Listed group: ${fish.groupSize}` : 'Check species care',
  diet: 'Check the linked species care page',
  space: `${fish.minTankLitres} L+ · ${fish.adultLengthCm} cm adult`,
  waste: fish.adultLengthCm > 12 ? 'Higher' : 'Varies',
}]))

export const additionalFishProfiles = Object.fromEntries(additionalFish.map(fish => [fish.id, {
  headline: `${fish.name}: ${fish.adultLengthCm} cm adult size and ${fish.minTankLitres} L minimum aquarium listed by Green Aqua`,
  sourceUrl: fish.sourceUrl,
  facts: [
    ['Scientific name', fish.scientific],
    ['Fish type', fishTypeFor(fish)],
    ['Origin', fish.origin],
    ['Adult length', `${fish.adultLengthCm} cm`],
    ['Minimum aquarium', `${fish.minTankLitres} L`],
    ['Recommended group', fish.groupSize],
    ['Temperature', fish.temperature && `${fish.temperature} °C`],
    ['pH', fish.ph],
    ['Water hardness', fish.hardness && `${fish.hardness} dGH`],
  ].filter(([, value]) => value),
  sections: [
    ['Meet this fish', `${fish.name} (${fish.scientific}) is a freshwater fish in the ${fishTypeFor(fish).toLowerCase()} group from ${fish.origin || 'the region listed by Green Aqua'} Its Green Aqua listing gives an adult size of up to ${fish.adultLengthCm} cm`],
    ['Plan its aquarium', `Green Aqua lists a minimum tank size of ${fish.minTankLitres} litres${fish.groupSize ? ` and a recommended group of ${fish.groupSize}` : ''} Check the linked species page for behavior, diet and compatibility before adding it to a real aquarium`],
  ],
}]))

additionalFishDetails['axelrodia-riesei'] = {
  temperament: 'Peaceful · group of at least 6–8',
  diet: 'Omnivore · micro granules and other tiny foods',
  space: '54 L+ · 1.5–2 cm adult',
  waste: 'Low',
}

additionalFishProfiles['axelrodia-riesei'] = {
  headline: 'A tiny ruby-red tetra from Colombia’s upper Río Meta blackwater streams',
  sourceUrl: 'https://greenaqua.hu/en/hal-lazac-axelrodia-riesei-ruby-tetra.html',
  facts: [
    ['Scientific name', 'Axelrodia riesei'],
    ['Native habitat', 'Upper Río Meta blackwater streams, Colombia'],
    ['Adult length', '1.5–2 cm'],
    ['Minimum aquarium', '54 L'],
    ['Recommended group', 'At least 6–8'],
    ['Temperature', '20–28 °C'],
    ['pH', '4.0–6.5'],
    ['Water hardness', '3–8 dKH (Green Aqua)'],
    ['Diet', 'Omnivore · finely sized foods'],
    ['Expected lifespan', '3–4 years'],
  ],
  sections: [
    ['Meet the Ruby tetra', 'Axelrodia riesei is a very small, vividly red freshwater tetra from Colombia Adults reach about 1.5–2 cm Its natural habitat includes quiet, tannin-stained blackwater tributaries in the upper Río Meta system'],
    ['Keep a comfortable group', 'Ruby tetras are peaceful fish that live in loose groups Green Aqua recommends at least 6–8 together; a larger group can move with more confidence when the aquarium has room Choose similarly small, calm companions'],
    ['Set up the aquarium', 'Plan for at least 54 litres Dark substrate, roots, leaf litter and many plants offer cover, while subdued lighting resembles their blackwater habitat Keep the water soft and acidic, and avoid abrupt changes'],
    ['Feed tiny foods', 'Because their mouths are very small, use appropriately fine micro granules or tiny flakes Small frozen or live foods such as Cyclops, Daphnia and Artemia nauplii can add variety'],
  ],
}
