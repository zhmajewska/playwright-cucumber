import { Before, After } from "@cucumber/cucumber";
import { World } from "./world";
import { mainLogger } from "./logger";

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

// AfterStep(function ({ result }) {
//     mainLogger.info(`  ✔ STEP STATUS: ${result?.status}`);
// });

After(async function (scenario) {
  if (scenario.result?.status === "FAILED" && World) {
    const screenshot = await this.screenshot();
    this.attach(screenshot, "image/png");
  }
  await this.closeBrowser();
  mainLogger.info(
    "HOOK: Scenario finished with status:",
    scenario.result?.status,
  );
});
