# Playwright + Cucumber + TypeScript Automation

## Overview

This repository focuses on Behavior-Driven Development (BDD) using Playwright, Cucumber, and TypeScript. With BDD, tests are written in plain-language scenarios (Gherkin) that are easy for all stakeholders to understand, and then mapped to Playwright code for browser automation.

- **Playwright only**: Tests are written directly in code using Playwright’s built-in runner and technical syntax—best for developers `playwright.config.ts`
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
```

- cucumber

```bash
npm install --save-dev @cucumber/cucumber
```

- Playwright

```bash
npm install --save-dev playwright
```

- Allure

```bash
npm install --save-dev allure-cucumberjs allure-js-commons allure-commandline
```

- ESLint

```bash
npm install eslint --save-dev
```

```bash
npm init @eslint/config
```

- Prettier

```bash
npm install --save-dev --save-exact prettier
```

```bash
npx prettier --write .
```

Linking Prettier with ESLint

```bash
npm install --save-dev eslint-config-prettier
```

## Execute tests

**default command** to run **all tests** in [UI-mode](https://playwright.dev/docs/test-ui-mode), use the following command:

```bash
npx cucumber-js
```

## Generate Allure report

after the test, you can run this command to generate Allure report:

```bash
npx allure generate reports --clean -o allure-report
npx allure open allure-report
```

If the Allure video is 0KB, it is likely because Playwright only finalizes and writes the video file to disk after the browser context is closed. If you try to read and attach the video before closing the context, the file may be empty or incomplete (often 0KB). To avoid this, first close the context (await context.close()), then read and attach the video file.

## Best Practices

clean up the code with Prettier

```bash
npx prettier . --write
```
