import test from 'node:test'
import assert from 'node:assert/strict'
import { CATALOG, changeItem, changeSetup, createTank, getHealth, normalizeTank, readSnapshot, snapshotLink, tankCost } from './tank.js'
import { WORKSPACE_KEY, activeTank, addTank, createWorkspace, loadWorkspace, purchaseItem, purchaseSetup } from './workspace.js'

const plant = CATALOG.plants[0]
const crowdedTank = () => ({ ...createTank(), fish: { tetra: 60, angelfish: 20 }, plants: { [plant.id]: 45 }, earned: 5000 })

test('repeated purchases pass former per-species and total limits with correct charges and refunds', () => {
  let workspace = createWorkspace(createTank(), 5000)
  const before = structuredClone(workspace)
  for (let i = 0; i < 60; i++) workspace = purchaseItem(workspace, 'fish', 'tetra').workspace
  for (let i = 0; i < 45; i++) workspace = purchaseItem(workspace, 'plants', plant.id).workspace
  assert.equal(activeTank(workspace).fish.tetra, 63)
  assert.equal(activeTank(workspace).plants[plant.id], (before.tanks[0].plants[plant.id] || 0) + 45)
  assert.equal(workspace.coins, 5000 - 60 * 4 - 45 * plant.price)
  assert.ok(getHealth(activeTank(workspace)).load > getHealth(activeTank(workspace)).capacity)
  const refunded = purchaseItem(workspace, 'fish', 'tetra', -1).workspace
  assert.equal(refunded.coins, workspace.coins + 4)
  assert.equal(activeTank(refunded).fish.tetra, 62)
  assert.equal(before.tanks[0].fish.tetra, 3)
})

test('single-tank additions and setup changes ignore bioload and plant quantities', () => {
  const tank = crowdedTank()
  assert.equal(changeItem(tank, 'fish', 'angelfish', 1).tank.fish.angelfish, 21)
  assert.equal(changeItem(tank, 'plants', plant.id, 1).tank.plants[plant.id], 46)
  const large = { ...tank, size: '150p', filter: 'canister' }
  assert.equal(changeSetup(large, 'size', '60p').tank.size, '60p')
  assert.equal(changeSetup(large, 'filter', 'sponge').tank.filter, 'sponge')
  const workspace = createWorkspace(large)
  assert.equal(activeTank(purchaseSetup(workspace, 'size', '60p').workspace).size, '60p')
  assert.equal(activeTank(purchaseSetup(workspace, 'filter', 'sponge').workspace).filter, 'sponge')
})

test('large collections survive workspace restoration, snapshots and paid tank copies', () => {
  const tank = { ...createTank(), fish: { tetra: 4000 }, plants: { [plant.id]: 4000 }, earned: 0 }
  assert.ok(tankCost(tank) > 10100)
  const workspace = createWorkspace(tank, 100000)
  const restored = loadWorkspace({ getItem: key => key === WORKSPACE_KEY ? JSON.stringify(workspace) : null })
  assert.deepEqual(activeTank(restored).fish, tank.fish)
  assert.deepEqual(activeTank(restored).plants, tank.plants)
  assert.equal(restored.coins, workspace.coins)
  const owned = activeTank(restored)
  assert.deepEqual(normalizeTank(owned).fish, tank.fish)
  const url = snapshotLink(owned, 'https://example.com/')
  const shared = readSnapshot(url.slice(url.indexOf('#'))).tank
  assert.deepEqual(shared.fish, tank.fish)
  assert.deepEqual(shared.plants, tank.plants)
  const copied = addTank(restored, shared).workspace
  assert.equal(copied.tanks.length, 2)
  assert.deepEqual(activeTank(copied).fish, tank.fish)
  assert.deepEqual(activeTank(copied).plants, tank.plants)
  assert.equal(copied.coins, restored.coins - tankCost(tank))
})

test('unlimited stocking preserves wallet checks, valid quantities and nonnegative removals', () => {
  const workspace = createWorkspace(crowdedTank(), 0)
  const before = structuredClone(workspace)
  assert.match(purchaseItem(workspace, 'fish', 'tetra').error, /coins/)
  assert.match(purchaseItem(workspace, 'plants', plant.id).error, /coins/)
  assert.deepEqual(workspace, before)
  assert.ok(purchaseItem(workspace, 'fish', 'rasbora', -1).error)
  assert.ok(changeItem({ ...createTank(), fish: {} }, 'fish', 'tetra', -1).error)
  const normalized = normalizeTank({ ...crowdedTank(), fish: { tetra: 100, danio: -1, rasbora: 1.5, angelfish: Infinity, unknown: 5 } })
  assert.deepEqual(normalized.fish, { tetra: 100 })
})
