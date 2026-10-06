import { readFile, writeFile } from 'node:fs/promises'
import { guideScript, validateGuide } from '../src/lib/guide.js'

const source = new URL('../src/content/guide.json', import.meta.url)
const output = new URL('../docs/demo-script.md', import.meta.url)
const result = validateGuide(JSON.parse(await readFile(source, 'utf8')))
if (result.error) throw new Error(result.error)
await writeFile(output, guideScript(result.guide), 'utf8')
console.log('Updated docs/demo-script.md from src/content/guide.json')
