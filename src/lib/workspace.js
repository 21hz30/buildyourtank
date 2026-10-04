import { CATALOG, FILTERS, GLASS, SANDS, SIZES, createTank, getHealth, loadTank, normalizeTank, remainingCoins, tankCost, today } from './tank.js'

export const WORKSPACE_KEY = 'buildyourtank:workspace:v2'
export const CHECK_IN_REWARD = 20
export const SUPPLIES = [
  { id: 'food', name: 'Everyday fish food', description: 'Five small portions for five feeding days.', amount: 5, price: 8, icon: 'food', unit: 'portions' },
  { id: 'water', name: 'Water care kit', description: 'Three refills for a little fresh-water routine.', amount: 3, price: 10, icon: 'droplet', unit: 'refills' },
  { id: 'fertilizer', name: 'Seachem Flourish Potassium', description: 'Three plant-care doses for a greener little world.', amount: 3, price: 6, icon: 'leaf', unit: 'doses' },
]
export function newId() { return globalThis.crypto?.randomUUID?.() || `tank-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }
export function createWorkspace(tank = createTank()) {
  const first = { ...tank, id: newId() }
  return { version: 2, tanks: [first], activeId: first.id, coins: remainingCoins(tank), resources: { food: 5, water: 3, fertilizer: 2 }, checkIn: { date: null, streak: 0 }, completedLessons: [] }
}
export function normalizeWorkspace(value) {
  if (value?.version !== 2 || !Array.isArray(value.tanks) || !value.tanks.length || value.tanks.length > 8) return null
  if (!Number.isInteger(value.coins) || value.coins < 0 || value.coins > 1000000) return null
  const tanks = value.tanks.map(input => {
    const tank = normalizeTank({ ...input, earned: 10000 })
    if (!tank || typeof input.id !== 'string' || !input.id || input.id.length > 100) return null
    return { ...tank, id: input.id, earned: Math.max(0, tankCost(tank) - 100) }
  })
  if (tanks.some(tank => !tank) || new Set(tanks.map(t => t.id)).size !== tanks.length) return null
  const resources = {}
  for (const key of ['food', 'water']) {
    if (!Number.isInteger(value.resources?.[key]) || value.resources[key] < 0 || value.resources[key] > 100000) return null
    resources[key] = value.resources[key]
  }
  resources.fertilizer = Number.isInteger(value.resources?.fertilizer) && value.resources.fertilizer >= 0 && value.resources.fertilizer <= 100000 ? value.resources.fertilizer : 0
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value.checkIn?.date) ? value.checkIn.date : null
  return { version: 2, tanks, activeId: tanks.some(t => t.id === value.activeId) ? value.activeId : tanks[0].id, coins: value.coins, resources, checkIn: { date, streak: Number.isInteger(value.checkIn?.streak) ? Math.max(0, Math.min(100000, value.checkIn.streak)) : 0 }, completedLessons: Array.isArray(value.completedLessons) ? [...new Set(value.completedLessons.filter(id => typeof id === 'string' && id.length < 60))].slice(0, 100) : [] }
}
export function loadWorkspace(storage) {
  try {
    const restored = normalizeWorkspace(JSON.parse(storage.getItem(WORKSPACE_KEY)))
    if (restored) return restored
    return createWorkspace(loadTank(storage))
  } catch {
    try { return createWorkspace(loadTank(storage)) } catch { return createWorkspace() }
  }
}
export function activeTank(workspace) { return workspace.tanks.find(tank => tank.id === workspace.activeId) || workspace.tanks[0] }
export function replaceTank(workspace, tank) {
  const next = { ...tank, earned: Math.max(0, tankCost(tank) - 100) }
  return { ...workspace, tanks: workspace.tanks.map(item => item.id === next.id ? next : item) }
}
export function purchaseItem(workspace, type, id, delta = 1) {
  const item = CATALOG[type]?.find(item => item.id === id)
  if (!item || ![-1, 1].includes(delta)) return { error: 'Choose a store item.' }
  const tank = activeTank(workspace)
  const count = (tank[type][id] || 0) + delta
  if (count < 0 || count > (type === 'fish' ? 12 : 6)) return { error: `The demo limit for ${item.name.toLowerCase()} has been reached.` }
  if (delta > 0 && workspace.coins < item.price) return { error: 'Not enough coins yet. Collect your daily check-in or complete a care task.' }
  const next = replaceTank(workspace, { ...tank, [type]: { ...tank[type], [id]: count } })
  return { workspace: { ...next, coins: next.coins - item.price * delta } }
}
export function purchaseSetup(workspace, field, id) {
  const options = field === 'size' ? SIZES : field === 'filter' ? FILTERS : field === 'sand' ? SANDS : field === 'glass' ? GLASS : []
  const item = options.find(item => item.id === id)
  const tank = activeTank(workspace)
  if (!item) return { error: 'Choose an available setup.' }
  const previous = options.find(item => item.id === tank[field])
  const difference = item.price - previous.price
  if (difference > workspace.coins) return { error: 'This upgrade needs more coins. Try your daily check-in.' }
  return { workspace: { ...replaceTank(workspace, { ...tank, [field]: id }), coins: workspace.coins - difference } }
}
export function buySupply(workspace, id) {
  const item = SUPPLIES.find(item => item.id === id)
  if (!item) return { error: 'Choose a care supply.' }
  if (workspace.coins < item.price) return { error: 'Not enough coins for this pack. Try your daily check-in.' }
  return { workspace: { ...workspace, coins: workspace.coins - item.price, resources: { ...workspace.resources, [id]: workspace.resources[id] + item.amount } } }
}
export function checkIn(workspace, day = today()) {
  if (workspace.checkIn.date === day) return { error: 'You have already checked in today. See you tomorrow!' }
  const previous = new Date(`${day}T12:00:00Z`)
  previous.setUTCDate(previous.getUTCDate() - 1)
  const streak = workspace.checkIn.date === previous.toISOString().slice(0, 10) ? workspace.checkIn.streak + 1 : 1
  return { workspace: { ...workspace, coins: workspace.coins + CHECK_IN_REWARD, checkIn: { date: day, streak } }, reward: CHECK_IN_REWARD }
}
export function careForWorkspace(workspace, action, day = today()) {
  if (!['feed', 'water'].includes(action)) return { error: 'Choose a care action.' }
  const tank = activeTank(workspace)
  if (tank.care[action] === day) return { error: 'This tank has already had that care today.' }
  if (action === 'feed' && getHealth(tank).fishCount === 0) return { error: 'Add a swimmer before feeding time.' }
  const resource = action === 'feed' ? 'food' : 'water'
  if (workspace.resources[resource] <= 0) return { error: `You need more ${resource === 'food' ? 'fish food' : 'water care refills'}. Visit Fish store to restock.` }
  const reward = action === 'feed' ? 5 : 8
  const next = replaceTank(workspace, { ...tank, care: { ...tank.care, [action]: day } })
  return { workspace: { ...next, coins: next.coins + reward, resources: { ...workspace.resources, [resource]: workspace.resources[resource] - 1 } }, reward }
}
export function addTank(workspace, input) {
  if (workspace.tanks.length >= 8) return { error: 'Your demo room has space for up to eight tanks.' }
  const clean = normalizeTank({ ...input, earned: 10000 })
  if (!clean) return { error: 'This tank configuration could not be opened.' }
  const cost = tankCost(clean)
  if (cost > workspace.coins) return { error: `This tank needs ${cost} coins. You have ${workspace.coins}. Try your daily check-in.` }
  const tank = { ...clean, id: newId(), isPublic: false, earned: Math.max(0, cost - 100), care: {}, savedAt: null }
  return { workspace: { ...workspace, tanks: [...workspace.tanks, tank], activeId: tank.id, coins: workspace.coins - cost } }
}

export function fertilize(workspace, day = today()) {
  const tank = activeTank(workspace)
  if (getHealth(tank).plantCount === 0) return { error: 'Add a plant before using fertilizer.' }
  if (tank.care.fertilizer === day) return { error: 'Your plants have already had a dose today.' }
  if (!workspace.resources.fertilizer) return { error: 'Visit Fish store for a fertilizer refill.' }
  const next = replaceTank(workspace, { ...tank, water: { ...tank.water, nutrients: Math.min(10, tank.water.nutrients + 1) }, care: { ...tank.care, fertilizer: day } })
  return { workspace: { ...next, resources: { ...workspace.resources, fertilizer: workspace.resources.fertilizer - 1 } } }
}
