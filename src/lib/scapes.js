// Hardscape presets are illustrations only: fish, plants, and water settings stay with the tank.
export const SCAPES = [
  { id: 'classic', name: 'Classic driftwood', detail: 'A single, quiet piece of wood', material: 'Wood', art: '/art/driftwood.svg', price: 0 },
  { id: 'stone-ridge', name: 'Stone ridgeline', detail: 'Layered slate peaks and a small valley', material: 'Stone', art: '/art/scapes/stone-ridge.svg', price: 0 },
  { id: 'fallen-timber', name: 'Fallen timber', detail: 'A sweeping trunk with broken limbs', material: 'Wood', art: '/art/scapes/fallen-timber.svg', price: 0 },
  { id: 'woodland-pillars', name: 'Woodland pillars', detail: 'Upright roots and a natural bridge', material: 'Wood & stone', art: '/art/scapes/woodland-pillars.svg', price: 0 },
  { id: 'branching-banks', name: 'Branching banks', detail: 'Two wooded banks with an open center', material: 'Wood & stone', art: '/art/scapes/branching-banks.svg', price: 0 },
]

export function scapeFor(tank) {
  return SCAPES.find(item => item.id === tank?.scape) || SCAPES[0]
}
