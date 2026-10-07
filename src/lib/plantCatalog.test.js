import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import plantPhotos from './plantPhotos.json' with { type: 'json' }
import { aquariumPlantListings, PLANT_TYPES, plantCatalogStats, plantTypeFor } from './plantCatalog.js'
import { CATALOG, SIZES } from './tank.js'
import { ENCYCLOPEDIA } from './learning.js'
import { plantModelSvg } from './plantModels.js'
import { plantWidthPercent, plantPlacement } from './plantScale.js'

test('Green Aqua aquarium catalog is complete and deduplicated by plant or cultivar', () => {
  assert.equal(plantCatalogStats.sourceProducts, 518)
  assert.equal(plantCatalogStats.aquariumListings, 493)
  assert.ok(aquariumPlantListings.length >= 260)
  assert.equal(new Set(aquariumPlantListings.map(plant => plant.id)).size, aquariumPlantListings.length)
  assert.deepEqual(CATALOG.plants, aquariumPlantListings)
  for (const oldId of ['anubias', 'fern', 'grass']) assert.ok(CATALOG.plants.some(plant => plant.id === oldId))
})

test('every plant has a bundled source photograph, group, model, size and Learn entry', () => {
  assert.equal(Object.keys(plantPhotos).length, aquariumPlantListings.length)
  for (const plant of aquariumPlantListings) {
    const photo = plantPhotos[plant.id]
    assert.ok(plant.photo.startsWith('/art/plants/'), plant.name)
    assert.equal(plant.photo, photo.path, plant.name)
    assert.equal(plant.photoSource, photo.source, plant.name)
    assert.ok(photo.matchedName && photo.credit, plant.name)
    assert.equal(new URL(photo.source).protocol, 'https:', plant.name)
    assert.equal(new URL(photo.original).protocol, 'https:', plant.name)
    const bytes = readFileSync(new URL(`../../public${plant.photo}`, import.meta.url))
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', plant.name)
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP', plant.name)
    assert.ok(PLANT_TYPES.includes(plantTypeFor(plant)), plant.name)
    assert.ok(plant.heightCm > 0 && plant.heightIsEstimate, plant.name)
    assert.ok(plantModelSvg(plant.name, plant.plantType).includes(`<svg`), plant.name)
    const entry = ENCYCLOPEDIA.find(item => item.id === `plant-${plant.id}`)
    assert.ok(entry?.facts?.length >= 4 && entry?.sections?.length >= 2, plant.name)
    assert.equal(entry.art, plant.photo)
    assert.equal(entry.artType, 'photo')
    assert.equal(entry.artCredit, photo.credit)
    assert.notEqual(entry.art, plant.art)
  }
})

test('every plant model has deterministic geometry distinct from all other plants', () => {
  const shapes = aquariumPlantListings.map(plant => {
    const svg = plantModelSvg(plant.name, plant.plantType)
    assert.equal(svg, plantModelSvg(plant.name, plant.plantType), plant.name)
    return svg.replace(/aria-label="[^"]*"/g, '').replace(/#[\da-f]{6}/gi, '')
  })
  assert.equal(new Set(shapes).size, aquariumPlantListings.length)
})

test('plant scale is measured against each physical tank size', () => {
  const plant = aquariumPlantListings.find(item => item.id === 'fern')
  for (const size of SIZES) {
    const widthPercent = plantWidthPercent(plant, size)
    const placement = plantPlacement(plant, size, [50, 0])
    assert.equal(parseFloat(placement.width), widthPercent)
    assert.ok(Math.abs(widthPercent * size.lengthCm * .84 / 100 - plant.heightCm) < .00001)
  }
  const floater = aquariumPlantListings.find(item => item.plantType === 'Floating plants')
  assert.ok('top' in plantPlacement(floater, SIZES[0], [50, 0]))
})

test('plant illustrations keep cultivar colors distinct instead of sharing an olive cast', () => {
  const monte = CATALOG.plants.find(plant => plant.id === 'grass')
  const anubias = CATALOG.plants.find(plant => plant.id === 'anubias')
  const red = CATALOG.plants.find(plant => /Alternanthera reineckii/.test(plant.name))
  const channels = plant => plant.color.slice(1).match(/../g).map(value => Number.parseInt(value, 16))
  const [r, g, b] = channels(monte)
  assert.ok(g > r * 1.7 && g > b * 2 && g > 190, 'Monte Carlo should be a vivid green')
  assert.ok(channels(anubias)[1] < g, 'Anubias should retain its deeper green')
  assert.ok(channels(red)[0] > channels(red)[1] * 2, 'Red cultivars should retain their red pigment')
  for (const plant of [monte, anubias, red]) {
    const svg = decodeURIComponent(plant.art)
    assert.ok(svg.includes(`stop-color="${plant.color}"`), plant.name)
    assert.ok(!svg.includes('stop-color="#c1d68c"'), 'Leaf highlights should not impose a yellow-green cast')
  }
})
