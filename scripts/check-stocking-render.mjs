import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { CATALOG, createTank } from '../src/lib/tank.js'
import { createWorkspace } from '../src/lib/workspace.js'

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { StorePage } = await server.ssrLoadModule('/src/components/Pages.jsx')
  const { SpeciesDialog } = await server.ssrLoadModule('/src/components/WorkspaceDialogs.jsx')
  const { default: Catalog } = await server.ssrLoadModule('/src/components/Catalog.jsx')
  const noop = () => {}
  const render = (Component, props) => renderToStaticMarkup(createElement(Component, props))
  const button = (html, label) => {
    const tag = html.match(/<button\b[^>]*>/g)?.find(tag => tag.includes(`aria-label="${label}"`))
    assert.ok(tag, `Missing ${label} button`)
    return tag
  }
  const tank = { ...createTank(), fish: { tetra: 60, angelfish: 20 }, plants: { anubias: 45 } }
  const store = render(StorePage, { workspace: createWorkspace(tank), onSelect: noop, onItem: noop, onSetup: noop, onSupply: noop, onDetails: noop })
  for (const label of ['Add Angelfish', 'Add Congo tetra', 'Remove Congo tetra']) assert.ok(!button(store, label).includes('disabled'))
  assert.ok(!store.includes('per species'))
  assert.ok(!store.includes('stocking-fish'))

  for (const type of ['fish', 'plants']) {
    const item = CATALOG[type].find(item => item.id === (type === 'fish' ? 'angelfish' : 'anubias'))
    const dialog = render(SpeciesDialog, { item: { ...item, type }, onAdd: noop, onClose: noop })
    assert.match(dialog, /<button class="primary-button dialog-cta"[^>]*>Add to my tank/)
    assert.ok(!dialog.includes('disabled'))
    const catalog = render(Catalog, { tank, tab: type, onTab: noop, onItem: noop, onSetup: noop })
    assert.ok(!button(catalog, `Add ${item.name}`).includes('disabled'))
    const readOnly = render(Catalog, { tank, tab: type, onTab: noop, onItem: noop, onSetup: noop, readOnly: true })
    assert.ok(button(readOnly, `Add ${item.name}`).includes('disabled=""'))
  }
  console.log('Unlimited stocking UI passed: additions stay enabled above former limits in the store, catalog and fish/plant dialogs.')
} finally {
  await server.close()
}
