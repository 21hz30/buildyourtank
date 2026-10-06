import test from 'node:test'
import assert from 'node:assert/strict'
import { CATALOG, SIZES } from './tank.js'
import { SCAPES } from './scapes.js'
import { fishSwimPlan } from './fishSwimming.js'
import { fishHabit, fishHabitatSites } from './fishHabits.js'

const fish = id => CATALOG.fish.find(item => item.id === id)

test('all species have explicit habits, with species exceptions and consistent variants', () => {
  for (const item of CATALOG.fish) assert.ok(fishHabit(item).matched, item.scientific)
  const expected = { 'dermogenys-pusilla': 'surface', 'epiplatys-annulatus': 'surface', 'corydoras-pygmaeus': 'dwarfCory', 'corydoras-hastatus': 'dwarfCory', 'corydoras-panda': 'cory', danio: 'lower', 'danio-rerio': 'active', 'kryptopterus-vitreolus': 'glass', 'hypancistrus-sp-l066': 'pleco', 'crossocheilus-oblongus': 'browser' }
  for (const [id, habit] of Object.entries(expected)) assert.equal(fishHabit(fish(id)).id, habit)
  assert.deepEqual(fishHabit(fish('neon-tetra')), fishHabit(fish('gold-neon-tetra')))
})

test('all fish remain inside the tank during travel and rotated rests across sizes and scapes', () => {
  for (const size of SIZES) for (const scape of SCAPES) for (const item of CATALOG.fish) {
    const plan = fishSwimPlan(item, size, `${item.id}-0`, scape)
    const height = plan.width * size.lengthCm / size.heightCm / item.artAspectRatio
    let position = plan.start
    const check = point => {
      const angle = (point.angle || 0) * Math.PI / 180
      const halfWidth = (plan.width * Math.abs(Math.cos(angle)) + height * size.heightCm / size.lengthCm * Math.abs(Math.sin(angle))) / 2
      const halfHeight = (height * Math.abs(Math.cos(angle)) + plan.width * size.lengthCm / size.heightCm * Math.abs(Math.sin(angle))) / 2
      assert.ok(point.x - halfWidth >= 1.99 && point.x + halfWidth <= 98.01, `${item.id}/${size.id}/${scape.id}: sides`)
      assert.ok(point.y - halfHeight >= 2.99 && point.y + halfHeight <= 84.01, `${item.id}/${size.id}/${scape.id}: surface/substrate`)
    }
    check(position)
    for (let step = 0; step < 32; step++) {
      const leg = plan.leg(position, step)
      assert.ok(leg.duration >= 1800 && leg.duration <= 40000)
      assert.equal(leg.facing, Math.sign(leg.end.x - position.x) || 1)
      for (const point of leg.points) {
        check(point)
        if (point.attached) for (const fraction of [.25, .5, .75]) check({ ...point, angle: point.angle * fraction })
      }
      if (!leg.airVisit && !position.attached && !leg.end.attached) for (const point of leg.points) assert.ok(point.y >= plan.swimBounds.top && point.y <= plan.swimBounds.bottom, `${item.id}: preferred level`)
      position = leg.end
    }
  }
})

test('surface, middle and bottom levels are distinct and fish keep roaming', () => {
  const ids = ['epiplatys-annulatus', 'neon-tetra', 'corydoras-panda']
  const bands = ids.map(id => fishSwimPlan(fish(id), SIZES[1], id).swimBounds)
  assert.ok(bands[0].bottom < bands[1].top && bands[1].bottom < bands[2].top)
  for (const id of [...ids, 'badis-badis', 'kryptopterus-vitreolus']) {
    const plan = fishSwimPlan(fish(id), SIZES[1], id)
    let position = plan.start
    const visited = [position]
    for (let step = 0; step < 48; step++) { position = plan.leg(position, step).end; visited.push(position) }
    assert.ok(Math.max(...visited.map(p => p.x)) - Math.min(...visited.map(p => p.x)) > (plan.bounds.right - plan.bounds.left) * .65, `${id}: roaming`)
    assert.equal(new Set(visited.map(p => `${p.x},${p.y}`)).size, visited.length)
  }
})

test('air-breathing fish visit the surface and return to their usual level', () => {
  for (const id of ['betta', 'trichogaster-chuna', 'corydoras-panda', 'corydoras-pygmaeus']) {
    const plan = fishSwimPlan(fish(id), SIZES[1], id)
    let position = plan.start, visits = 0
    for (let step = 0; step < 32; step++) {
      const leg = plan.leg(position, step)
      if (leg.airVisit) {
        visits++
        assert.equal(leg.points[1].y, plan.bounds.top)
        assert.ok(leg.points[2].offset - leg.points[1].offset < .05, 'brief surface stop')
      }
      assert.ok(leg.end.y >= plan.swimBounds.top && leg.end.y <= plan.swimBounds.bottom)
      position = leg.end
    }
    assert.ok(visits > 0 && visits < 12)
  }
})

test('surface dwellers use actual compatible surfaces, pause and leave them', () => {
  for (const size of SIZES) for (const scape of SCAPES) for (const item of CATALOG.fish.filter(item => ['cling', 'shelter', 'browse'].includes(fishHabit(item).mode))) {
    const plan = fishSwimPlan(item, size, `${item.id}-0`, scape)
    assert.ok(plan.sites.length, `${item.id}/${size.id}/${scape.id}: sites`)
    const physicalSites = fishHabitatSites(scape, size, plan.habit.materials)
    let position = plan.start, rests = 0, swims = 0
    const visited = new Set()
    for (let step = 0; step < 16; step++) {
      const leg = plan.leg(position, step)
      if (leg.end.attached) {
        rests++
        assert.ok(physicalSites.some(site => site.x === leg.end.x && site.y === leg.end.y && site.material === leg.end.material))
        assert.ok(leg.dwellDuration >= (plan.habit.mode === 'browse' ? 1500 : 7000))
        visited.add(`${leg.end.x},${leg.end.y}`)
      } else swims++
      position = leg.end
    }
    assert.ok(rests && swims && visited.size >= 2, `${item.id}/${size.id}/${scape.id}: surface changes`)
    if (plan.habit.id === 'rockGrazer') assert.ok(plan.sites.every(site => ['stone', 'glass'].includes(site.material)))
  }
})

test('copies have independent routes; rerenders retain a deterministic route', () => {
  const item = fish('neon-tetra'), size = SIZES[0]
  const plans = Array.from({ length: 24 }, (_, i) => fishSwimPlan(item, size, `${item.id}-${i}`))
  assert.equal(new Set(plans.map(plan => JSON.stringify(plan.leg(plan.start, 0)))).size, plans.length)
  assert.ok(Math.max(...plans.map(p => p.start.x)) - Math.min(...plans.map(p => p.start.x)) > 40)
  const repeat = fishSwimPlan(item, size, `${item.id}-0`)
  assert.deepEqual(plans[0].leg(plans[0].start, 8), repeat.leg(repeat.start, 8))
})
