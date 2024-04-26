import { Page } from '@playwright/test';
import { error } from 'console';

export class YourCartPage {
  protected readonly page: Page;
  protected readonly locators: {
    cartContentsContainer: string;
    inventoryItem: string;
    remove: string;
    continueShopping: string;
    checkout: string;
  };

  constructor(page: Page) {
    this.page = page;
    this.locators = {
      cartContentsContainer: '[data-test="cart-contents-container"]',
      inventoryItem: '[data-test="inventory-item"]',
      remove: 'Remove',
      continueShopping: '[data-test="continue-shopping"]',
      checkout: 'Checkout',
    };
  }

  public async isCartContentsContainerDisplayed(): Promise<boolean> {
    return this.page.locator(this.locators.cartContentsContainer).isVisible();
  }

  public async removeFirstItem(): Promise<void> {
    return this.page
      .locator(this.locators.inventoryItem)
      .first()
      .getByRole('button', { name: this.locators.remove, exact: true })
      .click();
  }

  public async removeLastItem(): Promise<void> {
    return this.page
      .locator(this.locators.inventoryItem)
      .last()
      .getByRole('button', { name: this.locators.remove, exact: true })
      .click();
  }

  public async removeItemBasedOnIndex(index: number): Promise<void> {
    const itemsLength = await this.page
      .locator(this.locators.inventoryItem)
      .count();

    if (index <= itemsLength) {
      return this.page
        .locator(this.locators.inventoryItem)
        .nth(index)
        .getByRole('button', { name: this.locators.remove, exact: true })
        .click();
    } else throw new error('Out of Bound Index');
  }

  public async clickContinueShopping(): Promise<void> {
    return this.page.locator(this.locators.continueShopping).click();
  }

  public async clickCheckOut(): Promise<void> {
    return this.page
      .getByRole('button', { name: this.locators.checkout, exact: true })
      .click();
  }
}
