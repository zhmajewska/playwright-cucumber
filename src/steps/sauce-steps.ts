import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { World } from "../utils/world";

Given(
  "the user navigates to the Sauce Demo login page",
  async function (this: World) {
    if (!this.sauceDemoPage)
      throw new Error("sauceDemoPage is not initialized");
    await this.sauceDemoPage.goto();
  },
);

When(
  "the user logs in with username {string} and password {string}",
  async function (username: string, password: string) {
    await this.sauceDemoPage.provideCredentials(username, password);
    await this.sauceDemoPage.clickLoginButton();
  },
);

When(
  "the user adds {string} product to the cart",
  async function (product: string) {
    await this.sauceDemoPage.addToCart(product);
  },
);

Then(
  "the cart should contain {string} product",
  async function (product: string) {
    await this.sauceDemoPage.checkCart(product);
  },
);

When(
  "the user removes {string} product from the cart",
  async function (product: string) {
    await this.sauceDemoPage.removeFromCart(product);
  },
);

When("the user opens the menu", async function () {
  await this.sauceDemoPage.clickOpenMenuButton();
});

When("the user resets the app state", async function () {
  await this.sauceDemoPage.resetAppState();
});

When("the user logs out", async function () {
  await this.sauceDemoPage.logout();
});

Then("the user should be redirected to the login page", async function () {
  await expect(this.page).toHaveURL(/.*saucedemo\.com\/$/);
});
