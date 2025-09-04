import { Locator, Page, expect } from '@playwright/test';

export default class RoomsPage {
  readonly page: Page;
  readonly firstRoomTitle: Locator;
  readonly firstRoomCard: Locator;
  readonly firstRoomBookNowButton: Locator;
  readonly firstRoomPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstRoomTitle = page.locator('h5.card-title').first();
    this.firstRoomCard = this.firstRoomTitle.locator('..').locator('..');
    this.firstRoomPrice = page.locator('div[class="fw-bold fs-5"]').first();
    this.firstRoomBookNowButton = this.firstRoomCard.locator('a:has-text("Book Now")');
  }

  async selectFirstRoom() {
    await expect(this.firstRoomCard).toBeVisible();

    const title = await this.firstRoomTitle.innerText();
    const priceRoom = await this.firstRoomPrice.innerText();
    await this.firstRoomBookNowButton.click();

    return { title, priceRoom };
  }
}
