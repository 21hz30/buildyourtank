import test from 'node:test'
import assert from 'node:assert/strict'
import { STORAGE_KEY, createTank, remainingCoins, today } from './tank.js'
import { STARTING_COINS, WORKSPACE_KEY, activeTank, addTank, buySupply, careForWorkspace, checkIn, createWorkspace, fertilize, loadWorkspace, normalizeWorkspace, purchaseItem, purchaseSetup, replaceTank } from './workspace.js'

test('new workspaces start with 300 spendable coins without changing saved balances', () => {
  const fresh = createWorkspace()
  assert.equal(STARTING_COINS, 300)
  assert.equal(fresh.coins, 300)
  assert.equal(loadWorkspace({ getItem() { return null } }).coins, 300)
  const saved = { ...fresh, coins: 24 }
  assert.equal(loadWorkspace({ getItem(key) { return key === WORKSPACE_KEY ? JSON.stringify(saved) : null } }).coins, 24)
})

test('migrating a v1 tank preserves its setup, earned balance, care and name', () => {
  const legacy = { ...createTank(), name: 'My original aquarium', earned: 13, care: { feed: '2026-10-03' }, savedAt: '2026-10-03T12:00:00Z' }
  const storage = { getItem(key) { return key === STORAGE_KEY ? JSON.stringify(legacy) : null } }
  const result = loadWorkspace(storage)
  assert.equal(result.coins, remainingCoins(legacy))
  assert.equal(activeTank(result).name, legacy.name)
  assert.deepEqual(activeTank(result).fish, legacy.fish)
  assert.deepEqual(activeTank(result).care, legacy.care)
  assert.equal(activeTank(result).savedAt, legacy.savedAt)
  assert.equal(result.tanks.length, 1)
})

test('daily check-in is once per date, continues consecutive streaks and resets after gaps', () => {
  const initial = createWorkspace()
  const before = structuredClone(initial)
  const first = checkIn(initial, '2026-10-03').workspace
  assert.equal(first.coins, initial.coins + 20)
  assert.ok(checkIn(first, '2026-10-03').error)
  const next = checkIn(first, '2026-10-04').workspace
  assert.equal(next.checkIn.streak, 2)
  assert.equal(checkIn(next, '2026-10-06').workspace.checkIn.streak, 1)
  assert.deepEqual(initial, before)
})

test('feeding consumes shared inventory, only updates the selected tank and rejects repeat or empty supplies', () => {
  const initial = { ...createWorkspace(), coins: 500 }
  const added = addTank(initial, { ...createTank(), name: 'Second tank' }).workspace
  const result = careForWorkspace(added, 'feed', '2026-10-04').workspace
  assert.equal(result.resources.food, added.resources.food - 1)
  assert.equal(result.coins, added.coins + 5)
  assert.equal(result.tanks[0].care.feed, undefined)
  assert.equal(activeTank(result).care.feed, '2026-10-04')
  assert.ok(careForWorkspace(result, 'feed', '2026-10-04').error)
  assert.ok(careForWorkspace({ ...added, resources: { ...added.resources, food: 0 } }, 'feed').error)
})

test('purchases and setup trade-ins use one balance, fail atomically and refund correctly', () => {
  const initial = createWorkspace()
  const purchased = purchaseItem(initial, 'fish', 'tetra').workspace
  assert.equal(purchased.coins, initial.coins - 4)
  assert.equal(activeTank(purchased).fish.tetra, 4)
  assert.equal(purchaseItem(purchased, 'fish', 'tetra', -1).workspace.coins, initial.coins)
  const larger = purchaseSetup(initial, 'size', '150p').workspace
  assert.equal(larger.coins, initial.coins - 30)
  assert.equal(purchaseSetup(larger, 'size', '60p').workspace.coins, initial.coins)
  const emptyWallet = { ...initial, coins: 0 }
  const before = structuredClone(emptyWallet)
  assert.ok(purchaseItem(emptyWallet, 'fish', 'tetra').error)
  assert.ok(purchaseSetup(emptyWallet, 'glass', 'clear').error)
  assert.deepEqual(emptyWallet, before)
})

test('new tanks never replace existing tanks; insufficient funds and collection limits fail safely', () => {
  const initial = createWorkspace()
  const empty = { ...createTank(), fish: {}, plants: {}, name: 'New little home' }
  const created = addTank(initial, empty).workspace
  assert.equal(created.tanks.length, 2)
  assert.deepEqual(created.tanks[0], initial.tanks[0])
  assert.notEqual(created.activeId, initial.activeId)
  assert.equal(created.coins, initial.coins - 30)
  assert.equal(addTank(created, empty).workspace.tanks.length, 3)
  assert.ok(addTank({ ...created, coins: 0 }, empty).error)
  assert.ok(addTank({ ...initial, coins: 999, tanks: Array.from({ length: 8 }, (_, i) => ({ ...initial.tanks[0], id: String(i) })) }, empty).error)
})

test('supplies add pack quantities, fertilizer is used once, and inventory survives restoration', () => {
  const initial = createWorkspace()
  const purchased = buySupply(initial, 'fertilizer').workspace
  assert.equal(purchased.coins, initial.coins - 6)
  assert.equal(purchased.resources.fertilizer, initial.resources.fertilizer + 3)
  const cared = fertilize(purchased, today()).workspace
  assert.equal(cared.resources.fertilizer, purchased.resources.fertilizer - 1)
  assert.equal(activeTank(cared).water.nutrients, 4)
  assert.ok(fertilize(cared, today()).error)
  const restored = loadWorkspace({ getItem(key) { return key === WORKSPACE_KEY ? JSON.stringify(cared) : null } })
  assert.deepEqual(restored.resources, cared.resources)
  assert.ok(fertilize(restored, today()).error)
})

test('restoration validates ownership collection ids, budgets and inventory', () => {
  const initial = createWorkspace()
  assert.equal(normalizeWorkspace({ ...initial, coins: -1 }), null)
  assert.equal(normalizeWorkspace({ ...initial, resources: { ...initial.resources, food: -1 } }), null)
  assert.equal(normalizeWorkspace({ ...initial, tanks: [initial.tanks[0], initial.tanks[0]] }), null)
  assert.equal(normalizeWorkspace({ ...initial, tanks: [{ ...initial.tanks[0], size: 'imaginary' }] }), null)
  const updated = replaceTank(initial, { ...activeTank(initial), isPublic: true })
  assert.equal(normalizeWorkspace(updated).tanks[0].isPublic, true)
})

test('manual water settings survive snapshots and trigger educational status warnings', async () => {
  const { getHealth, simulate, snapshotLink, readSnapshot } = await import('./tank.js')
  const tank = { ...createTank(), water: { temperature: 31, hardness: 12, nutrients: 9, ph: 4.5 } }
  const initialQuality = simulate(createTank()).quality
  assert.equal(getHealth(tank).ph, '4.5')
  assert.ok(getHealth(tank).warnings.some(warning => warning.includes('pH')))
  assert.ok(simulate(tank).quality < initialQuality)
  const link = snapshotLink(tank, 'https://example.com/')
  assert.deepEqual(readSnapshot(link.slice(link.indexOf('#'))).tank.water, tank.water)
})
