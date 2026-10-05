// Green Aqua's fish listings, including varieties and temporarily out-of-stock products.
// The existing Congo tetra is kept in tank.js so saved tanks retain its original id.
// The two variety product photos credited to Green Aqua need reuse permission before public deployment.
const source = slug => `https://greenaqua.hu/en/${slug}.html`
const commons = file => `https://commons.wikimedia.org/wiki/File:${file.replaceAll(' ', '_')}`
const bySa3 = 'https://creativecommons.org/licenses/by-sa/3.0/'
const bySa4 = 'https://creativecommons.org/licenses/by-sa/4.0/'
const bySa25 = 'https://creativecommons.org/licenses/by-sa/2.5/'
const by3 = 'https://creativecommons.org/licenses/by/3.0/'
const publicDomain = 'https://creativecommons.org/publicdomain/mark/1.0/'

function tetraArt(body, accent, marking = 'stripe') {
  const marks = {
    stripe: `<path d="M64 76c40-12 104-11 148 1" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity=".9"/>`,
    neon: `<path d="M65 70c38-14 105-13 147 2" fill="none" stroke="#69d5e1" stroke-width="9" stroke-linecap="round"/><path d="M83 88c35 7 81 6 116-3" fill="none" stroke="${accent}" stroke-width="15" stroke-linecap="round" opacity=".9"/>`,
    black: `<path d="M65 70c38-13 104-12 147 3" fill="none" stroke="#ece9c5" stroke-width="9" stroke-linecap="round"/><path d="M67 79c41-11 105-10 145 1" fill="none" stroke="#30363a" stroke-width="11" stroke-linecap="round"/>`,
    nose: `<path d="M64 76c41-9 100-9 143 1" fill="none" stroke="#c5cebc" stroke-width="5" opacity=".7"/><path d="M195 57c16 4 29 11 43 20-11 15-27 23-43 27 8-15 9-31 0-47Z" fill="${accent}" opacity=".95"/>`,
    phantom: `<path d="M110 56c7-7 20-10 30-6 8 4 11 16 4 22-7 7-21 5-29-1-6-4-8-10-5-15Z" fill="#433e46" opacity=".8"/><path d="M86 53c17-20 36-33 62-37l-8 37Z" fill="${accent}" opacity=".68"/>`,
    flame: `<path d="M129 49c30 0 66 7 99 25-14 16-39 27-68 32l-20-9c14-19 9-34-11-48Z" fill="${accent}" opacity=".85"/>`,
    emperor: `<path d="M67 76c42-11 103-10 146 0" fill="none" stroke="#354960" stroke-width="11" stroke-linecap="round"/><path d="M69 69c39-12 100-11 143-2" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity=".85"/>`,
  }
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 150"><defs><linearGradient id="body" x1="65" y1="44" x2="181" y2="110" gradientUnits="userSpaceOnUse"><stop stop-color="#f7f3dc"/><stop offset=".38" stop-color="${body}"/><stop offset="1" stop-color="${accent}" stop-opacity=".8"/></linearGradient></defs><path d="M65 75C47 56 27 47 11 44c9 17 10 28 6 38-3 10-4 19-8 29 19-6 38-17 56-30Z" fill="${body}" fill-opacity=".62" stroke="${accent}" stroke-opacity=".55" stroke-width="1.4"/><path d="M88 55C108 30 132 23 156 21l-9 35Z" fill="${accent}" fill-opacity=".55"/><path d="M92 100c18 7 37 17 57 31l-4-29Z" fill="${accent}" fill-opacity=".48"/><path d="M57 76c24-25 66-35 110-30 32 3 57 17 78 32-22 22-50 34-91 34-45 0-80-14-97-36Z" fill="url(#body)" stroke="${accent}" stroke-opacity=".7" stroke-width="2"/>${marks[marking] || marks.stripe}<path d="M76 55c37-11 73-9 112 3M77 94c40 12 78 12 113 2" fill="none" stroke="#fff" stroke-opacity=".27" stroke-width="2"/><path d="M187 51c-8 13-9 31-2 45" fill="none" stroke="${accent}" stroke-opacity=".7" stroke-width="1.6"/><circle cx="217" cy="65" r="6" fill="#e3a373"/><circle cx="217" cy="65" r="3.5" fill="#283e46"/><circle cx="218" cy="64" r="1.2" fill="#fff"/><path d="M233 82l10 1" stroke="#6a7773" stroke-width="1.4" stroke-linecap="round"/></svg>`)}`
}

const data = [
  { id: 'cardinal-tetra', name: 'Cardinal tetra', scientific: 'Paracheirodon axelrodi', slug: 'paracheirodon-axelrodi', length: 4.5, litres: 100, group: '10–12', temperature: '23–28', ph: '4.0–6.0', hardness: '6–12', lifespan: 'About 5 years', native: 'Rio Negro and Orinoco basins, South America', look: 'A vivid blue line above a red stripe that runs almost the full body length.', habitat: 'Soft, acidic water, subdued light, planting at the edges and open midwater swimming room.', price: 4, body: '#83b6ba', accent: '#db5962', marking: 'neon', photoFile: 'Cardinal Tetra 2.jpg', credit: 'Ltshears', license: 'CC BY-SA 3.0', licenseUrl: bySa3 },
  { id: 'green-neon-tetra', name: 'Green neon tetra', scientific: 'Paracheirodon simulans', slug: 'paracheirodon-simulans', length: 3, litres: 50, group: '10–12', temperature: '22–28', ph: '6.4–7.2', hardness: '0–18', lifespan: 'About 5 years', native: 'Rio Negro and Orinoco waters, South America', look: 'A slim little neon with a long blue-green stripe and restrained red coloration.', habitat: 'A planted, gently lit aquarium with a calm school of small companions.', price: 3, body: '#7caeb6', accent: '#6dd0c8', marking: 'neon', photoFile: 'Paracheirodon simulans.jpg', credit: 'Sascha Biedermann', license: 'CC BY-SA 2.5', licenseUrl: bySa25 },
  { id: 'rummy-nose-tetra', name: 'Rummy-nose tetra', scientific: 'Petitella bleheri (formerly Hemigrammus bleheri)', slug: 'hemigrammus-bleheri', length: 4, litres: 100, group: '12 or more', temperature: '23–25', ph: '5.0–6.4', hardness: '6–12', lifespan: '3–6 years', native: 'Amazon basin, South America', look: 'A bright red face and a boldly striped black-and-white tail.', habitat: 'A long, planted aquarium with clean, stable water and plenty of schooling room.', price: 4, body: '#c7c4b5', accent: '#de6562', marking: 'nose', photoFile: 'Petitella bleheri (Hemigrammus bleheri).jpg', credit: 'Soulkeeper', license: 'CC BY-SA 3.0', licenseUrl: bySa3 },
  { id: 'ember-tetra', name: 'Ember tetra', scientific: 'Hyphessobrycon amandae', slug: 'ember-tetra-hyphessobrycon-amandae', length: 2.5, litres: 40, group: '6 or more', temperature: '24–28', ph: '6.0–7.0', hardness: '1–10', lifespan: '4–5 years', native: 'Araguaia River basin, Brazil', look: 'Tiny translucent orange-red fish that glow against dark greenery.', habitat: 'A quiet planted nano aquarium with shaded cover and very small foods.', price: 3, body: '#e9a36b', accent: '#db6845', marking: 'flame', photoFile: 'Hyphessobrycon amandae.jpg', credit: 'Mbdtsmo', license: 'CC BY-SA 4.0', licenseUrl: bySa4 },
  { id: 'red-phantom-tetra', name: 'Red phantom tetra', scientific: 'Hyphessobrycon sweglesi', slug: 'fish-hyphessobrycon-sweglesi-red-phantom-tetra', length: 5, litres: 60, group: '8–10', temperature: '20–28', ph: '5.5–7.5', hardness: '1–12', lifespan: '3–5 years', native: 'Orinoco basin, South America', look: 'A rosy-red body, dark shoulder patch and high, dark-edged dorsal fin.', habitat: 'Plants around the margins, open midwater and peaceful tankmates.', price: 4, body: '#d7948b', accent: '#b85057', marking: 'phantom', photoFile: 'Megalamphodussweglesi01.jpg', credit: 'Tsunamicarlos', license: 'Public domain', licenseUrl: publicDomain },
  { id: 'rosy-tetra', name: 'Rosy tetra', scientific: 'Hyphessobrycon rosaceus', slug: 'fish-hyphessobrycon-rosaceus-rosy-tetra', length: 5, litres: 60, group: '6–8 or more', temperature: '22–26', ph: '5.5–7.5', hardness: '1–12', lifespan: '3–5 years', native: 'Guiana Shield waters, South America', look: 'Soft pink body with red fins and contrasting dark-and-white fin accents.', habitat: 'A planted community with gentle water movement and quiet companions.', price: 3, body: '#e9b6ad', accent: '#ca6469', marking: 'phantom', photoFile: 'Male Rosy Tetra.JPG', credit: 'Aquakeeper14', license: 'CC BY-SA 3.0', licenseUrl: bySa3 },
  { id: 'diamond-head-neon-tetra', name: 'Diamond-head neon tetra', scientific: 'Paracheirodon innesi var. diamond head', slug: 'fisch-paracheirodon-innesi-var-diamond-head', length: 4, litres: 70, group: '10–14', temperature: '20–24', ph: '6.5–7.2', hardness: '10–15', lifespan: '5–8 years', native: 'Captive-bred form of the South American neon tetra', look: 'A neon tetra variety distinguished by sparkling scales on the head.', habitat: 'Dark substrate, roots, plants and open schooling space.', price: 5, body: '#9dbcc2', accent: '#c66068', marking: 'neon', photoCredit: 'Green Aqua', photoSource: source('fisch-paracheirodon-innesi-var-diamond-head') },
  { id: 'neon-tetra', name: 'Neon tetra', scientific: 'Paracheirodon innesi', slug: 'fish-paracheirodon-innesii', length: 4, litres: 70, group: '10–14', temperature: '20–24', ph: '5.0–7.0', hardness: '10–15', lifespan: '5–8 years', native: 'Upper Amazon basin, South America', look: 'Electric blue stripe with red coloring on the rear half of the body.', habitat: 'Shaded plants and roots around open water for the school.', price: 3, body: '#8cb7b8', accent: '#d96369', marking: 'neon', photoFile: 'Neonsalmler Paracheirodon innesi.jpg', credit: 'Holger Krisp', license: 'CC BY 3.0', licenseUrl: by3 },
  { id: 'black-neon-tetra', name: 'Black neon tetra', scientific: 'Hyphessobrycon herbertaxelrodi', slug: 'hal-neon-fekete-neonhal', length: 4, litres: 60, group: '8–12', temperature: '22–26', ph: '4.0–7.0', hardness: '0–15', lifespan: '3–6 years', native: 'South American streams', look: 'A bright pale line above a deep charcoal lateral stripe.', habitat: 'A 60–80 L or larger planted aquarium with midwater swimming room.', price: 3, body: '#b6b5a7', accent: '#4d5559', marking: 'black', photoFile: 'Black neon tetra.jpg', credit: 'Debivort', license: 'CC BY-SA 3.0', licenseUrl: bySa3 },
  { id: 'blue-emperor-tetra', name: 'Blue emperor tetra', scientific: 'Inpaichthys kerri', slug: 'hal-lazac-kek-kiralylazac-inpaichthys-kerri', length: 4, litres: 80, group: '6–8', temperature: '24–27', ph: '6.0–8.0', hardness: '4–18', lifespan: 'About 5 years', native: 'Rio Aripuanã, Brazil', look: 'A slender violet-blue schooler with a strong dark side stripe.', habitat: 'Dark substrate, dense planting and floating shade with some open water.', price: 4, body: '#9ab5c4', accent: '#7776af', marking: 'emperor', photoFile: '01.Inpaichtys kerri.jpg', credit: 'Juan R. Lascorz', license: 'CC BY-SA 3.0', licenseUrl: bySa3 },
  { id: 'gold-neon-tetra', name: 'Gold neon tetra', scientific: 'Paracheirodon innesi, gold variety', slug: 'fish-paracheirodon-inessi-gold-tetra', length: 4, litres: 50, group: '8–10', temperature: '21–26', ph: '5.0–7.5', hardness: '1–10', lifespan: '3–5 years', native: 'Captive-bred form of the South American neon tetra', look: 'A selectively bred golden body with a vivid blue stripe.', habitat: 'A planted aquarium with a dark substrate and stable, gentle water changes.', price: 5, body: '#edd49a', accent: '#6bc4d4', marking: 'neon', photoCredit: 'Green Aqua', photoSource: source('fish-paracheirodon-inessi-gold-tetra') },
  { id: 'flame-tetra', name: 'Flame tetra', scientific: 'Hyphessobrycon flammeus', slug: 'hal-lazac-langvoros-pontylazac-hyphessobrycon-flammeus', length: 4, litres: 60, group: '8–12', temperature: '22–26', ph: '6.0–7.5', hardness: 'Soft to moderate', lifespan: '3–6 years', native: 'Southeastern Brazil', look: 'A silver front half that deepens to vivid flame red toward the tail.', habitat: 'A planted 60–80 L or larger aquarium with open midwater.', price: 3, body: '#e7b2a0', accent: '#cf5c46', marking: 'flame', photoFile: 'Hyphessobrycon flammeus 3.jpg', credit: 'Mosasaurus', license: 'Public domain', licenseUrl: publicDomain },
  { id: 'golden-tetra', name: 'Golden tetra', scientific: 'Hemigrammus rodwayi', slug: 'hal-neon-gyemant-neonhal-hemigrammus-rodwayi', length: 4.5, litres: 70, group: '6–8', temperature: '24–28', ph: '6.0–7.0', hardness: '1–13', lifespan: 'About 5 years', native: 'Northern South America', look: 'Small, shimmering golden scales with a dark-edged tail marking.', habitat: 'Rich planting, leafy shade and room for a peaceful group.', price: 5, body: '#d7c7a1', accent: '#b39d68', marking: 'stripe', photoFile: 'Hemigrammus rodwayi by DaijuAzuma.JPG', credit: 'Daiju Azuma', license: 'CC BY-SA 4.0', licenseUrl: bySa4 },
  { id: 'emperor-tetra', name: 'Emperor tetra', scientific: 'Nematobrycon palmeri', slug: 'nematobrycon-palmeri-emperor-tetra', length: 7, litres: 100, group: '8–10', temperature: '24–26', ph: '6.7–7.0', hardness: '6–19', lifespan: '4–6 years', native: 'Western Colombia', look: 'A long dark stripe beneath iridescent blue-purple tones and elegant fins.', habitat: 'A spacious planted aquarium with shelter and open midwater.', price: 5, body: '#b7aeac', accent: '#8381b2', marking: 'emperor', photoFile: 'Emperor tetra.jpg', credit: 'Citron', license: 'CC BY-SA 3.0', licenseUrl: bySa3 },
  { id: 'serpae-tetra', name: 'Serpae tetra', scientific: 'Hyphessobrycon eques', slug: 'hal-lazac-serpalazac-hyphessobrycon-eques', length: 4.5, litres: 70, group: '6 or more', temperature: '24–28', ph: '5.5–7.5', hardness: '3–12', lifespan: 'About 5 years', native: 'Paraguay and Peru, South America', look: 'A deep red-orange body with a dark shoulder mark and black-edged fins.', habitat: 'Plants along the back and sides, with open swimming space; watch for fin-nipping.', price: 4, body: '#d8977c', accent: '#bf5549', marking: 'phantom', photoFile: 'Hyphessobrycon eques.jpg', credit: 'Dubrovsky Alexander', license: 'Public domain', licenseUrl: publicDomain },
]

export const tetraListings = data.map(fish => {
  const { slug, length, litres, group, temperature, ph, hardness, lifespan, native, look, habitat, body, accent, marking, photoFile, credit, license, licenseUrl, photoCredit, photoSource, ...catalog } = fish
  return {
    ...catalog,
    description: `${look} Keep ${group} together in an aquarium of at least ${litres} L.`,
    adultLengthCm: length, load: 1, tag: 'Schooling', color: body,
    art: tetraArt(body, accent, marking),
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
    [`Meet the ${fish.name}`, `${fish.look} Green Aqua lists ${fish.name.toLowerCase()} as ${fish.scientific}. Origin: ${fish.native}.`],
    ['Keep a proper group', `This is a social tetra, not a single-fish centerpiece. Keep ${fish.group} together and allow at least ${fish.litres} litres for the group, with more room when adding other species.`],
    ['Build its habitat', `${fish.habitat} Aim for ${fish.temperature} °C and pH ${fish.ph}; check that all tankmates can live comfortably in the same conditions. Stable, cycled water matters more than chasing a number suddenly.`],
    ['Food and companions', `Offer appropriately small, varied omnivorous foods and watch the whole school eat. Choose fish of similar size and temperament; avoid aggressive predators${fish.id === 'serpae-tetra' ? ' and long-finned companions because serpae tetras may nip fins' : ''}.`],
  ],
}]))
