import { Browser, Page, test as base } from '@playwright/test';
import { CommonPage } from 'pages/common.page';

import { LoginPage } from 'pages/login.page';
import { OverviewPage } from 'pages/overview.page';
import { ProductPage } from 'pages/product.page';
import { YourCartPage } from 'pages/yourCart.page';
import { YourInformationPage } from 'pages/yourInformation.page';

declare global {
  const page: Page;
  const expect: typeof base.expect;
  const test: typeof base;
}

type pages = {
  commonPage: CommonPage;
  loginPage: LoginPage;
  productPage: ProductPage;
  yourCartPage: YourCartPage;
  yourInformationPage: YourInformationPage;
  overviewPage: OverviewPage;
};

const basePage = base.extend<{ page: Page }>({
  page: async (
    { browser }: { browser: Browser },
    use: (value: Page) => Promise<void>,
  ) => {
    await use(await browser.newPage());
  },
});

const testPages = base.extend<pages>({
  commonPage: async ({ page }, use) => {
    await use(new CommonPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  yourCartPage: async ({ page }, use) => {
    await use(new YourCartPage(page));
  },

  yourInformationPage: async ({ page }, use) => {
    await use(new YourInformationPage(page));
  },

  overviewPage: async ({ page }, use) => {
    await use(new OverviewPage(page));
  },
});

export const page = basePage;
export const test = testPages;
export const expect = testPages.expect;
