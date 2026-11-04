// Hardscape presets are illustrations only: fish, plants, and water settings stay with the tank.
export const SCAPES = [
  { id: 'classic', name: 'Classic driftwood', detail: '30 pieces: tall bogwood, fractured rocks and curling foreground roots', material: 'Wood & stone', art: '/art/driftwood.svg', price: 0 },
  { id: 'stone-ridge', name: 'Stone ridgeline', detail: '39 pieces: surface-height pinnacles, forked wood and chipped foreground stone', material: 'Stone & wood', art: '/art/scapes/stone-ridge.svg', price: 0 },
  { id: 'fallen-timber', name: 'Fallen timber', detail: '33 pieces: hollow timber, tall snags, rock backdrops and broken wood', material: 'Wood & stone', art: '/art/scapes/fallen-timber.svg', price: 0 },
  { id: 'woodland-pillars', name: 'Woodland pillars', detail: '48 pieces: a dense root woodland with tall stone and river pebbles', material: 'Wood & stone', art: '/art/scapes/woodland-pillars.svg', price: 0 },
  { id: 'branching-banks', name: 'Branching banks', detail: '60 pieces: layered rocky banks, surface-reaching roots and scattered fragments', material: 'Wood & stone', art: '/art/scapes/branching-banks.svg', price: 0 },
]

export function scapeFor(tank) {
  return SCAPES.find(item => item.id === tank?.scape) || SCAPES[0]
}
