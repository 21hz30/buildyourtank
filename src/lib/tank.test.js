import test from 'node:test'
import assert from 'node:assert/strict'
import { STORAGE_KEY, careForTank, changeItem, changeSetup, createTank, getHealth, loadTank, normalizeTank, readSnapshot, remainingCoins, simulate, snapshotLink, tankCost } from './tank.js'

test('purchases use the budget, removals refund, and unaffordable setups are rejected', () => {
  const tank = createTank()
  assert.equal(tankCost(tank), 66)
  const next = changeItem(tank, 'fish', 'angelfish', 1).tank
  assert.equal(remainingCoins(next), 22)
  assert.deepEqual(changeItem(next, 'fish', 'angelfish', -1).tank, tank)
  const third = changeItem(next, 'fish', 'angelfish', 1).tank
  assert.ok(changeSetup(third, 'size', '150p').error)
  assert.equal(third.size, '60p')
})

test('daily care rewards cannot be claimed twice and feeding needs fish', () => {
  const first = careForTank(createTank(), 'feed', '2026-10-03')
  assert.equal(first.reward, 5)
  assert.equal(first.tank.earned, 5)
  assert.ok(careForTank(first.tank, 'feed', '2026-10-03').error)
  assert.equal(careForTank(first.tank, 'feed', '2026-10-04').tank.earned, 10)
  assert.ok(careForTank({ ...createTank(), fish: {} }, 'feed', '2026-10-03').error)
})

test('restoration rejects malformed state and storage failure falls back safely', () => {
  assert.equal(normalizeTank({ version: 1, name: 'Broken', size: 'imaginary' }), null)
  assert.equal(normalizeTank({ ...createTank(), fish: { angelfish: 12 } }), null)
  assert.deepEqual(loadTank({ getItem() { throw new Error('Storage blocked') } }), createTank())
  assert.deepEqual(loadTank({ getItem(key) { assert.equal(key, STORAGE_KEY); return '{broken' } }), createTank())
})

test('share snapshots round-trip Unicode names and reject corrupt/oversize links', () => {
  const tank = { ...createTank(), name: '小鱼的世界 🌿' }
  const url = snapshotLink(tank, 'https://example.com/#old')
  assert.deepEqual(readSnapshot(url.slice(url.indexOf('#'))).tank, tank)
  assert.ok(readSnapshot('#tank=broken').invalid)
  assert.ok(readSnapshot('#tank=' + 'x'.repeat(12001)).invalid)
  assert.equal(readSnapshot('#builder').invalid, false)
})

test('crowding changes the preview, stronger filtration helps, and simulation never mutates the tank', () => {
  const tank = { ...createTank(), earned: 100, fish: { angelfish: 6 }, plants: {} }
  const before = structuredClone(tank)
  assert.ok(getHealth(tank).warnings.length)
  const crowded = simulate(tank)
  const larger = { ...tank, size: '120p', filter: 'hang' }
  assert.ok(simulate(larger).quality > crowded.quality)
  assert.deepEqual(tank, before)
})
