import { IWorldOptions, setWorldConstructor } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "playwright";
import { SauceDemoPage } from "../pages/sauce-page";

export class World {
  browser!: Browser;
  context!: BrowserContext;
  pages: Page[] = [];
  page!: Page;

  sauceDemoPage: SauceDemoPage | undefined;

  // declare 'attach' so TS knows it exists
  attach: IWorldOptions["attach"];

  constructor(options: IWorldOptions) {
    this.attach = options.attach;
  }

  async openBrowser() {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext({
      recordVideo: {
        dir: "allure/videos/",
        size: { width: 1280, height: 720 },
      },
    });
  }

  async newPage(): Promise<Page> {
    if (!this.context) {
      throw new Error(
        "Browser context is not initialized. Call openBrowser() first.",
      );
    }
    const page = await this.context.newPage();
    this.pages.push(page);
    return page;
  }

  async initPages() {
    if (!this.page) {
      this.page = await this.newPage();
    }
    this.sauceDemoPage = new SauceDemoPage(this.page);
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(World);
