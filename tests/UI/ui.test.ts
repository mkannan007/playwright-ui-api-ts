import { test, expect } from 'hooks/fixtures';
import {
  CHECKOUT_COMPLETE_MESSAGE,
  LOCKED_OUT_ERROR_MESSAGE,
} from 'data/content.data';
import { ProductSort } from 'libraries/productSort';
import { UserModel } from 'model/user.model';

test.beforeEach(async ({ page, baseURL }) => {
  await test.step('Navigate to Sauce Demo Login in Page', async () => {
    console.log(baseURL);
    await page.goto(baseURL);
    await page.waitForLoadState('domcontentloaded');
  });
});

test.describe('UI test', async () => {
  test('has title', async ({ page }) => {
    await test.step('should have the title', async () => {
      await expect(page).toHaveTitle(/Swag Labs/);
    });
  });

  test('login page tests', async ({ commonPage, loginPage, productPage }) => {
    await test.step('login with logged out credentials', async () => {
      await loginPage.setUserName(process.env.LOCKED_OUT_USERNAME);
      await loginPage.setPassword(process.env.PASSWORD);
      await loginPage.loginButton();
    });

    await test.step('should see the login error message', async () => {
      expect(await commonPage.getLoginErrorMessage()).toContain(
        LOCKED_OUT_ERROR_MESSAGE,
      );
    });

    await test.step('close error message x button', async () => {
      await commonPage.closeErrorMessageButton();

      expect(await commonPage.isLoginErrorMessageDisplayed()).toBeFalsy();
    });

    await test.step('login with standard credentials', async () => {
      await loginPage.setUserName(process.env.STANDARD_USERNAME);
      await loginPage.setPassword(process.env.PASSWORD);
      await loginPage.loginButton();

      expect(await productPage.isInventoryListDisplayed()).toBeTruthy();
    });
  });

  test(
    'E2E test by adding and removing products',
    { tag: '@smoke' },
    async ({
      commonPage,
      loginPage,
      productPage,
      yourCartPage,
      yourInformationPage,
      overviewPage,
    }) => {
      await test.step('login with standard credentials', async () => {
        await loginPage.setUserName(process.env.STANDARD_USERNAME);
        await loginPage.setPassword(process.env.PASSWORD);
        await loginPage.loginButton();
      });

      await test.step('add first and last items to cart after sorting high to low', async () => {
        await productPage.selectProductSort(ProductSort.PRICE_HIGH_TO_LOW);
        await productPage.addItemToCartFirstProduct();
        await productPage.addItemToCartLastProduct();
      });

      await test.step('navigate to your cart page', async () => {
        await productPage.clickShoppingCart();
      });

      await test.step('remove first and last items', async () => {
        await yourCartPage.removeFirstItem();
        await yourCartPage.removeLastItem();
      });

      await test.step('navigate to product page by clicking continue shopping', async () => {
        await yourCartPage.clickContinueShopping();
      });

      await test.step('add all items to cart', async () => {
        await productPage.addAllItemsToCart();
      });

      await test.step('navigate to your cart page', async () => {
        await productPage.clickShoppingCart();
      });

      await test.step('remove a item', async () => {
        await yourCartPage.removeItemBasedOnIndex(1);
      });

      await test.step('navigate to checkout page', async () => {
        await yourCartPage.clickCheckOut();
      });

      await test.step('click continue without filling your information', async () => {
        await yourInformationPage.clickContinue();
      });

      await test.step('should have error message and click close button', async () => {
        expect(await commonPage.isLoginErrorMessageDisplayed()).toBeTruthy();

        await commonPage.closeErrorMessageButton();
      });

      await test.step('fill the your information page and continue', async () => {
        const user = new UserModel();

        await yourInformationPage.setFirstName(user);
        await yourInformationPage.setLastName(user);
        await yourInformationPage.setPostCode(user);
        await yourInformationPage.clickContinue();
      });

      await test.step('should see checkout summary and click finish', async () => {
        expect(await overviewPage.isCheckoutSummaryDisplayed()).toBeTruthy();

        await overviewPage.clickFinish();

        expect(await commonPage.getHeaderMessage()).toEqual(
          CHECKOUT_COMPLETE_MESSAGE,
        );
      });
    },
  );
});
