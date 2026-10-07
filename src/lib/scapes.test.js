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
    assert.match(svg, /data-piece="[^"]*(?:rear|far)[^"]*"/)
    assert.match(svg, /data-piece="[^"]*(?:front|foreground)[^"]*"/)
    assert.ok((svg.match(/data-piece=/g) || []).length >= 8)
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

test('expanded scenery triples each preset with distinct pieces across three depth layers', () => {
  const minimums = { classic: 30, 'stone-ridge': 39, 'fallen-timber': 33, 'woodland-pillars': 48, 'branching-banks': 60 }
  for (const scape of SCAPES) {
    const svg = readFileSync(new URL(`../../public${scape.art}`, import.meta.url), 'utf8')
    const pieces = [...svg.matchAll(/data-piece="([^"]+)"[^>]*><path d="([^"]+)"/g)]
    assert.ok(pieces.length >= minimums[scape.id], `${scape.id}: at least three times the former scenery`)
    assert.equal(new Set(pieces.map(piece => piece[1])).size, pieces.length, 'unique pieces')
    assert.equal(new Set(pieces.map(piece => piece[2])).size, pieces.length, 'distinct silhouettes')
    for (const depth of ['background', 'middle', 'foreground']) assert.match(svg, new RegExp(`data-depth="${depth}"`))
    assert.match(svg, /preserveAspectRatio="none"/, 'fill the tank at every aspect ratio')
  }
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
