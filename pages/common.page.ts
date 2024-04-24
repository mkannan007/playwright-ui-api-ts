import { Page } from '@playwright/test';

export class CommonPage {
  protected readonly page: Page;
  protected readonly locators: {
    errorMessage: string;
    errorButton: string;
  };

  constructor(page: Page) {
    this.page = page;
    this.locators = {
      errorMessage: '[data-test="error"]',
      errorButton: '[data-test="error-button"]',
    };
  }

  public async getLoginErrorMessage(): Promise<string> {
    return await this.page.locator(this.locators.errorMessage).textContent();
  }

  public async isLoginErrorMessageDisplayed(): Promise<boolean> {
    return await this.page.locator(this.locators.errorMessage).isVisible();
  }

  public async closeErrorMessageButton(): Promise<void> {
    return await this.page.locator(this.locators.errorButton).click();
  }

  public async clickButton(button: string): Promise<void> {
    return await this.page
      .getByRole('button', { name: button, exact: true })
      .click();
  }

  public async getHeaderMessage(): Promise<string> {
    return await this.page.getByRole('heading').textContent();
  }
}
