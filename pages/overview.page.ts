import { Page } from '@playwright/test';

export class OverviewPage {
  protected readonly page: Page;
  protected readonly locators: {
    checkoutSummary: string;
    finish: string;
  };

  constructor(page: Page) {
    this.page = page;
    this.locators = {
      checkoutSummary: '[data-test="checkout-summary-container"]',
      finish: 'Finish',
    };
  }

  public async isCheckoutSummaryDisplayed(): Promise<boolean> {
    return await this.page.locator(this.locators.checkoutSummary).isVisible();
  }

  public async clickFinish(): Promise<void> {
    return await this.page
      .getByRole('button', { name: this.locators.finish, exact: true })
      .click();
  }
}
