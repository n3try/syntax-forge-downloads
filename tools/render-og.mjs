import { chromium } from '@playwright/test'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = await fs.readFile(path.join(root, 'assets', 'og-card.svg'), 'utf8')
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })

await page.setContent(`<style>*{margin:0}html,body{width:1200px;height:630px;overflow:hidden}</style>${source}`)
await page.screenshot({ path: path.join(root, 'assets', 'og.png'), type: 'png' })
await browser.close()
