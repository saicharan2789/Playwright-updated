import { Locator, Page, expect } from '@playwright/test';

export default class ReservationPage {
  readonly page: Page;
  readonly header: Locator;
  readonly calendar: Locator;
  readonly priceSummary: Locator;
  readonly reserveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('h1');
    this.calendar = page.locator('.rbc-calendar');
    this.priceSummary = page.locator('(//div[@class="d-flex justify-content-between mb-2"])[1]/span[2]');
    this.reserveButton = page.getByRole('button', { name: 'Reserve' });
  }

  async verifyPage(title: string) {
    await expect(this.page).toHaveURL(/\/reservation\/1/);
    await expect(this.header).toContainText(title);
    await expect(this.calendar).toBeVisible();
  }

 async selectDates(startIndex: number, endIndex: number, price: number) {
  const startDate = this.page.locator('.rbc-date-cell').nth(startIndex);
  const endDate = this.page.locator('.rbc-date-cell').nth(endIndex);

  await startDate.click();
  await endDate.click();
  const nights = endIndex - startIndex + 1;

  // Calculate expected total (including extra 40)
  const expectedTotal = nights * price + 40;

  // Verify price summary text contains the expected total
  const summaryText = await this.priceSummary.innerText();
  if (!summaryText.includes(expectedTotal.toString())) {
    throw new Error(`Price summary mismatch: expected ${expectedTotal}, got ${summaryText}`);
  }

  return { nights, expectedTotal };
}

  async clickReserve() {
    await this.reserveButton.click();
  }
}
