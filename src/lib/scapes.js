// Hardscape presets are illustrations only: fish, plants, and water settings stay with the tank.
export const SCAPES = [
  { id: 'classic', name: 'Classic driftwood', detail: 'Twisted bogwood, a hollow crown and curling roots', material: 'Wood', art: '/art/driftwood.svg', price: 0 },
  { id: 'stone-ridge', name: 'Stone ridgeline', detail: 'Fractured fins, folded slabs and a quartz-veined outcrop', material: 'Stone', art: '/art/scapes/stone-ridge.svg', price: 0 },
  { id: 'fallen-timber', name: 'Fallen timber', detail: 'A hollow trunk with peeling bark and broken limbs', material: 'Wood', art: '/art/scapes/fallen-timber.svg', price: 0 },
  { id: 'woodland-pillars', name: 'Woodland pillars', detail: 'Forked, hollow and bowed trunks over river stones', material: 'Wood & stone', art: '/art/scapes/woodland-pillars.svg', price: 0 },
  { id: 'branching-banks', name: 'Branching banks', detail: 'A pale root fan and dark arch over contrasting rocks', material: 'Wood & stone', art: '/art/scapes/branching-banks.svg', price: 0 },
]

export function scapeFor(tank) {
  return SCAPES.find(item => item.id === tank?.scape) || SCAPES[0]
}
