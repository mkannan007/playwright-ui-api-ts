import { Page } from '@playwright/test';

export class ProductPage {
  protected readonly page: Page;
  protected readonly locators: {
    productSortContainer: string;
    inventoryList: string;
    inventoryItem: string;
    addToCart: string;
    shoppingCart: string;
  };

  constructor(page: Page) {
    this.page = page;
    this.locators = {
      productSortContainer: '[data-test="product-sort-container"]',
      inventoryList: '[data-test="inventory-list"]',
      inventoryItem: '[data-test="inventory-item"]',
      addToCart: 'Add to cart',
      shoppingCart: '[data-test="shopping-cart-link"]',
    };
  }

  public async selectProductSort(sortType: string): Promise<string[]> {
    return await this.page.selectOption(
      this.locators.productSortContainer,
      sortType,
    );
  }

  public async isInventoryListDisplayed(): Promise<boolean> {
    return await this.page.locator(this.locators.inventoryList).isVisible();
  }

  public async addItemToCartFirstProduct(): Promise<void> {
    return await this.page
      .locator(this.locators.inventoryItem)
      .first()
      .getByRole('button', { name: this.locators.addToCart, exact: true })
      .click();
  }

  public async addItemToCartLastProduct(): Promise<void> {
    return await this.page
      .locator(this.locators.inventoryItem)
      .last()
      .getByRole('button', { name: this.locators.addToCart, exact: true })
      .click();
  }

  public async addItemToCartBasedOnIndex(index: number): Promise<void> {
    const itemListCount = await this.page
      .locator(this.locators.inventoryItem)
      .count();

    if (index <= itemListCount) {
      return await this.page
        .locator(this.locators.inventoryItem)
        .nth(index)
        .getByRole('button', { name: this.locators.addToCart, exact: true })
        .click();
    } else throw new Error('Index out of bound');
  }

  public async addAllItemsToCart(): Promise<void> {
    const itemListCount = await this.page
      .locator(this.locators.inventoryItem)
      .count();

    for (let item = 0; item < itemListCount; item += 1) {
      await this.page
        .locator(this.locators.inventoryItem)
        .nth(item)
        .getByRole('button', { name: this.locators.addToCart, exact: true })
        .click();
    }
  }

  public async clickShoppingCart(): Promise<void> {
    return await this.page.locator(this.locators.shoppingCart).click();
  }
}
