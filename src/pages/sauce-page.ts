import { expect, type Locator, type Page } from "@playwright/test";

export class SauceDemoPage {
  readonly page: Page;
  readonly sauceDemoHeader: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly productsHeader: Locator;
  readonly menuOpenButton: Locator;
  readonly warning: Locator;
  readonly cart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sauceDemoHeader = page.locator("title");
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.locator('[data-test="login-button"]');
    this.productsHeader = page.locator("span", { hasText: "Products" });
    this.menuOpenButton = page.locator("button", { hasText: "Open Menu" });
    this.warning = page.locator("h3", {
      hasText: "Epic sadface: Sorry, this user has been locked out.",
    });
    this.cart = page.locator('[data-test="shopping-cart-link"]');
  }

  public async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async provideCredentials(
    username: string = "standard_user",
    password: string = "secret_sauce",
  ) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async getManageCartButtonLocator(
    productName: string,
    action: string = "add-to-cart",
  ): Promise<string> {
    const normalized = productName
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
    return `[name="${action}-${normalized}"]`;
  }

  async getManageCartButton(
    productName: string,
    action: string = "add-to-cart",
  ): Promise<Locator> {
    const selector = await this.getManageCartButtonLocator(productName, action);
    return this.page.locator(selector);
  }

  async addToCart(productName: string) {
    const addToCartButton = await this.getManageCartButton(productName);
    await addToCartButton.click();
  }

  async removeFromCart(productName: string) {
    const removeButton = await this.getManageCartButton(productName, "remove");
    await removeButton.click();
    await expect(removeButton).not.toBeVisible();
  }

  async getAddedToCartProductsLocator(productName: string): Promise<Locator> {
    return this.page.locator("a", { hasText: productName });
  }

  async checkCart(productName: string) {
    const addedProduct = await this.getAddedToCartProductsLocator(productName);
    await this.cart.click();
    await expect(addedProduct).toBeVisible();
  }

  async getMenuLocator(buttonName: string): Promise<Locator> {
    return this.page.locator("a", { hasText: buttonName });
  }

  async clickOpenMenuButton() {
    await this.menuOpenButton.click();
  }

  async clickMenuButton(buttonName: string) {
    const menuButton = await this.getMenuLocator(buttonName);
    await menuButton.click();
  }

  async resetAppState() {
    await this.clickMenuButton("Reset App State");
  }

  async logout() {
    await this.clickMenuButton("Logout");
  }
}
