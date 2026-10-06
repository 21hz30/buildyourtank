import assert from 'node:assert/strict'
import { test } from 'node:test'
import { CATALOG, SIZES } from './tank.js'
import { uniqueStoreFish } from './fishCatalog.js'
import { fishLooks, fishMorphology, fishModelSvg } from './fishModels.js'
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

test('species anatomy changes silhouettes, tails, mouths and identifying details', () => {
  const model = id => decodeURIComponent(CATALOG.fish.find(fish => fish.id === id).art)
  const morphology = id => fishMorphology({ id })
  assert.equal(morphology('beaufortia-kweichowensis').shape, 'hillstream')
  assert.equal(morphology('poecilia-reticulata').tail, 'fan')
  assert.equal(morphology('dermogenys-pusilla').mouth, 'halfbeak')
  assert.equal(morphology('ancistrus-cirrhosus').mouth, 'sucker')
  assert.match(model('iriatherina-werneri'), /data-tail="lyre"/)
  assert.match(model('iriatherina-werneri'), /M112 70Q90 11 87 0/)
  assert.match(model('beaufortia-kweichowensis'), /M178 109Q146 159 74 165/)
  assert.match(model('kryptopterus-vitreolus'), /fill-opacity="\.51"/)
  assert.match(model('ancistrus-cirrhosus'), /M276 77l8-16/)
  assert.notEqual(morphology('corydoras-pygmaeus').depth, morphology('corydoras-aeneus').depth)
})

test('every catalog fish supports animation with local paint and anatomy layers', () => {
  for (const fish of CATALOG.fish) {
    const first = fishModelSvg(fish, 'swimmer-a')
    const second = fishModelSvg(fish, 'swimmer-b')
    const ids = svg => new Set([...svg.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]))
    const firstIds = ids(first), secondIds = ids(second)
    for (const id of firstIds) assert.ok(!secondIds.has(id), `Duplicate paint server: ${fish.id}`)
    for (const [, id] of first.matchAll(/url\(#([^)]+)\)/g)) assert.ok(firstIds.has(id), `Unresolved paint: ${fish.id}`)
    for (const part of ['tail', 'dorsal', 'anal', 'pectoral', 'gill']) assert.ok(first.includes(`class="fish-${part}"`), `${fish.id}: missing ${part}`)
    assert.equal(fish.artLengthRatio, 1)
    assert.ok(fish.artAspectRatio > 0)
  }
})
