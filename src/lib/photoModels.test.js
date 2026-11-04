import assert from 'node:assert/strict'
import test from 'node:test'
import { existsSync } from 'node:fs'
import { CATALOG, SIZES } from './tank.js'
import { fishPhotoSpec, photoMotion, plantAlpha } from './photoModels.js'
import { plantWidthPercent, plantPlacement } from './plantScale.js'

test('every fish has a bundled original photo and a valid subject extraction guide', () => {
  for (const fish of CATALOG.fish) {
    const spec = fishPhotoSpec(fish)
    assert.ok(existsSync(new URL(`../../public${spec.source}`, import.meta.url)), fish.id)
    assert.ok(spec.points || spec.bounds || spec.alpha || spec.white, `${fish.id}: extraction guide`)
    assert.ok([-1, 1].includes(spec.facing))
    if (spec.bounds) {
      const [left, top, right, bottom] = spec.bounds
      assert.ok(left >= 0 && top >= 0 && right <= 1 && bottom <= 1 && right > left && bottom > top, fish.id)
    }
    for (const [x, y] of spec.points || []) assert.ok(x >= 0 && x <= 1 && y >= 0 && y <= 1, fish.id)
  }
})

test('photo animation keeps the torso stable while tail, fins and gill area move', () => {
  const displacement = (x, y) => { const a = photoMotion(x,y,0), b = photoMotion(x,y,.27); return Math.hypot(a.x-b.x,a.y-b.y) }
  const torso = displacement(.5,.5)
  assert.ok(displacement(.03,.5) > .005)
  assert.ok(displacement(.45,.06) > .001)
  assert.ok(displacement(.77,.5) > .001)
  assert.ok(torso < .00001)
})

test('plant masking removes neutral packaging while retaining green and red leaves', () => {
  for (const rgb of [[255,255,255],[151,151,151],[20,20,20]]) assert.equal(plantAlpha(...rgb),0)
  assert.ok(plantAlpha(60,130,40) > .95)
  assert.ok(plantAlpha(140,65,56,true) > .95)
})

test('photo plant height remains physical across aspect ratios and tank sizes', () => {
  for (const size of SIZES) for (const ratio of [.4,1,2.5]) {
    const plant = { heightCm: 20, photoAspectRatio: ratio, plantType: 'Stem plants' }
    const width = plantWidthPercent(plant,size)
    assert.ok(Math.abs(width / 100 * size.lengthCm / ratio - 20) < 1e-9)
    const placement = plantPlacement(plant,size,[50,0])
    assert.equal(parseFloat(placement.width),width)
  }
  assert.equal(plantPlacement({ heightCm: 5, photoAspectRatio: 1.5, plantType: 'Floating plants' },SIZES[0],[50,0]).top,'1%')
})
