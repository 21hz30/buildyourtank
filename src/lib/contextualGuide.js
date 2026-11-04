export const CONTEXTUAL_GUIDE_SEEN_KEY = 'buildyourtank:contextual-guide:seen:v1'

const step = (id, route, target, title, text, nextAction) => ({
  id,
  route,
  target,
  title,
  text,
  nextAction,
})

// Every step points at a real page area. The guide explains the next action
// without performing purchases, care tasks, or navigation on the user's behalf.
// Keep this order aligned with src/content/guide.json and docs/demo-script.md:
// the script is the editable narration, while this list is the interactive
// version of the same walkthrough.
export const CONTEXTUAL_GUIDE = [
  step('workspace', 'my-tanks', 'collection', 'Meet your workspace', 'My tanks keeps your saved aquariums, their room view and daily care in one place. Your next step is to open Tank idea for a starting point, then return here when you are ready to build.', 'Open Tank idea to find a starting idea.'),
  step('inspiration', 'ideas', 'ideas', 'Find a starting idea', 'Tank idea is a gallery of example aquariums with visible inhabitants, water status and setup choices. Your next step is to open a tank card and inspect it before creating your own.', 'Open a tank card for inspiration.'),
  step('create', 'my-tanks', 'new-tank', 'Create a tank of your own', 'New tank starts an empty world with its own name, size, glass and room styling. Your next step is to open the form and compare 60cm, 120cm and 150cm against the same furniture.', 'Choose New tank to open the creation form.'),
  step('setup', 'my-tanks', 'setup', 'Build the habitat first', 'Edit setup changes the selected tank’s size, glass, substrate and filtration. Your next step is to open it and review the habitat choices before adding inhabitants.', 'Open Edit setup to review the habitat fields.'),
  step('learn', 'learn', 'learn-search', 'Learn before you choose', 'Learn is the aquarium encyclopedia for fish, plants, equipment and care supplies. Your next step is to search for a species and open its field guide.', 'Search the encyclopedia for a fish or plant.'),
  step('stock', 'store', 'store', 'Bring your world to life', 'Fish store adds fish and plants to the selected tank, while care supplies go into the shared bag. Your next step is to check Shopping for, then open a product or category.', 'Check Shopping for, then choose a store category or product.'),
  step('observe', 'my-tanks', 'observe', 'Take a closer look', 'Observe tank opens a close-up view where you can zoom from 75% to 250% and scroll around the aquarium. Your next step is to use the observe control when you want more detail.', 'Choose Observe tank, then try zoom in or zoom out.'),
  step('water', 'my-tanks', 'water', 'Understand the water', 'Water & nutrients shows pH, temperature, hardness, four separate plant nutrients and CO₂. Raising a plant nutrient uses a purchased matching demo dose; these levels are not water tests. Explore a water slider, then return it to your preferred value.', 'Explore a water slider and read its status.'),
  step('resources', 'my-tanks', 'resources', 'Prepare for daily care', 'The resource bar and My bag show shared coins, food portions, water refills and four separate liquid fertilizers across every tank. Open My bag, then restock the nutrient you need in Fish store.', 'Open My bag to review your shared supplies.'),
  step('care', 'my-tanks', 'care', 'Practice a small daily routine', 'Daily care turns small actions into a healthier demo ecosystem: feed fish, change water and care for plants each use a resource and can earn coins. Your next step is to choose a task that is due.', 'Choose Feed fish, Change water or Care for plants.'),
  step('preview', 'my-tanks', 'preview', 'Look ahead and reflect', '30 days later is a simplified estimate of water balance, greenery and room to breathe. Your next step is to open the preview and use it to review your habitat choices.', 'Open 30 days later to review the estimate.'),
  step('share', 'my-tanks', 'share', 'Keep it and pass it on', 'Save tank confirms the browser-local workspace, and Share tank creates a read-only snapshot link. Your next step is to save after a change, then share when you want feedback.', 'Save tank first, then open Share tank.'),
]

export function getGuide() {
  return CONTEXTUAL_GUIDE
}

export function getCurrentPageGuide(route) {
  return CONTEXTUAL_GUIDE.filter(item => item.route === route)
}

export function hasSeenGuide(storage) {
  try { return storage.getItem(CONTEXTUAL_GUIDE_SEEN_KEY) === '1' } catch { return false }
}

export function markGuideSeen(storage) {
  try { storage.setItem(CONTEXTUAL_GUIDE_SEEN_KEY, '1'); return true } catch { return false }
}
