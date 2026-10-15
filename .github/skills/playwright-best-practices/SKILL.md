---
name: playwright-best-practices
description: "Use when the user asks to create automation test cases by providing test scenarios and test cases, then explore the browser, implement the automation test cases, and validate them against the expected result."
---

# Playwright Best Practices

## Workflow for creating any automation test case
- Understand the user scenario, expected result, and acceptance criteria before writing code.
- Explore the browser to confirm the real UI flow and identify the exact user actions.
- Create a Page Object Model for each page or feature to keep selectors and actions reusable.
- Keep test files focused on scenarios, while page classes handle navigation and interaction methods.
- Validate the actual browser result against the expected behavior and fix the automation if the result differs.

## 1. Understand the scenario before writing tests
- Read the test scenario and expected result carefully.
- Confirm the real UI flow by exploring the browser.
- Translate business requirements into concrete Playwright steps.

## 2. Prefer stable, user-facing selectors
- Use `getByRole`, `getByLabel`, `getByPlaceholder`, and `getByText` before CSS selectors.
- Avoid selectors that depend on styling or DOM structure.
- Prefer controls that users actually interact with.

## 3. Assert behavior, not implementation
- Validate visible outcomes, success messages, state changes, and navigation.
- Prefer `expect(locator).toBeVisible()` and `toHaveText()` over checking internal data structures.
- Compare the actual result with the expected result explicitly.

## 4. Avoid flaky waits
- Do not use `waitForTimeout()` as the default waiting strategy.
- Wait for the actual condition: visibility, text, navigation, or network completion.
- Prefer Playwright's auto-waiting and `expect.poll()` when needed.

## 5. Keep tests isolated and reliable
- Use independent setups for each test.
- Clean up state after each run.
- Avoid shared browser state across unrelated tests.

## 6. Write maintainable test code
- Keep tests focused and scenario-based.
- Use `test.step()` to group complex actions.
- Reuse helper functions and page objects for repeated flows.

## 7. Validate against expected results
- Every test should clearly state what result is expected.
- After execution, compare the actual UI state with the expected business outcome.
- If the test fails, diagnose whether the issue is in the app, the test, or the environment.

## 8. Use CI-safe patterns
- Control external dependencies and mock unstable services when needed.
- Keep tests deterministic and fast.
- Capture screenshots, traces, or videos on failure for easier debugging.

## 9. Accessibility-first automation
- Target controls by their accessible labels and roles.
- Favor user-centric flows over internal DOM details.
- Keep automation aligned with real user interactions.

## 10. Good example
```ts
import { test, expect } from '@playwright/test';

test('user can log in and land on dashboard', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('secret123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

## 11. Anti-patterns to avoid
- Arbitrary delays instead of real conditions.
- CSS selectors tied to layout or styling classes.
- Tests that do not compare actual output with the expected result.
- Overly broad tests that hide the real business flow.

## 12. Rule of thumb
Write Playwright tests as real user acceptance checks: explore the application, automate the flow, validate the outcome, and ensure the final result matches the expected result.
