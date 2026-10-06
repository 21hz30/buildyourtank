import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { ENCYCLOPEDIA } from './learning.js'
import { WORKSPACE_KEY, STORE_SUPPLIES, buySupply, careForWorkspace, createWorkspace, foodPortions, loadWorkspace, normalizeWorkspace } from './workspace.js'

const foods = STORE_SUPPLIES.filter(item => item.art)

test('the store and Learn contain the two distinct 90 g Best Bite cans', () => {
  assert.deepEqual(foods.map(item => item.id), ['foodNano', 'foodSmall'])
  for (const item of foods) {
    assert.match(item.sourceUrl, /^https:\/\/greenaqua\.hu\/en\//)
    assert.match(item.description, /90 g can/)
    assert.match(readFileSync(new URL(`../../public${item.art}`, import.meta.url), 'utf8'), /<svg/)
    const entry = ENCYCLOPEDIA.find(entry => entry.id === `supply-${item.id}`)
    assert.equal(entry?.art, item.art)
    assert.equal(entry?.sourceUrl, item.sourceUrl)
    assert.ok(entry?.sections.length >= 2)
  }
  assert.equal(STORE_SUPPLIES.some(item => item.id === 'food'), false)
})

test('both purchased foods persist separately and contribute to the food balance', () => {
  const initial = createWorkspace()
  const nano = buySupply(initial, 'foodNano').workspace
  const both = buySupply(nano, 'foodSmall').workspace
  assert.equal(both.resources.foodNano, 5)
  assert.equal(both.resources.foodSmall, 5)
  assert.equal(both.resources.food, initial.resources.food)
  assert.equal(foodPortions(both.resources), 15)
  assert.equal(both.coins, initial.coins - 16)
  const restored = loadWorkspace({ getItem(key) { return key === WORKSPACE_KEY ? JSON.stringify(both) : null } })
  assert.deepEqual(restored.resources, both.resources)
  assert.equal(careForWorkspace(both, 'feed', '2026-10-06').workspace.resources.foodNano, 4)
})

test('older saved workspaces retain starter food and acquire empty Best Bite counts', () => {
  const old = createWorkspace()
  delete old.resources.foodNano
  delete old.resources.foodSmall
  const restored = normalizeWorkspace(old)
  assert.equal(restored.resources.food, 5)
  assert.equal(restored.resources.foodNano, 0)
  assert.equal(restored.resources.foodSmall, 0)
  assert.equal(foodPortions(restored.resources), 5)
  assert.equal(normalizeWorkspace({ ...old, resources: { ...old.resources, foodNano: -1 } }), null)
})
