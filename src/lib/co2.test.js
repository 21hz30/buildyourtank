import assert from 'node:assert/strict'
import { test } from 'node:test'
import { CABINET_BODY_HEIGHT_PERCENT, CO2_ROOM_GEOMETRY, co2CylinderGeometry, co2Level } from './co2.js'
import { SIZES, createTank, getHealth, normalizeTank, readSnapshot, simulate, snapshotLink } from './tank.js'

test('CO₂ starts off, persists per tank, and survives a shared snapshot', () => {
  const original = createTank()
  assert.equal(co2Level(original), 0)
  const tank = { ...original, water: { ...original.water, co2: 5 } }
  assert.equal(normalizeTank(tank).water.co2, 5)
  const url = snapshotLink(tank, 'https://example.com/')
  assert.equal(readSnapshot(url.slice(url.indexOf('#'))).tank.water.co2, 5)
  assert.equal(normalizeTank({ ...tank, water: { ...tank.water, co2: 100 } }).water.co2, 0)
  assert.equal(normalizeTank({ ...tank, water: { ...tank.water, co2: -1 } }).water.co2, 0)
  assert.equal(normalizeTank({ ...tank, water: { temperature: 25 } }).water.co2, 0)
})

test('larger aquariums use larger cylinders without exceeding cabinet height', () => {
  const heights = SIZES.map(size => co2CylinderGeometry(size.id).heightPercent)
  assert.deepEqual(Object.keys(CO2_ROOM_GEOMETRY).sort(), SIZES.map(size => size.id).sort())
  assert.ok(heights[0] < heights[1] && heights[1] < heights[2])
  assert.ok(heights.every(height => height <= CABINET_BODY_HEIGHT_PERCENT))
})

test('the demo preview recognizes added CO₂ and warns at the highest setting', () => {
  const tank = createTank()
  const moderate = { ...tank, water: { ...tank.water, co2: 5 } }
  const high = { ...tank, water: { ...tank.water, co2: 9 } }
  assert.match(simulate(moderate).growth, /CO₂/)
  assert.ok(getHealth(high).warnings.some(warning => warning.includes('CO₂')))
  assert.equal(co2Level(high), 9)
})
