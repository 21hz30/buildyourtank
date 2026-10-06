import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { GUIDE_CONFIG_KEY, GUIDE_DESTINATIONS, GUIDE_PROGRESS_KEY, advanceGuide, guideDuration, guideScript, loadGuide, moveGuideStep, normalizeGuideProgress, validateGuide } from './guide.js'
import { activeTank, addTank, buySupply, careForWorkspace, checkIn, createWorkspace, fertilize, purchaseItem, purchaseSetup } from './workspace.js'
import { createTank, readSnapshot, snapshotLink } from './tank.js'

const defaults = JSON.parse(readFileSync(new URL('../content/guide.json', import.meta.url), 'utf8'))

test('the bundled guide covers every supported feature destination and a 3–4 minute demo', () => {
  assert.deepEqual(validateGuide(defaults).guide, defaults)
  assert.deepEqual(new Set(defaults.steps.map(step => step.destination)), new Set(Object.keys(GUIDE_DESTINATIONS)))
  assert.ok(guideDuration(defaults) >= 180 && guideDuration(defaults) <= 240)
  // Keep narration feasible at a comfortable pace with some room for demonstrations.
  const wordCount = [defaults.introduction, ...defaults.steps.map(step => step.narration), defaults.closing].join(' ').split(/\s+/).length
  assert.ok(wordCount <= guideDuration(defaults) * 2)
})

test('import rejects duplicate IDs, unsupported destinations, empty instructions and invalid durations', () => {
  for (const mutate of [
    guide => { guide.steps[1].id = guide.steps[0].id },
    guide => { guide.steps[0].destination = '__proto__' },
    guide => { guide.steps[0].destination = 'home' },
    guide => { guide.steps[0].instructions = [''] },
    guide => { guide.steps[0].seconds = -1 },
    guide => { guide.steps[0].seconds = 1.5 },
    guide => { guide.steps = [] },
    guide => { guide.version = 2 },
  ]) {
    const invalid = structuredClone(defaults)
    mutate(invalid)
    assert.ok(validateGuide(invalid).error)
    assert.equal(validateGuide(invalid).guide, undefined)
  }
})

test('storage restores valid edits and progress, while blocked or corrupt storage preserves defaults', () => {
  const edited = { ...defaults, title: 'My recording guide' }
  const savedProgress = { version: 1, status: 'active', stepId: 'stock', reviewed: ['workspace', 'workspace', 'unknown'] }
  const storage = { getItem(key) { return JSON.stringify(key === GUIDE_CONFIG_KEY ? edited : key === GUIDE_PROGRESS_KEY ? savedProgress : null) } }
  const restored = loadGuide(storage, defaults)
  assert.equal(restored.guide.title, edited.title)
  assert.deepEqual(restored.progress, { version: 1, status: 'active', stepId: 'stock', reviewed: ['workspace'] })
  for (const broken of [{ getItem() { throw new Error('blocked') } }, { getItem() { return '{' } }, { getItem() { return JSON.stringify({ version: 999 }) } }]) {
    assert.deepEqual(loadGuide(broken, defaults), { guide: defaults, progress: normalizeGuideProgress(null, defaults) })
  }
})

test('reordering preserves the current step by ID, changes export order and leaves the source intact', () => {
  const before = structuredClone(defaults)
  const reordered = moveGuideStep(defaults, 'learn', -1)
  const progress = normalizeGuideProgress({ status: 'active', stepId: 'learn', reviewed: ['workspace'] }, reordered)
  assert.equal(progress.stepId, 'learn')
  assert.equal(reordered.steps[3].id, 'learn')
  assert.ok(guideScript(reordered).indexOf('## 4. Learn before you choose') < guideScript(reordered).indexOf('## 5. Build the habitat first'))
  assert.deepEqual(defaults, before)
  assert.equal(moveGuideStep(defaults, 'workspace', -1), defaults)
})

test('jumping to the last step reviews only that step and returns to unread material before completing', () => {
  let progress = { version: 1, status: 'active', stepId: 'share', reviewed: [] }
  progress = advanceGuide(progress, defaults)
  assert.equal(progress.status, 'active')
  assert.equal(progress.stepId, 'workspace')
  assert.deepEqual(progress.reviewed, ['share'])
  for (let i = 0; i < defaults.steps.length; i++) progress = advanceGuide(progress, defaults)
  assert.equal(progress.status, 'completed')
  assert.equal(progress.reviewed.length, defaults.steps.length)
  assert.equal(new Set(progress.reviewed).size, defaults.steps.length)
})

test('removed and newly added IDs reconcile progress without losing a saved guide', () => {
  const completed = { status: 'completed', stepId: 'share', reviewed: defaults.steps.map(step => step.id) }
  const expanded = { ...defaults, steps: [...defaults.steps, { ...defaults.steps[0], id: 'followup' }] }
  const result = normalizeGuideProgress(completed, expanded)
  assert.equal(result.status, 'paused')
  assert.equal(result.reviewed.length, defaults.steps.length)
  const trimmed = { ...defaults, steps: defaults.steps.slice(0, 2) }
  assert.equal(normalizeGuideProgress(completed, trimmed).stepId, 'workspace')
  assert.deepEqual(normalizeGuideProgress(completed, trimmed).reviewed, ['workspace', 'inspiration'])
})

test('export includes edited narration, filming notes, instructions and cumulative timecodes', () => {
  const edited = structuredClone(defaults)
  edited.steps[0].narration = 'My revised narration.'
  edited.steps[0].recording = '自定义镜头。'
  edited.steps[0].seconds = 20
  const script = guideScript(edited)
  assert.ok(script.includes('My revised narration.'))
  assert.ok(script.includes('自定义镜头。'))
  assert.ok(script.includes('(0:15–0:35)'))
  assert.ok(script.includes('## 2. Find a starting idea (0:35–0:51)'))
  assert.ok(script.includes('点击 Next step 仅记录已阅读'))
  assert.ok(script.includes('## 结尾 (3:43–4:03)'))
})

test('the recorded Quiet Garden scenario fits the real demo budget and supports all three care actions', () => {
  let workspace = createWorkspace()
  const original = structuredClone(activeTank(workspace))
  function accept(result) {
    assert.equal(result.error, undefined)
    workspace = result.workspace
  }
  accept(addTank(workspace, { ...createTank(), name: 'Quiet Garden', size: '60p', glass: 'regular', fish: {}, plants: {} }))
  accept(purchaseSetup(workspace, 'sand', 'soil'))
  accept(purchaseItem(workspace, 'fish', 'betta'))
  accept(purchaseItem(workspace, 'plants', 'anubias'))
  accept(purchaseItem(workspace, 'plants', 'fern'))
  accept(checkIn(workspace, '2026-10-06'))
  accept(buySupply(workspace, 'food'))
  accept(careForWorkspace(workspace, 'feed', '2026-10-06'))
  accept(careForWorkspace(workspace, 'water', '2026-10-06'))
  accept(fertilize(workspace, '2026-10-06'))
  assert.ok(workspace.coins > 0)
  assert.equal(activeTank(workspace).name, 'Quiet Garden')
  assert.equal(activeTank(workspace).fish.betta, 1)
  assert.deepEqual(workspace.tanks[0], original)
  assert.deepEqual(activeTank(workspace).care, { feed: '2026-10-06', water: '2026-10-06', fertilizer: '2026-10-06' })
  const snapshot = new URL(snapshotLink(activeTank(workspace), 'https://example.test/')).hash
  assert.equal(readSnapshot(snapshot).tank.name, 'Quiet Garden')
})
