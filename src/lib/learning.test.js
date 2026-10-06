import assert from 'node:assert/strict'
import test from 'node:test'
import { ENCYCLOPEDIA } from './learning.js'
import { filterLearningEntries } from './fishGroups.js'

test('plant nutrition is discoverable by nutrient names and symptoms, with category filters respected', () => {
  for (const query of ['potassium', 'magnesium', 'pinholes', 'nearly white', '水草营养']) {
    const results = filterLearningEntries(ENCYCLOPEDIA, { category: 'plants', search: query })
    assert.ok(results.some(entry => entry.id === 'guide-plant-nutrition'), query)
    assert.ok(results.every(entry => entry.category === 'plants'), query)
    assert.ok(!filterLearningEntries(ENCYCLOPEDIA, { category: 'fish', search: query })
      .some(entry => entry.id === 'guide-plant-nutrition'), query)
  }
})
