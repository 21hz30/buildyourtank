import assert from 'node:assert/strict'
import test from 'node:test'
import { CATALOG, SIZES } from './tank.js'
import { SCAPES } from './scapes.js'
import { fishHabitatSites } from './fishHabits.js'
import { attachedFoliageBounds, plantLayer, plantingLayout, plantingStyle } from './plantLayout.js'
import { plantPhotoHasBackdrop } from './photoModels.js'

const grass = CATALOG.plants.find(plant => plant.id === 'grass')
const copies = (plant, count) => Array.from({ length: count }, (_, index) => ({ ...plant, key: `${plant.id}-${index}` }))

test('foreground models shrink both dimensions by ten percent with their roots anchored', () => {
  for (const size of SIZES) {
    for (const placement of plantingLayout(copies(grass, 1), size, SCAPES[0])) {
      const current = plantingStyle(grass, size, placement)
      const previous = plantingStyle(grass, size, { ...placement, heightScale: placement.heightScale / .9 })
      assert.ok(Math.abs(parseFloat(current.width) / parseFloat(previous.width) - .9) < 1e-9)
      assert.ok(Math.abs(parseFloat(current.height) / parseFloat(previous.height) - .9) < 1e-9)
      const root = style => 100 - parseFloat(style.bottom) - parseFloat(style.height) * 14 / 240
      assert.ok(Math.abs(root(current) - root(previous)) < 1e-9)
    }
  }
})

test('foreground portions spread evenly across soil and new quantities add planting sites', () => {
  for (const size of SIZES) {
    const first = plantingLayout(copies(grass, 1), size, SCAPES[0])
    assert.equal(first.length, 4)
    const x = first.map(p => p.x).sort((a, b) => a - b)
    assert.ok(x[0] < 17 && x[3] > 83)
    assert.ok(Math.max(...x.slice(1).map((v, i) => v - x[i])) < 31)
    for (const count of [2, 8, 24, 90]) {
      const layout = plantingLayout(copies(grass, count), size, SCAPES[0])
      assert.equal(layout.length, count * 4)
      assert.equal(new Set(layout.map(p => `${p.x},${p.y}`)).size, layout.length, 'no reused root positions')
      assert.ok(layout.every(p => p.y >= 87 && p.y <= 97), 'roots in the foreground soil')
      assert.ok(layout.every(p => p.depth === 8))
      for (const old of first) assert.deepEqual(layout.find(p => p.key === old.key), old, 'adding pots preserves existing plugs')
    }
  }
})

test('planting follows catalogue positions, while moss, rhizomes and floaters use their habitats', () => {
  for (const size of SIZES) for (const scape of SCAPES) {
    const plants = CATALOG.plants.map(plant => ({ ...plant, key: `${plant.id}-0` }))
    const layout = plantingLayout(plants, size, scape)
    const sites = fishHabitatSites(scape, size, ['wood', 'stone'])
    assert.equal(new Set(layout.map(p => p.key)).size, layout.length)
    assert.ok(layout.every(p => p.layer !== 'moss'))
    for (const placement of layout) {
      assert.equal(placement.layer, plantLayer(placement.plant))
      if (placement.layer === 'hardscape') assert.ok(sites.some(site => site.x === placement.anchor.x && site.y === placement.anchor.y))
      if (placement.layer === 'surface') assert.equal(placement.y, 1)
      if (['background', 'midground'].includes(placement.layer)) {
        assert.ok(placement.x < 37 || placement.x > 63, 'planted side banks')
        assert.ok(placement.y >= 85 && placement.y <= 91)
        assert.equal(placement.depth, placement.layer === 'background' ? 2 : 5)
      }
      const style = plantingStyle({ ...placement.plant, photoAspectRatio: 2 }, size, placement)
      assert.ok(Number.isFinite(parseFloat(style.width)) && Number.isFinite(parseFloat(style.left)))
      assert.ok(parseFloat(style.left) - parseFloat(style.width) / 2 >= -.0001)
      assert.ok(parseFloat(style.left) + parseFloat(style.width) / 2 <= 100.0001)
      if (placement.layer === 'hardscape') assert.equal(parseFloat(style.left), placement.x, 'rhizome remains on the chosen surface')
      if (placement.layer === 'surface') assert.equal(style.top, '1%')
      else {
        const height = parseFloat(style.height)
        assert.ok(placement.y - height >= 1.999)
        assert.ok(Math.abs(100 - parseFloat(style.bottom) - placement.y) < .0001, 'photo roots meet their soil/surface anchor')
      }
    }
  }
})

test('attached plants fill distinct surface positions with varied stable angles and anchored roots', () => {
  const epiphyte = CATALOG.plants.find(p => p.id === 'anubias')
  for (const size of SIZES) for (const scape of SCAPES) {
    const first = plantingLayout(copies(epiphyte, 8), size, scape)
    const many = plantingLayout(copies(epiphyte, 90), size, scape)
    assert.equal(new Set(many.map(p => `${p.x},${p.y}`)).size, many.length)
    assert.ok(new Set(many.map(p => Math.round(p.angle))).size > 10)
    assert.equal(new Set(many.map(p => p.flip)).size, 2)
    for (const old of first) assert.deepEqual(many.find(p => p.key === old.key), old)
    for (const placement of many) {
      const radians = placement.anchor.angle * Math.PI / 180
      const dx = (placement.x - placement.anchor.x) * size.lengthCm / 100
      const dy = (placement.y - placement.anchor.y) * size.heightCm / 100
      assert.ok(Math.abs(dx * Math.sin(radians) - dy * Math.cos(radians)) < 1e-8, 'root follows the surface tangent')
      assert.ok(Math.abs(placement.angle) <= 55, 'foliage still grows upward')
      for (const aspect of [undefined, .4, 2, 4]) {
        const plant = { ...epiphyte, photoAspectRatio: aspect }
        const style = plantingStyle(plant, size, placement)
        const width = parseFloat(style.width), height = parseFloat(style.height)
        assert.ok(width > 0 && height > 0)
        const rootFraction = aspect ? 1 : 226 / 240
        const bounds = attachedFoliageBounds(width, height, size, placement.angle, rootFraction)
        assert.ok(placement.x + bounds.left >= .999 && placement.x + bounds.right <= 99.001)
        assert.ok(placement.y + bounds.top >= 1.999 && placement.y + bounds.bottom <= 98.001)
        assert.ok(Math.abs(100 - parseFloat(style.bottom) - height * (1 - rootFraction) - placement.y) < 1e-8, 'photo and fallback pivots meet the surface')
      }
    }
  }
})

test('fallback artwork roots align with the same soil anchors and algae balls remain whole', () => {
  const ball = CATALOG.plants.find(p => p.plantType === 'Algae balls')
  assert.equal(plantingLayout(copies(ball, 5), SIZES[0], SCAPES[0]).length, 5)
  const placement = plantingLayout(copies(grass, 1), SIZES[0], SCAPES[0])[0]
  const style = plantingStyle(grass, SIZES[0], placement)
  const height = parseFloat(style.height)
  assert.ok(Math.abs(100 - parseFloat(style.bottom) - height * 14 / 240 - placement.y) < .0001)
})

test('plant photo compositing rejects rectangular surroundings while retaining rounded foliage', () => {
  const width = 80, height = 80
  const block = new Uint8ClampedArray(width * height * 4)
  const foliage = new Uint8ClampedArray(width * height * 4)
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    block[(y * width + x) * 4 + 3] = 255
    if (Math.hypot(x - 40, y - 40) <= 30) foliage[(y * width + x) * 4 + 3] = 255
  }
  assert.equal(plantPhotoHasBackdrop(block, width, height), true)
  assert.equal(plantPhotoHasBackdrop(foliage, width, height, [10, 10, 70, 70]), false)
})
