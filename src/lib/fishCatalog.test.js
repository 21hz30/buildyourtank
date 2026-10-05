import assert from 'node:assert/strict'
import { test } from 'node:test'
import { CATALOG, FISH_DETAILS } from './tank.js'
import { ENCYCLOPEDIA } from './learning.js'
import { FISH_TYPES, fishSpeciesKey, fishTypeFor, uniqueStoreFish } from './fishCatalog.js'
import { greenAquaSpecies } from './greenAquaSpecies.js'

test('Green Aqua fish are added once per species and sorted into fish types', () => {
  assert.equal(greenAquaSpecies.length, 100)
  assert.equal(new Set(greenAquaSpecies.map(fish => fish.id)).size, 100)
  const storeFish = uniqueStoreFish(CATALOG.fish)
  assert.equal(storeFish.length, 119)
  assert.equal(new Set(storeFish.map(fishSpeciesKey)).size, storeFish.length)
  assert.ok(storeFish.some(fish => fish.id === 'neon-tetra'))
  assert.ok(!storeFish.some(fish => fish.id === 'gold-neon-tetra' || fish.id === 'diamond-head-neon-tetra'))
  for (const type of ['Tetras', 'Rasboras', 'Betta fish', 'Cichlids', 'Catfish & plecos']) {
    assert.ok(storeFish.some(fish => fishTypeFor(fish) === type), `Missing type: ${type}`)
  }
  assert.equal(new Set(FISH_TYPES).size, FISH_TYPES.length)
})

test('each new fish has a real-photo link, adult size, source and guide entry', () => {
  for (const fish of greenAquaSpecies) {
    const listing = CATALOG.fish.find(item => item.id === fish.id)
    assert.ok(listing, `Missing ${fish.id}`)
    assert.ok(listing.adultLengthCm > 0)
    assert.ok(listing.minTankLitres > 0)
    assert.ok(listing.photo.startsWith('https://greenaqua.hu/media/catalog/product/') || listing.photo.startsWith('https://upload.wikimedia.org/wikipedia/commons/'))
    assert.ok(listing.sourceUrl.startsWith('https://greenaqua.hu/en/'))
    assert.ok(listing.art.startsWith('data:image/svg+xml,'))
    assert.ok(FISH_DETAILS[fish.id]?.space)
    const guide = ENCYCLOPEDIA.find(entry => entry.id === `fish-${fish.id}`)
    assert.ok(guide, `Missing guide for ${fish.id}`)
    assert.equal(guide.sourceUrl, listing.sourceUrl)
    assert.ok(guide.facts.length >= 6)
    assert.ok(guide.sections.length >= 2)
  }
})

test('Ruby tetra uses attributed species photos and a detailed care profile', () => {
  const fish = CATALOG.fish.find(item => item.id === 'axelrodia-riesei')
  const guide = ENCYCLOPEDIA.find(entry => entry.id === 'fish-axelrodia-riesei')
  assert.equal(fish.scientific, 'Axelrodia riesei')
  assert.equal(fish.photoCredit, 'Thomas Siems')
  assert.equal(fish.photoLicense, 'CC BY-SA 2.0')
  assert.equal(fish.galleryPhotos.length, 1)
  assert.equal(fish.galleryPhotos[0].credit, 'Gergely Hideg')
  assert.equal(guide.galleryPhotos.length, 1)
  assert.ok(guide.facts.some(([label, value]) => label === 'Native habitat' && value.includes('Río Meta')))
  assert.equal(guide.sections.length, 4)
})
