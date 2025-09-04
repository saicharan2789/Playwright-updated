import { Locator, Page, expect } from '@playwright/test';

export default class BookingFormPage {
  readonly page: Page;
  readonly firstname: Locator;
  readonly lastname: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly reserveButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.firstname = page.locator('input[placeholder="Firstname"]');
    this.lastname = page.locator('input[placeholder="Lastname"]');
    this.email = page.locator('input[placeholder="Email"]');
    this.phone = page.locator('input[placeholder="Phone"]');
    this.reserveButton = page.getByRole('button', { name: 'Reserve' });
  }

  async fillForm() {
    await this.firstname.fill('John');
    await this.lastname.fill('Doe');
    await this.email.fill('john.doe@test.com');
    await this.phone.fill('1234567890');
   
  }

  async submit() {
    await this.reserveButton.click();
  }

 
}
