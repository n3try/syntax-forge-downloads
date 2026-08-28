import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const pages = ['/', '/privacy.html', '/terms.html', '/accessibility.html']

test.use({ channel: 'chrome' })

for (const path of pages) {
  test(`${path} has no automatically detectable WCAG A or AA violations`, async ({ page }) => {
    await page.goto(`http://127.0.0.1:4173${path}`)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
    expect(results.violations).toEqual([])
  })

  test(`${path} reflows at 320 CSS pixels`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto(`http://127.0.0.1:4173${path}`)
    const widths = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
    }))
    expect(widths.document).toBeLessThanOrEqual(widths.viewport)
  })

  test(`${path} tolerates WCAG text spacing`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto(`http://127.0.0.1:4173${path}`)
    await page.addStyleTag({ content: `
      * { letter-spacing: .12em !important; word-spacing: .16em !important; }
      p, li, td, th { line-height: 1.5 !important; }
      p { margin-bottom: 2em !important; }
    ` })
    const result = await page.evaluate(() => ({
      clippedText: [...document.querySelectorAll('p, li, a, h1, h2, h3, td, th')]
        .filter((element) => {
          const style = getComputedStyle(element)
          const clipsX = ['hidden', 'clip'].includes(style.overflowX) && element.scrollWidth > element.clientWidth + 1
          const clipsY = ['hidden', 'clip'].includes(style.overflowY) && element.scrollHeight > element.clientHeight + 1
          return clipsX || clipsY
        })
        .map((element) => element.textContent.trim().slice(0, 80)),
      documentOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    }))
    expect(result.clippedText).toEqual([])
    expect(result.documentOverflow).toBe(false)
  })
}

test('keyboard users reach the skip link and main content first', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/')
  await page.keyboard.press('Tab')
  await expect(page.locator('.skip-link')).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
})

test('primary controls meet the 44 pixel touch target used by this site', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/')
  const undersized = await page.locator('.brand, .site-header nav a, .primary-actions a, .release-links a, .site-footer a').evaluateAll((elements) => elements
    .map((element) => ({ text: element.textContent.trim(), height: element.getBoundingClientRect().height, width: element.getBoundingClientRect().width }))
    .filter(({ height, width }) => height < 44 || width < 24))
  expect(undersized).toEqual([])
})
