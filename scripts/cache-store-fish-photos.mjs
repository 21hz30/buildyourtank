// Download original Green Aqua product photos without modifying their pixels.
// Separate store assets preserve the aquarium models and existing photo credits.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { CATALOG } from '../src/lib/tank.js'
import { ENCYCLOPEDIA } from '../src/lib/learning.js'

const manifestUrl = new URL('../src/lib/storeFishPhotos.json', import.meta.url)
const folder = new URL('../public/art/store-fish/', import.meta.url)
await mkdir(folder, { recursive: true })
let manifest = {}
try { manifest = JSON.parse(await readFile(manifestUrl, 'utf8')) } catch {}
const failures = []
let next = 0, completed = 0
const original = url => url.replace(/\/cache\/[a-f0-9]+\//, '/').split('?')[0]
const request = async url => {
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(30000) })
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`)
  return response
}
async function cache(fish) {
  if (manifest[fish.id]) {
    try { if ((await readFile(new URL(`../public${manifest[fish.id].path}`, import.meta.url))).length > 1000) return } catch {}
  }
  const source = fish.sourceUrl || ENCYCLOPEDIA.find(entry => entry.id === `fish-${fish.id}`)?.sourceUrl
  if (!source?.startsWith('https://greenaqua.hu/en/')) throw new Error('Missing Green Aqua product source')
  let photo = manifest[fish.id]?.original || fish.photo
  if (!photo.startsWith('https://greenaqua.hu/media/')) {
    const html = await (await request(source)).text()
    photo = html.match(/property="og:image"\s+content="([^"]+)"/)?.[1]?.replaceAll('&amp;', '&')
  }
  if (!photo?.startsWith('https://greenaqua.hu/media/catalog/product/')) throw new Error('Missing product photograph')
  const url = original(photo)
  const response = await request(url)
  if (!response.headers.get('content-type')?.startsWith('image/')) throw new Error('Response is not a photograph')
  const bytes = Buffer.from(await response.arrayBuffer())
  if (bytes.length < 1000) throw new Error('Image is too small')
  const extension = new URL(url).pathname.split('.').at(-1).toLowerCase().replace('jpeg', 'jpg')
  if (!['jpg', 'png', 'webp'].includes(extension)) throw new Error('Unsupported photo format')
  const file = `${fish.id}.${extension}`
  await writeFile(new URL(file, folder), bytes)
  manifest[fish.id] = { ...manifest[fish.id], path: `/art/store-fish/${file}`, original: url, source, credit: 'Green Aqua', bytes: bytes.length }
}
await Promise.all(Array.from({ length: 3 }, async () => {
  while (next < CATALOG.fish.length) {
    const fish = CATALOG.fish[next++]
    try { await cache(fish) } catch (error) { failures.push({ id: fish.id, error: error.message }) }
    completed++
    if (completed % 20 === 0) console.log(`Checked ${completed}/${CATALOG.fish.length} fish photographs`)
  }
}))
manifest = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))
await writeFile(manifestUrl, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(JSON.stringify({ photographs: Object.keys(manifest).length, failures }))
if (failures.length) process.exitCode = 1
