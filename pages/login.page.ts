import { Page } from '@playwright/test';

export class LoginPage {
  protected readonly page: Page;
  protected readonly locators: {
    loginContainer: string;
    username: string;
    password: string;
    login: string;
  };

  constructor(page: Page) {
    this.page = page;
    this.locators = {
      loginContainer: '[id="login_button_container"]',
      username: '[id="user-name"]',
      password: 'input[id="password"]',
      login: '[id="login-button"]',
    };
  }

  public async setUserName(username: string): Promise<void> {
    await this.page
      .locator(this.locators.loginContainer)
      .waitFor({ state: 'visible' });
    return await this.page.locator(this.locators.username).fill(username);
  }

  public async setPassword(password: string): Promise<void> {
    return await this.page.locator(this.locators.password).fill(password);
  }

  public async loginButton(): Promise<void> {
    return await this.page.locator(this.locators.login).click();
  }
}
