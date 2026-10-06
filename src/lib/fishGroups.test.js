import assert from 'node:assert/strict'
import { test } from 'node:test'
import { ENCYCLOPEDIA } from './learning.js'
import { FISH_GROUPS, filterLearningEntries, fishGroupFor, groupFishEntries } from './fishGroups.js'

test('every library fish is placed in exactly one dedicated group without losing varieties', () => {
  const fish = ENCYCLOPEDIA.filter(entry => entry.category === 'fish')
  const groups = groupFishEntries(ENCYCLOPEDIA)
  const ids = groups.flatMap(group => group.entries.map(entry => entry.id))
  assert.equal(groups.length, 18)
  assert.equal(ids.length, fish.length)
  assert.equal(new Set(ids).size, fish.length)
  assert.deepEqual([...ids].sort(), fish.map(entry => entry.id).sort())
  assert.ok(groups.every(group => group.id !== 'other-fish'))
  assert.equal(new Set(FISH_GROUPS.map(group => group.id)).size, FISH_GROUPS.length)
  const tetras = groups.find(group => group.id === 'tetras').entries
  for (const id of ['fish-neon-tetra', 'fish-gold-neon-tetra', 'fish-diamond-head-neon-tetra']) {
    assert.ok(tetras.some(entry => entry.id === id))
  }
})

test('dedicated groups separate pencilfish, goldfish and badids from broad store categories', () => {
  for (const [scientific, expected] of [
    ['Nannostomus marginatus', 'pencilfish'], ['Carassius auratus', 'goldfish'],
    ['Badis badis', 'badis'], ['Dario dario', 'badis'],
    ['Danio margaritatus', 'danios-minnows'], ['Betta imbellis', 'bettas'],
  ]) assert.equal(fishGroupFor({ scientific }).id, expected)
  assert.equal(fishGroupFor({ scientific: 'Unknown species' }).id, 'other-fish')
})

test('each populated group provides all four introductory topics and reading sources', () => {
  for (const group of groupFishEntries(ENCYCLOPEDIA)) {
    for (const key of ['summary', 'chinese', 'characteristics', 'distribution', 'morphology', 'habits']) {
      assert.ok(group[key]?.trim(), `${group.id} is missing ${key}`)
    }
    assert.ok(group.sources.length, `${group.id} needs a source`)
    assert.ok(group.sources.every(source => source.name && new URL(source.url).protocol === 'https:'))
  }
})

test('search finds group names in both languages and remains scoped to category and group', () => {
  const bettas = filterLearningEntries(ENCYCLOPEDIA, { category: 'fish', search: ' BETTAS ' })
  assert.equal(bettas.length, 2)
  assert.ok(bettas.every(entry => fishGroupFor(entry).id === 'bettas'))
  assert.deepEqual(filterLearningEntries(ENCYCLOPEDIA, { search: '斗鱼类' }), bettas)
  const ruby = filterLearningEntries(ENCYCLOPEDIA, { category: 'fish', groupId: 'tetras', search: 'Axelrodia riesei' })
  assert.deepEqual(ruby.map(entry => entry.id), ['fish-axelrodia-riesei'])
  assert.equal(filterLearningEntries(ENCYCLOPEDIA, { groupId: 'bettas', search: 'Axelrodia riesei' }).length, 0)
  assert.equal(filterLearningEntries(ENCYCLOPEDIA, { category: 'plants', search: 'BETTAS' }).length, 0)
  assert.equal(groupFishEntries(filterLearningEntries(ENCYCLOPEDIA, { search: 'no-such-fish-123' })).length, 0)
})
