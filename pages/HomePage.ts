import { Locator, Page } from '@playwright/test';

export default class HomePage {
  readonly page: Page;
  readonly heroBookNowButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroBookNowButton = page.locator('a:has-text("Book Now")').first();;
  }

  async open() {
    await this.page.goto('https://automationintesting.online/');
  }

  async clickHeroBookNow() {
    await this.heroBookNowButton.click();
  }
}
