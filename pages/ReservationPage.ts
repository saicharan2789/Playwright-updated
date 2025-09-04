import { Locator, Page, expect } from '@playwright/test';

export default class ReservationPage {
  readonly page: Page;
  readonly header: Locator;
  readonly calendar: Locator;
  readonly priceSummary: Locator;
  readonly reserveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator("h1");
    this.calendar = page.locator(".rbc-calendar");
    this.priceSummary = page.locator(
      '(//div[@class="d-flex justify-content-between mb-2"])[1]/span[2]'
    );
    this.reserveButton = page.getByRole("button", { name: "Reserve" });
  }

  async verifyPage(title: string) {
    await expect(this.page).toHaveURL(/\/reservation\/1/);
    await expect(this.header).toContainText(title);
    await expect(this.calendar).toBeVisible();
  }

async selectDatesByDrag(startDate: number, endDate: number, price: number) {
  if (isNaN(price)) throw new Error("Price must be numeric");

  const allCells = this.page.locator(".rbc-date-cell button");
  const startCell = allCells.locator(`text=${startDate}`).first();
  const endCell = allCells.locator(`text=${endDate}`).first();

  await startCell.scrollIntoViewIfNeeded();
  await endCell.scrollIntoViewIfNeeded();

  const startBox = await startCell.boundingBox();
  const endBox = await endCell.boundingBox();
  if (!startBox || !endBox) throw new Error("Date cells not found");

 
  await this.page.mouse.move(
    startBox.x + startBox.width / 2,
    startBox.y + startBox.height / 2
  );
  await this.page.mouse.down();

  
  const steps = 10;
  for (let i = 1; i <= steps; i++) {
    const x =
      startBox.x + ((endBox.x - startBox.x) * i) / steps + startBox.width / 2;
    const y =
      startBox.y + ((endBox.y - startBox.y) * i) / steps + startBox.height / 2;
    await this.page.mouse.move(x, y);
  }

  await this.page.mouse.up();

 
  const nights = endDate - startDate + 1;
  const expectedTotal = nights * price + 40; // add cleaning fixed fees

  const summaryText = await this.priceSummary.innerText();
  const summaryNumber = Number(summaryText.replace(/\D/g, ""));
  console.log(
    `Price Summary Text: ${summaryText}, Parsed Number: ${summaryNumber}`
  );
  if (summaryNumber !== expectedTotal) {
    throw new Error(
      `Price summary mismatch: expected ${expectedTotal}, got ${summaryNumber}`
    );
  }

  return { nights, expectedTotal };
}

  async clickReserve() {
    await this.reserveButton.click();
  }
}
