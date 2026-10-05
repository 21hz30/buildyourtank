import assert from 'node:assert/strict'
import { test } from 'node:test'
import { CATALOG, SIZES } from './tank.js'
import { uniqueStoreFish } from './fishCatalog.js'
import { fishLooks } from './fishModels.js'
import { fishPlacement, fishWidthPercent } from './fishScale.js'
import { greenAquaSpecies } from './greenAquaSpecies.js'

test('every Green Aqua species has its own illustrated tank model', () => {
  assert.equal(Object.keys(fishLooks).length, greenAquaSpecies.length)
  for (const species of greenAquaSpecies) {
    const fish = CATALOG.fish.find(item => item.id === species.id)
    assert.ok(fishLooks[species.id], `Missing visual traits for ${species.id}`)
    assert.ok(fish.art.startsWith('data:image/svg+xml,'))
    assert.match(decodeURIComponent(fish.art), /<svg[^>]+viewBox="0 0 300 /)
    assert.equal(fish.artLengthRatio, 1)
    assert.ok(fish.artAspectRatio > 0)
  }
  const storeFish = uniqueStoreFish(CATALOG.fish)
  assert.equal(new Set(storeFish.map(fish => fish.art)).size, storeFish.length)
})

test('rendered fish lengths match adult lengths in every tank size', () => {
  for (const size of SIZES) {
    for (const fish of CATALOG.fish) {
      const width = fishWidthPercent(fish, size)
      const visibleCentimetres = width / 100 * size.lengthCm * fish.artLengthRatio
      assert.ok(Math.abs(visibleCentimetres - fish.adultLengthCm) < 1e-9, `${fish.id} in ${size.id}`)
      const { left, top, width: placedWidth } = fishPlacement(fish, size, [75, 58])
      const leftValue = Number.parseFloat(left)
      const topValue = Number.parseFloat(top)
      const placed = Number.parseFloat(placedWidth)
      const height = placed * size.lengthCm / size.heightCm / fish.artAspectRatio
      assert.ok(leftValue - placed / 2 >= 1.99, `${fish.id} overflows left edge`)
      assert.ok(leftValue + placed / 2 <= 98.01, `${fish.id} overflows right edge`)
      assert.ok(topValue - height / 2 >= 1.99, `${fish.id} overflows water surface`)
      assert.ok(topValue + height / 2 <= 85.01, `${fish.id} overlaps substrate`)
    }
  }
})
