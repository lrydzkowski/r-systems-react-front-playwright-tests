# r-systems-react-front-playwright-tests

A simple project with an example of using Playwright to write E2E tests. We have here simple tests for [r-systems-react-front](https://github.com/lrydzkowski/R.Systems.ReactFront) application.

## How to Run

1. Create `.env` file with configuration based on `env.sample`.
2. Run the following comment: `npx playwright test`.

## Technicalities

### Useful Commands

Run tests:

```powershell
npx playwright test
```

Run tests with UI:

```powershell
npx playwright test --ui
```

Show the last report:

```powershell
npx playwright show-report
```

Generate tests code:

```powershell
npx playwright codegen <url>
```

### VSCode Extension

<https://github.com/microsoft/playwright-vscode>
