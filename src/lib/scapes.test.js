import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createTank, normalizeTank, readSnapshot, snapshotLink } from './tank.js'
import { activeTank, createWorkspace, normalizeWorkspace, purchaseSetup } from './workspace.js'
import { SCAPES, scapeFor } from './scapes.js'

test('each selectable hardscape has its own plant-free transparent illustration', () => {
  assert.equal(SCAPES.length, 5)
  assert.equal(new Set(SCAPES.map(scape => scape.id)).size, SCAPES.length)
  assert.equal(new Set(SCAPES.map(scape => scape.art)).size, SCAPES.length)
  for (const scape of SCAPES) {
    assert.equal(scape.price, 0)
    const svg = readFileSync(new URL(`../../public${scape.art}`, import.meta.url), 'utf8')
    assert.match(svg, /<svg\b/)
    assert.doesNotMatch(svg, /<image\b|<rect\b[^>]*fill=/)
  }
})

test('switching hardscapes is free and keeps inhabitants, water, and size', () => {
  const workspace = createWorkspace()
  const before = activeTank(workspace)
  const result = purchaseSetup(workspace, 'scape', 'stone-ridge').workspace
  const after = activeTank(result)
  assert.equal(result.coins, workspace.coins)
  assert.equal(after.scape, 'stone-ridge')
  assert.deepEqual(after.fish, before.fish)
  assert.deepEqual(after.plants, before.plants)
  assert.deepEqual(after.water, before.water)
  assert.equal(after.size, before.size)
  assert.equal(activeTank(normalizeWorkspace(result)).scape, 'stone-ridge')
  assert.ok(purchaseSetup(result, 'scape', 'missing').error)
})

test('old tanks retain the classic wood; snapshots retain new selections', () => {
  const old = { ...createTank() }
  delete old.scape
  assert.equal(normalizeTank(old).scape, 'classic')
  assert.equal(scapeFor(old).id, 'classic')
  assert.equal(normalizeTank({ ...old, scape: 'missing' }).scape, 'classic')
  const chosen = { ...createTank(), scape: 'branching-banks' }
  const link = snapshotLink(chosen, 'https://example.com/#/my-tanks')
  assert.equal(readSnapshot(link.slice(link.indexOf('#'))).tank.scape, 'branching-banks')
})
