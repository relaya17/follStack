import { expect, test } from '@playwright/test'

test.describe('smoke', () => {
  test('homepage loads with Hebrew brand', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', /he|en/)
  })

  test('learning page loads without crashing', async ({ page }) => {
    await page.goto('/learning')
    await expect(page.getByRole('heading', { name: /מודולי למידה/ })).toBeVisible({ timeout: 30_000 })
    // Either curated modules or a friendly error — never a blank crash
    const modulesOrError = page
      .getByText(/מודול|לא ניתן לטעון|לא נמצאו/)
      .first()
    await expect(modulesOrError).toBeVisible({ timeout: 30_000 })
  })

  test('invalid learning module shows friendly error', async ({ page }) => {
    await page.goto('/learning/does-not-exist-xyz')
    await expect(page.getByText(/המודול לא נמצא|API לא זמין/)).toBeVisible({ timeout: 30_000 })
    await expect(page.getByRole('link', { name: /חזרה/ })).toBeVisible()
  })

  test('mobile viewport can open learning', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'mobile project only')
    await page.goto('/learning')
    await expect(page.getByRole('heading', { name: /מודולי למידה/ })).toBeVisible({ timeout: 30_000 })
    const box = await page.getByRole('heading', { name: /מודולי למידה/ }).boundingBox()
    expect(box).toBeTruthy()
    expect(box!.width).toBeLessThanOrEqual(page.viewportSize()!.width)
  })
})
