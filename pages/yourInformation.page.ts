import { Page } from '@playwright/test';
import { UserModel } from 'model/user.model';

export class YourInformationPage {
  protected readonly page: Page;
  protected readonly locators: {
    firstName: string;
    lastName: string;
    postCode: string;
    cancel: string;
    continue: string;
  };

  constructor(page: Page) {
    this.page = page;
    this.locators = {
      firstName: '[data-test="firstName"]',
      lastName: '[data-test="lastName"]',
      postCode: '[data-test="postalCode"]',
      cancel: '[data-test="cancel"]',
      continue: '[data-test="continue"]',
    };
  }

  public async setFirstName(user: UserModel): Promise<void> {
    return await this.page
      .locator(this.locators.firstName)
      .fill(user.setFirstName());
  }

  public async setLastName(user: UserModel): Promise<void> {
    return await this.page
      .locator(this.locators.lastName)
      .fill(user.setLastName());
  }

  public async setPostCode(user: UserModel): Promise<void> {
    return await this.page
      .locator(this.locators.postCode)
      .fill(user.setPostCode());
  }

  public async clickCancel(): Promise<void> {
    return await this.page.locator(this.locators.cancel).click();
  }

  public async clickContinue(): Promise<void> {
    return await this.page.locator(this.locators.continue).click();
  }
}
