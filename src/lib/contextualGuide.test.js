import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { CONTEXTUAL_GUIDE, getCurrentPageGuide, getGuide, hasSeenGuide, markGuideSeen } from './contextualGuide.js'

const editableScriptGuide = JSON.parse(readFileSync(new URL('../content/guide.json', import.meta.url), 'utf8'))

test('the workspace guide is one actionable walkthrough with contextual steps', () => {
  assert.equal(getGuide(), CONTEXTUAL_GUIDE)
  assert.equal(CONTEXTUAL_GUIDE.length, 12)
  assert.deepEqual(CONTEXTUAL_GUIDE.map(step => step.id), editableScriptGuide.steps.map(step => step.id))
  for (const step of CONTEXTUAL_GUIDE) {
    assert.match(step.route, /^(my-tanks|ideas|store|learn)$/)
    assert.ok(step.target && step.title && step.text && step.nextAction)
  }
})

test('current page help stays scoped to the active route', () => {
  const myTanks = getCurrentPageGuide('my-tanks')
  const ideas = getCurrentPageGuide('ideas')
  assert.ok(myTanks.length > 0)
  assert.ok(ideas.length > 0)
  assert.ok(myTanks.every(step => step.route === 'my-tanks'))
  assert.ok(ideas.every(step => step.route === 'ideas'))
})

test('first guide state uses one browser-local guest marker', () => {
  const data = new Map()
  const storage = { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) }
  assert.equal(hasSeenGuide(storage), false)
  assert.equal(markGuideSeen(storage), true)
  assert.equal(hasSeenGuide(storage), true)
})
