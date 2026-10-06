// Green Aqua's fish listings, including varieties and temporarily out-of-stock products.
// The existing Congo tetra is kept in tank.js so saved tanks retain its original id.
// The two variety product photos credited to Green Aqua need reuse permission before public deployment.
import { fishModel, fishModelAspectRatio } from './fishModels.js'
const source = slug => `https://greenaqua.hu/en/${slug}.html`
const commons = file => `https://commons.wikimedia.org/wiki/File:${file.replaceAll(' ', '_')}`
const bySa3 = 'https://creativecommons.org/licenses/by-sa/3.0/'
const bySa4 = 'https://creativecommons.org/licenses/by-sa/4.0/'
const bySa25 = 'https://creativecommons.org/licenses/by-sa/2.5/'
const by3 = 'https://creativecommons.org/licenses/by/3.0/'
const publicDomain = 'https://creativecommons.org/publicdomain/mark/1.0/'

const data = [
  { id: 'cardinal-tetra', name: 'Cardinal tetra', scientific: 'Paracheirodon axelrodi', slug: 'paracheirodon-axelrodi', length: 4.5, litres: 100, group: '10–12', temperature: '23–28', ph: '4.0–6.0', hardness: '6–12', lifespan: 'About 5 years', native: 'Rio Negro and Orinoco basins, South America', look: 'A vivid blue line above a red stripe that runs almost the full body length', habitat: 'Soft, acidic water, subdued light, planting at the edges and open midwater swimming room', price: 4, body: '#83b6ba', accent: '#db5962', marking: 'neon', photoFile: 'Cardinal Tetra 2.jpg', credit: 'Ltshears', license: 'CC BY-SA 3.0', licenseUrl: bySa3 },
  { id: 'green-neon-tetra', name: 'Green neon tetra', scientific: 'Paracheirodon simulans', slug: 'paracheirodon-simulans', length: 3, litres: 50, group: '10–12', temperature: '22–28', ph: '6.4–7.2', hardness: '0–18', lifespan: 'About 5 years', native: 'Rio Negro and Orinoco waters, South America', look: 'A slim little neon with a long blue-green stripe and restrained red coloration', habitat: 'A planted, gently lit aquarium with a calm school of small companions', price: 3, body: '#7caeb6', accent: '#6dd0c8', marking: 'neon', photoFile: 'Paracheirodon simulans.jpg', credit: 'Sascha Biedermann', license: 'CC BY-SA 2.5', licenseUrl: bySa25 },
  { id: 'rummy-nose-tetra', name: 'Rummy-nose tetra', scientific: 'Petitella bleheri (formerly Hemigrammus bleheri)', slug: 'hemigrammus-bleheri', length: 4, litres: 100, group: '12 or more', temperature: '23–25', ph: '5.0–6.4', hardness: '6–12', lifespan: '3–6 years', native: 'Amazon basin, South America', look: 'A bright red face and a boldly striped black-and-white tail', habitat: 'A long, planted aquarium with clean, stable water and plenty of schooling room', price: 4, body: '#c7c4b5', accent: '#de6562', marking: 'nose', photoFile: 'Petitella bleheri (Hemigrammus bleheri).jpg', credit: 'Soulkeeper', license: 'CC BY-SA 3.0', licenseUrl: bySa3 },
  { id: 'ember-tetra', name: 'Ember tetra', scientific: 'Hyphessobrycon amandae', slug: 'ember-tetra-hyphessobrycon-amandae', length: 2.5, litres: 40, group: '6 or more', temperature: '24–28', ph: '6.0–7.0', hardness: '1–10', lifespan: '4–5 years', native: 'Araguaia River basin, Brazil', look: 'Tiny translucent orange-red fish that glow against dark greenery', habitat: 'A quiet planted nano aquarium with shaded cover and very small foods', price: 3, body: '#e9a36b', accent: '#db6845', marking: 'flame', photoFile: 'Hyphessobrycon amandae.jpg', credit: 'Mbdtsmo', license: 'CC BY-SA 4.0', licenseUrl: bySa4 },
  { id: 'red-phantom-tetra', name: 'Red phantom tetra', scientific: 'Hyphessobrycon sweglesi', slug: 'fish-hyphessobrycon-sweglesi-red-phantom-tetra', length: 5, litres: 60, group: '8–10', temperature: '20–28', ph: '5.5–7.5', hardness: '1–12', lifespan: '3–5 years', native: 'Orinoco basin, South America', look: 'A rosy-red body, dark shoulder patch and high, dark-edged dorsal fin', habitat: 'Plants around the margins, open midwater and peaceful tankmates', price: 4, body: '#d7948b', accent: '#b85057', marking: 'phantom', photoFile: 'Megalamphodussweglesi01.jpg', credit: 'Tsunamicarlos', license: 'Public domain', licenseUrl: publicDomain },
  { id: 'rosy-tetra', name: 'Rosy tetra', scientific: 'Hyphessobrycon rosaceus', slug: 'fish-hyphessobrycon-rosaceus-rosy-tetra', length: 5, litres: 60, group: '6–8 or more', temperature: '22–26', ph: '5.5–7.5', hardness: '1–12', lifespan: '3–5 years', native: 'Guiana Shield waters, South America', look: 'Soft pink body with red fins and contrasting dark-and-white fin accents', habitat: 'A planted community with gentle water movement and quiet companions', price: 3, body: '#e9b6ad', accent: '#ca6469', marking: 'phantom', photoFile: 'Male Rosy Tetra.JPG', credit: 'Aquakeeper14', license: 'CC BY-SA 3.0', licenseUrl: bySa3 },
  { id: 'diamond-head-neon-tetra', name: 'Diamond-head neon tetra', scientific: 'Paracheirodon innesi var. diamond head', slug: 'fisch-paracheirodon-innesi-var-diamond-head', length: 4, litres: 70, group: '10–14', temperature: '20–24', ph: '6.5–7.2', hardness: '10–15', lifespan: '5–8 years', native: 'Captive-bred form of the South American neon tetra', look: 'A neon tetra variety distinguished by sparkling scales on the head', habitat: 'Dark substrate, roots, plants and open schooling space', price: 5, body: '#9dbcc2', accent: '#c66068', marking: 'neon', photoCredit: 'Green Aqua', photoSource: source('fisch-paracheirodon-innesi-var-diamond-head') },
  { id: 'neon-tetra', name: 'Neon tetra', scientific: 'Paracheirodon innesi', slug: 'fish-paracheirodon-innesii', length: 4, litres: 70, group: '10–14', temperature: '20–24', ph: '5.0–7.0', hardness: '10–15', lifespan: '5–8 years', native: 'Upper Amazon basin, South America', look: 'Electric blue stripe with red coloring on the rear half of the body', habitat: 'Shaded plants and roots around open water for the school', price: 3, body: '#8cb7b8', accent: '#d96369', marking: 'neon', photoFile: 'Neonsalmler Paracheirodon innesi.jpg', credit: 'Holger Krisp', license: 'CC BY 3.0', licenseUrl: by3 },
  { id: 'black-neon-tetra', name: 'Black neon tetra', scientific: 'Hyphessobrycon herbertaxelrodi', slug: 'hal-neon-fekete-neonhal', length: 4, litres: 60, group: '8–12', temperature: '22–26', ph: '4.0–7.0', hardness: '0–15', lifespan: '3–6 years', native: 'South American streams', look: 'A bright pale line above a deep charcoal lateral stripe', habitat: 'A 60–80 L or larger planted aquarium with midwater swimming room', price: 3, body: '#b6b5a7', accent: '#4d5559', marking: 'black', photoFile: 'Black neon tetra.jpg', credit: 'Debivort', license: 'CC BY-SA 3.0', licenseUrl: bySa3 },
  { id: 'blue-emperor-tetra', name: 'Blue emperor tetra', scientific: 'Inpaichthys kerri', slug: 'hal-lazac-kek-kiralylazac-inpaichthys-kerri', length: 4, litres: 80, group: '6–8', temperature: '24–27', ph: '6.0–8.0', hardness: '4–18', lifespan: 'About 5 years', native: 'Rio Aripuanã, Brazil', look: 'A slender violet-blue schooler with a strong dark side stripe', habitat: 'Dark substrate, dense planting and floating shade with some open water', price: 4, body: '#9ab5c4', accent: '#7776af', marking: 'emperor', photoFile: '01.Inpaichtys kerri.jpg', credit: 'Juan R. Lascorz', license: 'CC BY-SA 3.0', licenseUrl: bySa3 },
  { id: 'gold-neon-tetra', name: 'Gold neon tetra', scientific: 'Paracheirodon innesi, gold variety', slug: 'fish-paracheirodon-inessi-gold-tetra', length: 4, litres: 50, group: '8–10', temperature: '21–26', ph: '5.0–7.5', hardness: '1–10', lifespan: '3–5 years', native: 'Captive-bred form of the South American neon tetra', look: 'A selectively bred golden body with a vivid blue stripe', habitat: 'A planted aquarium with a dark substrate and stable, gentle water changes', price: 5, body: '#edd49a', accent: '#6bc4d4', marking: 'neon', photoCredit: 'Green Aqua', photoSource: source('fish-paracheirodon-inessi-gold-tetra') },
  { id: 'flame-tetra', name: 'Flame tetra', scientific: 'Hyphessobrycon flammeus', slug: 'hal-lazac-langvoros-pontylazac-hyphessobrycon-flammeus', length: 4, litres: 60, group: '8–12', temperature: '22–26', ph: '6.0–7.5', hardness: 'Soft to moderate', lifespan: '3–6 years', native: 'Southeastern Brazil', look: 'A silver front half that deepens to vivid flame red toward the tail', habitat: 'A planted 60–80 L or larger aquarium with open midwater', price: 3, body: '#e7b2a0', accent: '#cf5c46', marking: 'flame', photoFile: 'Hyphessobrycon flammeus 3.jpg', credit: 'Mosasaurus', license: 'Public domain', licenseUrl: publicDomain },
  { id: 'golden-tetra', name: 'Golden tetra', scientific: 'Hemigrammus rodwayi', slug: 'hal-neon-gyemant-neonhal-hemigrammus-rodwayi', length: 4.5, litres: 70, group: '6–8', temperature: '24–28', ph: '6.0–7.0', hardness: '1–13', lifespan: 'About 5 years', native: 'Northern South America', look: 'Small, shimmering golden scales with a dark-edged tail marking', habitat: 'Rich planting, leafy shade and room for a peaceful group', price: 5, body: '#d7c7a1', accent: '#b39d68', marking: 'stripe', photoFile: 'Hemigrammus rodwayi by DaijuAzuma.JPG', credit: 'Daiju Azuma', license: 'CC BY-SA 4.0', licenseUrl: bySa4 },
  { id: 'emperor-tetra', name: 'Emperor tetra', scientific: 'Nematobrycon palmeri', slug: 'nematobrycon-palmeri-emperor-tetra', length: 7, litres: 100, group: '8–10', temperature: '24–26', ph: '6.7–7.0', hardness: '6–19', lifespan: '4–6 years', native: 'Western Colombia', look: 'A long dark stripe beneath iridescent blue-purple tones and elegant fins', habitat: 'A spacious planted aquarium with shelter and open midwater', price: 5, body: '#b7aeac', accent: '#8381b2', marking: 'emperor', photoFile: 'Emperor tetra.jpg', credit: 'Citron', license: 'CC BY-SA 3.0', licenseUrl: bySa3 },
  { id: 'serpae-tetra', name: 'Serpae tetra', scientific: 'Hyphessobrycon eques', slug: 'hal-lazac-serpalazac-hyphessobrycon-eques', length: 4.5, litres: 70, group: '6 or more', temperature: '24–28', ph: '5.5–7.5', hardness: '3–12', lifespan: 'About 5 years', native: 'Paraguay and Peru, South America', look: 'A deep red-orange body with a dark shoulder mark and black-edged fins', habitat: 'Plants along the back and sides, with open swimming space; watch for fin-nipping', price: 4, body: '#d8977c', accent: '#bf5549', marking: 'phantom', photoFile: 'Hyphessobrycon eques.jpg', credit: 'Dubrovsky Alexander', license: 'Public domain', licenseUrl: publicDomain },
]

const tetraShapes = {
  'cardinal-tetra': 'slender', 'green-neon-tetra': 'slender', 'rummy-nose-tetra': 'torpedo',
  'ember-tetra': 'slender', 'red-phantom-tetra': 'deep', 'rosy-tetra': 'deep',
  'diamond-head-neon-tetra': 'slender', 'neon-tetra': 'slender', 'black-neon-tetra': 'slender',
  'blue-emperor-tetra': 'slender', 'gold-neon-tetra': 'slender', 'flame-tetra': 'tetra',
  'golden-tetra': 'tetra', 'emperor-tetra': 'tetra', 'serpae-tetra': 'deep',
}

export const tetraListings = data.map(fish => {
  const { slug, length, litres, group, temperature, ph, hardness, lifespan, native, look, habitat, body, accent, marking, photoFile, credit, license, licenseUrl, photoCredit, photoSource, ...catalog } = fish
  const model = { ...catalog, visual: [tetraShapes[fish.id], body, accent, marking] }
  return {
    ...catalog,
    description: `${look} Keep ${group} together in an aquarium of at least ${litres} L`,
    adultLengthCm: length, load: 1, tag: 'Schooling', color: body,
    visual: model.visual,
    art: fishModel(model),
    artLengthRatio: 1,
    artAspectRatio: fishModelAspectRatio(model),
    photo: `/art/${fish.id}-photo.jpg`,
    photoCredit: photoCredit || credit,
    photoSource: photoSource || commons(photoFile),
    ...(license ? { photoLicense: license, photoLicenseUrl: licenseUrl } : {}),
  }
})

export const tetraDetails = Object.fromEntries(data.map(fish => [fish.id, {
  temperament: `Schooling · ${fish.group}; peaceful${fish.id === 'serpae-tetra' ? ', may nip fins' : ''}`,
  diet: 'Omnivore · fine flakes, granules and small frozen/live foods',
  space: `${fish.litres} L+ · planted margins and swimming room`,
  waste: 'Low',
}]))

export const tetraProfiles = Object.fromEntries(data.map(fish => [fish.id, {
  headline: fish.look,
  sourceUrl: source(fish.slug),
  facts: [
    ['Native habitat', fish.native], ['Typical adult length', `Up to ${fish.length} cm`],
    ['Expected lifespan', fish.lifespan], ['Minimum aquarium', `${fish.litres} litres`],
    ['Recommended group', fish.group], ['Temperature', `${fish.temperature} °C`],
    ['pH', fish.ph], ['Water hardness', `${fish.hardness} ${fish.hardness.includes('Soft') ? '' : 'dGH'}`.trim()],
    ['Diet', 'Omnivore'], ['Swimming level', 'Mainly midwater'],
  ],
  sections: [
    [`Meet the ${fish.name}`, `${fish.look} Green Aqua lists ${fish.name.toLowerCase()} as ${fish.scientific} Origin: ${fish.native}`],
    ['Keep a proper group', `This is a social tetra, not a single-fish centerpiece Keep ${fish.group} together and allow at least ${fish.litres} litres for the group, with more room when adding other species`],
    ['Build its habitat', `${fish.habitat} Aim for ${fish.temperature} °C and pH ${fish.ph}; check that all tankmates can live comfortably in the same conditions Stable, cycled water matters more than chasing a number suddenly`],
    ['Food and companions', `Offer appropriately small, varied omnivorous foods and watch the whole school eat Choose fish of similar size and temperament; avoid aggressive predators${fish.id === 'serpae-tetra' ? ' and long-finned companions because serpae tetras may nip fins' : ''}`],
  ],
}]))
