import { Before, After, Status, AfterStep } from "@cucumber/cucumber";
import { World } from "./world";
import { mainLogger } from "./logger";
import fs from "fs";

Before(async function (scenario) {
  mainLogger.info(
    `\n ======== START SCENARIO: "${scenario.pickle.name}" ========`,
  );
});

Before(async function (this: World) {
  await this.openBrowser();
  await this.initPages();
  mainLogger.info("HOOK: Browser opened and pages initialized");
});

AfterStep(async function (this: World) {
  if (!this.page) return;

  try {
    const screenshot = await this.page.screenshot({ fullPage: true });

    // Attach as a report attachment for Cucumber/Allure
    this.attach(screenshot, "image/png");
  } catch (err) {
    mainLogger.error("❌ Failed to capture screenshot:", err);
  }
});

After(async function (this: World, scenario) {
  // Attach screenshot on failure
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({
      path: `reports/screenshots/${Date.now()}.png`,
      fullPage: true,
    });
    this.attach(screenshot, "image/png");
  }

  // Attach screenshot from the last page (if any)
  if (this.pages.length > 0) {
    const lastPage = this.pages[this.pages.length - 1];
    const screenshot = await lastPage.screenshot();
    this.attach(screenshot, "image/png");

    // Attach video if available (Playwright saves video after context is closed)
    if (this.context?.browser()) {
      await this.context.close();
      const video = lastPage.video();
      if (video) {
        const videoPath = await video.path();
        if (fs.existsSync(videoPath)) {
          const videoBuffer = await fs.promises.readFile(videoPath);
          this.attach(videoBuffer, "video/webm");
        }
      }
    }
  }

  // Close all pages and browser
  await Promise.all(this.pages.map((p) => p.close()));
  await this.closeBrowser();

  mainLogger.info(
    "HOOK: Scenario finished with status:",
    scenario.result?.status,
  );
});
