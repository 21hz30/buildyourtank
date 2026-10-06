// Depth bands are visual preferences within the usable water column, not
// barriers. Species exceptions precede genus defaults, including trade aliases.
const profiles = {
  middle: { zone: 'Middle water', band: [.25, .72], speed: 1, mode: 'cruise' },
  upper: { zone: 'Upper and middle water', band: [.08, .48], speed: 1.1, mode: 'cruise' },
  active: { zone: 'Upper and middle water', band: [.1, .58], speed: 1.5, mode: 'cruise' },
  surface: { zone: 'Just below the surface', band: [0, .14], speed: .8, mode: 'cruise' },
  labyrinth: { zone: 'Upper and middle water; surface air visits', band: [.08, .55], speed: .65, mode: 'hover', air: true },
  lower: { zone: 'Lower and middle water', band: [.42, .87], speed: .8, mode: 'cruise' },
  territory: { zone: 'Lower water around cover', band: [.52, .96], speed: .7, mode: 'hover' },
  rockTerritory: { zone: 'Lower and middle water around rocks', band: [.35, .92], speed: 1.1, mode: 'hover' },
  bottom: { zone: 'Substrate foraging', band: [.87, 1], speed: .85, mode: 'forage' },
  cory: { zone: 'Substrate foraging; occasional surface air visits', band: [.87, 1], speed: .9, mode: 'forage', air: true },
  dwarfCory: { zone: 'Midwater with visits to the bottom and surface', band: [.3, .88], speed: .85, mode: 'cruise', air: true },
  glass: { zone: 'Midwater hovering', band: [.28, .66], speed: .6, mode: 'hover' },
  grazer: { zone: 'Grazing on wood, rock and glass', band: [.38, .98], speed: .8, mode: 'cling', materials: ['wood', 'stone', 'glass'] },
  rockGrazer: { zone: 'Rock and glass surfaces near the bottom', band: [.65, 1], speed: 1, mode: 'cling', materials: ['stone', 'glass'] },
  pleco: { zone: 'Bottom, wood and rock shelters', band: [.75, 1], speed: .65, mode: 'shelter', materials: ['wood', 'stone'] },
  browser: { zone: 'Lower and middle water; browsing hardscape', band: [.32, 1], speed: 1.4, mode: 'browse', materials: ['wood', 'stone'] },
  puffer: { zone: 'Lower and middle water, hovering and short darts', band: [.35, .88], speed: .6, mode: 'hover' },
  all: { zone: 'All levels with substrate visits', band: [.06, 1], speed: .9, mode: 'cruise' },
}

const genera = {}
const assign = (profile, names) => names.split(' ').forEach(name => { genera[name] = profile })
assign('middle', 'Phenacogrammus Paracheirodon Petitella Hemigrammus Hyphessobrycon Inpaichthys Nematobrycon Axelrodia Brycinus Arnoldichthys Thayeria Trigonostigma Boraras Microdevario Sundadanio Pterophyllum Symphysodon')
assign('upper', 'Nannostomus Poecilia Xiphophorus Poropanchax Oryzias Pseudomugil Iriatherina')
assign('active', 'Danio Brachydanio Tanichthys Notropis Melanotaenia Glossolepis Sahyadria Puntigrus')
assign('surface', 'Dermogenys Epiplatys')
assign('labyrinth', 'Betta Trichogaster Trichopodus Trichopsis Sphaerichthys Macropodus')
assign('lower', 'Celestichthys Puntius Desmopuntius')
assign('territory', 'Pelvicachromis Mikrogeophagus Apistogramma Badis Dario Brachygobius')
assign('rockTerritory', 'Labidochromis Pseudotropheus Maylandia')
assign('bottom', 'Pangio Ambastaia Botia Chromobotia Loricaria Rineloricaria')
assign('cory', 'Corydoras Gastrodermus Hoplisoma Osteogaster')
assign('glass', 'Kryptopterus')
assign('grazer', 'Macrotocinclus Otocinclus Ancistrus')
assign('rockGrazer', 'Stiphodon Beaufortia Yaoshania')
assign('pleco', 'Hypancistrus Pseudacanthicus')
assign('browser', 'Crossocheilus')
assign('puffer', 'Carinotetraodon Dichotomyctere')
assign('all', 'Carassius')

export function fishHabit(fish) {
  const [genus, species] = (fish.scientific || '').split(/\s+/)
  let id = genera[genus] || 'middle'
  if (['Corydoras', 'Gastrodermus'].includes(genus) && ['pygmaeus', 'hastatus'].includes(species)) id = 'dwarfCory'
  if (genus === 'Danio' && species === 'margaritatus') id = 'lower'
  return { id, matched: genus in genera, ...profiles[id] }
}

// Centers and tangents on the actual SVG silhouettes. Material-specific sites
// keep rheophilic rock grazers off the wood. Projection mirrors aquarium.css.
const sites = {
  classic: [[189, 158, -45, 'wood'], [271, 206, 2, 'wood'], [132, 195, -20, 'wood'], [228, 100, -69, 'wood'], [311, 160, -80, 'wood'], [335, 216, 8, 'wood'], [241, 60, -65, 'wood']],
  'stone-ridge': [[265, 307, -57, 'stone'], [674, 200, -69, 'stone'], [419, 385, -48, 'stone'], [904, 331, -65, 'stone'], [614, 326, -59, 'stone'], [290, 393, -76, 'stone']],
  'fallen-timber': [[463, 363, 8, 'wood'], [699, 402, 13, 'wood'], [455, 236, -23, 'wood'], [279, 209, 56, 'wood'], [219, 363, -42, 'wood'], [819, 443, 9, 'wood']],
  'woodland-pillars': [[180, 298, 79, 'wood'], [414, 337, 81, 'wood'], [724, 337, 77, 'wood'], [299, 277, -3, 'wood'], [324, 444, 24, 'stone'], [613, 439, -11, 'stone']],
  'branching-banks': [[261, 303, -34, 'wood'], [759, 253, 20, 'wood'], [95, 290, 75, 'wood'], [938, 221, 82, 'wood'], [189, 395, 8, 'stone'], [826, 423, -22, 'stone']],
}

export function fishHabitatSites(scape, size, materials = []) {
  const id = sites[scape?.id] ? scape.id : 'classic'
  // Hardscapes fill the 92% scene above the substrate. The classic external
  // SVG uses its intrinsic aspect ratio; the others explicitly stretch.
  const classicWidth = Math.min(100, 92 * (450 / 250) / (size.lengthCm / size.heightCm))
  const classicHeight = Math.min(92, 100 * (size.lengthCm / size.heightCm) / (450 / 250))
  const result = sites[id].filter(site => materials.includes(site[3])).map(([x, y, angle, material]) => ({
    x: id === 'classic' ? (100 - classicWidth) / 2 + x / 450 * classicWidth : x / 10,
    y: id === 'classic' ? (92 - classicHeight) / 2 + y / 250 * classicHeight : y / 500 * 92,
    angle: id === 'classic' ? angle : Math.atan2(Math.sin(angle * Math.PI / 180) * size.heightCm * .92 / 500, Math.cos(angle * Math.PI / 180) * size.lengthCm / 1000) * 180 / Math.PI,
    material, attached: true,
  }))
  // Front glass is available even in wood-only presets, rather than inventing
  // rocks or leaving suction grazers suspended in open water.
  if (materials.includes('glass')) result.push(
    { x: 10, y: 66, angle: -75, material: 'glass', attached: true },
    { x: 90, y: 72, angle: 75, material: 'glass', attached: true },
  )
  return result
}
