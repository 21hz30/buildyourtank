import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { test } from 'node:test'
import { CATALOG, FISH_DETAILS, SIZES } from './tank.js'
import { ENCYCLOPEDIA } from './learning.js'
import { tetraListings, tetraProfiles } from './tetraCatalog.js'

test('every added Green Aqua tetra has a complete store and field-guide entry', () => {
  assert.equal(tetraListings.length, 15)
  assert.equal(new Set(tetraListings.map(fish => fish.id)).size, tetraListings.length)
  assert.equal(new Set(tetraListings.map(fish => tetraProfiles[fish.id].sourceUrl)).size, tetraListings.length)
  for (const fish of tetraListings) {
    assert.ok(CATALOG.fish.includes(fish))
    assert.ok(fish.name.toLowerCase().includes('tetra'))
    assert.ok(fish.adultLengthCm > 0 && fish.adultLengthCm < SIZES[0].lengthCm)
    assert.ok(fish.art.startsWith('data:image/svg+xml,'))
    assert.ok(existsSync(new URL(`../../public${fish.photo}`, import.meta.url)), `Missing photo: ${fish.photo}`)
    assert.ok(fish.photoCredit && fish.photoSource)
    assert.ok(FISH_DETAILS[fish.id]?.space)
    const entry = ENCYCLOPEDIA.find(item => item.id === `fish-${fish.id}`)
    assert.ok(entry)
    assert.equal(entry.sourceUrl, tetraProfiles[fish.id].sourceUrl)
    assert.ok(entry.facts.length >= 8)
    assert.ok(entry.sections.length >= 4)
  }
})
