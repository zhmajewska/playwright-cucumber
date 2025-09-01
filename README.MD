# Playwright + Cucumber + TypeScript Automation

## Overview

This repository focuses on Behavior-Driven Development (BDD) using Playwright, Cucumber, and TypeScript. With BDD, tests are written in plain-language scenarios (Gherkin) that are easy for all stakeholders to understand, and then mapped to Playwright code for browser automation.
The project also integrates Allure for generating detailed HTML reports, including screenshots and videos of test runs.

Compared to traditional Playwright tests:

- **Playwright only**: Tests are written directly in code using Playwright’s built-in runner and technical syntax—best for developers `playwright.config.ts`, see [Playwright Automation](https://github.com/zhmajewska/playwright)
- **Playwright + Cucumber (BDD)**: Tests are described in plain language using Cucumber’s runner `cucumber.json`

## How It Works

1. Cucumber reads `.feature` files.
2. Step definitions (Given/When/Then) are implemented in TypeScript.
3. Playwright APIs drive the browser in step definitions.
4. Cucumber runs the tests and collects results.
5. Allure generates HTML reports from test results.

## Project Structure

```
project/
├── features/           # Gherkin feature files
├── src/
│   ├── steps/          # Step definitions (TypeScript)
│   ├── pages/          # Page objects (UI actions/assertions)
│   └── utils/          # Utilities (e.g., hooks, world)
├── cucumber.json
├── package.json
├── tsconfig.json
```

## Setup

Install prerequisites:

- [Node.js](https://nodejs.org)
- npm

Install dependencies:

```bash
npm i ts-node -D
npm install --save-dev @cucumber/cucumber
npm install --save-dev playwright
npm install --save-dev allure-cucumberjs allure-js-commons allure-commandline
npm install eslint --save-dev
npm init @eslint/config
npm install --save-dev --save-exact prettier
npm install --save-dev eslint-config-prettier
```

## Execute tests

**default command** to run **all tests**, use the following command:

```bash
npx cucumber-js
```

## Generate Allure report

after the test, you can run this command to generate Allure report:

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

### Attachments

Screenshots and video attachments are configured in `src/utils/hooks.ts`. The `src/utils/world.ts` file defines a custom World object for Cucumber scenarios. By exposing the `attach` function from IWorldOptions in your World, you allow step definitions to add files (such as screenshots, logs, or videos) as attachments to the Allure report.

### Troubleshooting

#### '????' in Allure Report

Make sure that allure generates the report to the correct folder where the results are stored. The default folder is `allure-results`, but if you have changed it in `cucumber.json`, ensure that the path matches.

```
"allure": {
        "resultsDir": "allure-results"
      }
```

#### Allure Video Attachments

If the Allure video is 0KB, it is likely because Playwright only finalizes and writes the video file to disk after the browser context is closed. If you try to read and attach the video before closing the context, the file may be empty or incomplete (often 0KB). To avoid this, first close the context (await context.close()), then read and attach the video file.

## Best Practices

clean up the code with Prettier

```bash
npx prettier . --write
```
