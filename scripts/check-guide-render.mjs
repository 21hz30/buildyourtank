// A static render smoke check. This does not launch or automate a browser.
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createServer } from 'vite'
import { fileURLToPath } from 'node:url'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { GUIDE_CONFIG_KEY, GUIDE_PROGRESS_KEY } from '../src/lib/guide.js'

const guide = JSON.parse(await readFile(new URL('../src/content/guide.json', import.meta.url), 'utf8'))
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', configFile: fileURLToPath(new URL('../vite.config.js', import.meta.url)) })
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const { GuideEditor, GuideWelcome } = await server.ssrLoadModule('/src/components/Guide.jsx')
  const noop = () => {}
  const render = (Component, props) => renderToStaticMarkup(createElement(Component, props))
  const progress = { version: 1, status: 'active', stepId: 'workspace', reviewed: [] }
  const records = new Map([[GUIDE_CONFIG_KEY, JSON.stringify(guide)], [GUIDE_PROGRESS_KEY, JSON.stringify(progress)]])
  globalThis.window = { location: { hash: '#/my-tanks', href: 'http://localhost/' }, localStorage: { getItem: key => records.get(key) || null } }
  for (const route of ['my-tanks', 'ideas', 'store', 'learn']) {
    window.location.hash = `#/${route}`
    const html = render(App)
    assert.ok(html.includes('aria-label="First tank guide"'), `Guide missing on ${route}`)
    assert.ok(html.includes('Edit guide &amp; script'))
    assert.ok(html.includes('guide-step'))
  }
  for (const route of ['home', 'login', 'shared']) {
    window.location.hash = `#/${route}`
    assert.ok(!render(App).includes('aria-label="First tank guide"'), `Guide leaked onto ${route}`)
  }
  records.set(GUIDE_PROGRESS_KEY, JSON.stringify({ ...progress, status: 'paused' }))
  window.location.hash = '#/my-tanks'
  assert.ok(!render(App).includes('aria-label="First tank guide"'))
  const welcome = render(GuideWelcome, { guide, progress: { ...progress, status: 'new' }, onStart: noop, onClose: noop, onEdit: noop })
  assert.ok(welcome.includes('Start my guide'))
  assert.ok(welcome.includes('Edit guide &amp; demo script'))
  const editor = render(GuideEditor, { guide, defaults: guide, onSave: noop, onClose: noop })
  assert.ok(editor.includes('Move Meet your workspace down'))
  assert.ok(editor.includes('English demo narration'))
  assert.ok(editor.includes('Export script'))
  assert.ok(editor.includes('Export JSON'))
  assert.ok(editor.includes('Recording notes / 录制说明'))
  console.log('Static rendering passed: four workspace routes, three public routes, pause, welcome and editor.')
} finally {
  delete globalThis.window
  await server.close()
}
