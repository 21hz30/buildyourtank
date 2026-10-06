import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { FILTERS, SIZES, STORE_FILTERS, createTank, normalizeTank, readSnapshot, snapshotLink } from './tank.js'
import { filterRoomGeometry, FILTER_FLOOR_Y, ROOM_UNITS_PER_CM } from './filterGeometry.js'
import { activeTank, createWorkspace, normalizeWorkspace, purchaseSetup } from './workspace.js'

test('the five requested filters have distinct bundled models and source pages', () => {
  assert.equal(STORE_FILTERS.length, 5)
  assert.equal(new Set(STORE_FILTERS.map(item => item.id)).size, 5)
  assert.equal(new Set(STORE_FILTERS.map(item => item.modelArt)).size, 5)
  for (const item of STORE_FILTERS) {
    assert.ok(item.price > 0 && item.capacity > 0 && item.flowLph > 0)
    assert.ok(item.widthCm > 0 && item.heightCm > 0)
    assert.match(item.sourceUrl, /^https:\/\/greenaqua\.hu\/en\//)
    const art = readFileSync(new URL(`../../public${item.modelArt}`, import.meta.url), 'utf8')
    assert.match(art, /<svg\b/)
    assert.match(art, /<text\b/)
  }
})

test('filter geometry is scaled to the physical tank and remains right of all three sizes', () => {
  for (const size of SIZES) for (const filter of STORE_FILTERS) {
    const p = filterRoomGeometry(filter, size)
    assert.equal(p.width, filter.widthCm * ROOM_UNITS_PER_CM)
    assert.equal(p.height, filter.heightCm * ROOM_UNITS_PER_CM)
    assert.equal(p.y + p.height, FILTER_FLOOR_Y)
    assert.ok(p.x > p.tankRight)
    assert.ok(p.x + p.width < 1000)
    assert.ok(p.inletX < p.tankRight && p.outletX < p.inletX)
    assert.ok(p.tankTop > 0 && p.y > p.tankTop)
  }
  assert.equal(filterRoomGeometry(FILTERS[0], SIZES[0]), null)
})

test('filter changes charge only the trade-in difference and survive storage and snapshots', () => {
  const workspace = createWorkspace()
  const initialTank = activeTank(workspace)
  const chosen = purchaseSetup(workspace, 'filter', 'ada-es-600').workspace
  assert.equal(chosen.coins, workspace.coins - (28 - 8))
  assert.equal(activeTank(chosen).filter, 'ada-es-600')
  assert.deepEqual(activeTank(chosen).fish, initialTank.fish)
  assert.equal(activeTank(normalizeWorkspace(chosen)).filter, 'ada-es-600')
  const snapshot = snapshotLink(activeTank(chosen), 'https://example.com/#/my-tanks')
  assert.equal(readSnapshot(snapshot.slice(snapshot.indexOf('#'))).tank.filter, 'ada-es-600')
  assert.equal(purchaseSetup(chosen, 'filter', 'sponge').workspace.coins, workspace.coins)
  assert.equal(normalizeTank({ ...createTank(), filter: 'unknown' }).filter, 'sponge')
})
