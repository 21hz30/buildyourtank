export const GUIDE_CONFIG_KEY = 'buildyourtank:guide:config:v1'
export const GUIDE_PROGRESS_KEY = 'buildyourtank:guide:progress:v1'

// Content is editable; destinations stay tied to real, supported application actions.
export const GUIDE_DESTINATIONS = {
  workspace: { label: 'My tanks', route: 'my-tanks', target: 'collection' },
  ideas: { label: 'Explore Tank idea', route: 'ideas', target: 'ideas' },
  create: { label: 'Open New tank', route: 'my-tanks', target: 'new-tank', dialog: 'create' },
  setup: { label: 'Open Edit setup', route: 'my-tanks', target: 'setup', dialog: 'setup' },
  learn: { label: 'Explore Learn', route: 'learn', target: 'learn-search' },
  store: { label: 'Visit Fish store', route: 'store', target: 'store' },
  observe: { label: 'Observe tank', route: 'my-tanks', target: 'observe', dialog: 'observe' },
  water: { label: 'Find water settings', route: 'my-tanks', target: 'water' },
  bag: { label: 'Open My bag', route: 'my-tanks', target: 'resources', dialog: 'resources' },
  care: { label: 'Find daily care', route: 'my-tanks', target: 'care' },
  preview: { label: 'Open 30-day preview', route: 'my-tanks', target: 'preview', dialog: 'preview' },
  share: { label: 'Open Share tank', route: 'my-tanks', target: 'share', dialog: 'share' },
}

const validText = (value, max = 3000) => typeof value === 'string' && value.trim().length > 0 && value.length <= max
const validSeconds = value => Number.isInteger(value) && value >= 5 && value <= 180

export function validateGuide(value) {
  if (value?.version !== 1) return { error: 'Use a version 1 guide configuration.' }
  if (!validText(value.title, 100) || !validText(value.introduction) || !validText(value.closing)) return { error: 'Add a title, opening narration and closing narration.' }
  if (!validSeconds(value.introSeconds) || !validSeconds(value.outroSeconds)) return { error: 'Opening and closing durations must be 5–180 whole seconds.' }
  if (!Array.isArray(value.steps) || !value.steps.length || value.steps.length > 24) return { error: 'Include 1–24 guide steps.' }
  const ids = new Set()
  const steps = []
  for (const step of value.steps) {
    if (!step || !/^[a-z][a-z0-9-]{0,59}$/.test(step.id) || ids.has(step.id)) return { error: 'Each step needs a unique lowercase ID.' }
    ids.add(step.id)
    if (!Object.hasOwn(GUIDE_DESTINATIONS, step.destination)) return { error: `Choose an available destination for ${step.id}.` }
    if (!validText(step.title, 100) || !validText(step.summary, 500) || !validText(step.narration) || !validText(step.recording)) return { error: `Fill in the title, summary, narration and recording notes for ${step.id}.` }
    if (!Array.isArray(step.instructions) || !step.instructions.length || step.instructions.length > 8 || step.instructions.some(line => !validText(line, 1000))) return { error: `Add 1–8 nonempty instructions for ${step.id}.` }
    if (!validSeconds(step.seconds)) return { error: `Duration for ${step.id} must be 5–180 whole seconds.` }
    steps.push({ id: step.id, destination: step.destination, title: step.title.trim(), summary: step.summary.trim(), instructions: step.instructions.map(line => line.trim()), narration: step.narration.trim(), recording: step.recording.trim(), seconds: step.seconds })
  }
  return { guide: { version: 1, title: value.title.trim(), introduction: value.introduction.trim(), closing: value.closing.trim(), introSeconds: value.introSeconds, outroSeconds: value.outroSeconds, steps } }
}

export function normalizeGuideProgress(value, guide) {
  const ids = guide.steps.map(step => step.id)
  const reviewed = [...new Set(Array.isArray(value?.reviewed) ? value.reviewed.filter(id => ids.includes(id)) : [])]
  let status = ['active', 'paused', 'completed'].includes(value?.status) ? value.status : 'new'
  // Imported or expanded guides can contain new material after a previous completion.
  if (status === 'completed' && reviewed.length !== ids.length) status = 'paused'
  return { version: 1, status, stepId: ids.includes(value?.stepId) ? value.stepId : ids.find(id => !reviewed.includes(id)) || ids[0], reviewed }
}

export function loadGuide(storage, fallback) {
  let guide = fallback
  let progress
  try { guide = validateGuide(JSON.parse(storage.getItem(GUIDE_CONFIG_KEY))).guide || fallback } catch { /* Use the bundled guide. */ }
  try { progress = JSON.parse(storage.getItem(GUIDE_PROGRESS_KEY)) } catch { /* Start a new guide. */ }
  return { guide, progress: normalizeGuideProgress(progress, guide) }
}

export function advanceGuide(progress, guide) {
  const index = guide.steps.findIndex(step => step.id === progress.stepId)
  const reviewed = [...new Set([...progress.reviewed, guide.steps[Math.max(0, index)].id])]
  const next = guide.steps[index + 1] || guide.steps.find(step => !reviewed.includes(step.id))
  return { version: 1, status: next ? 'active' : 'completed', stepId: next?.id || progress.stepId, reviewed }
}

export function moveGuideStep(guide, id, offset) {
  const index = guide.steps.findIndex(step => step.id === id)
  const destination = index + offset
  if (index < 0 || destination < 0 || destination >= guide.steps.length) return guide
  const steps = [...guide.steps]
  ;[steps[index], steps[destination]] = [steps[destination], steps[index]]
  return { ...guide, steps }
}

export function guideDuration(guide) { return guide.introSeconds + guide.outroSeconds + guide.steps.reduce((sum, step) => sum + step.seconds, 0) }
const timecode = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

export function guideScript(guide) {
  let elapsed = guide.introSeconds
  const scenes = guide.steps.map((step, index) => {
    const start = elapsed
    elapsed += step.seconds
    const destination = GUIDE_DESTINATIONS[step.destination]
    const spotlight = destination.target ? `\n\n引导定位：\`${destination.route}\` · [data-guide="${destination.target}"]` : ''
    return `## ${index + 1}. ${step.title} (${timecode(start)}–${timecode(elapsed)})\n\n页面 / 操作：${destination.label}${spotlight}\n\n新手指引：${step.summary}\n\n${step.instructions.map(line => `- ${line}`).join('\n')}\n\n英文旁白：\n\n${step.narration}\n\n录制说明：\n\n${step.recording}`
  })
  return `# Build Your Tank — demo script\n\n${guide.title} · 预计 ${timecode(guideDuration(guide))} · 英文旁白 / 中文录制说明\n\n时间为镜头规划，可根据实际语速调整。点击 Next step 仅记录已阅读，不验证任务是否实际完成；购买和照料需要手动操作。\n\n## 开场 (0:00–${timecode(guide.introSeconds)})\n\n${guide.introduction}\n\n${scenes.join('\n\n')}\n\n## 结尾 (${timecode(elapsed)}–${timecode(guideDuration(guide))})\n\n${guide.closing}\n`
}
