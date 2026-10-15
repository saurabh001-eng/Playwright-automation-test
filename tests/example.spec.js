const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const loginData = require('../test-data/loginData.json');

const baseUrl = 'https://opensource-demo.orangehrmlive.com';

test.describe('OrangeHRM login flows', () => {
  test('valid user can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(loginData.validCredentials.username, loginData.validCredentials.password);

    await loginPage.verifyDashboard();
  });

  test('invalid credentials show login error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(loginData.invalidCredentials.username, loginData.invalidCredentials.password);

    await loginPage.verifyInvalidCredentialsMessage();
  });

  test('valid user can log in successfully via API', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const csrfTokenInput = page.locator('input[name="_token"]');
    await expect(csrfTokenInput).toHaveAttribute('value', /.+/);
    const csrfToken = await csrfTokenInput.getAttribute('value');

    const response = await page.context().request.post(`${baseUrl}/web/index.php/auth/validate`, {
      form: {
        _token: csrfToken,
        username: loginData.validCredentials.username,
        password: loginData.validCredentials.password,
      },
    });

    //

    expect(response.ok()).toBeTruthy();
    expect(response.url()).toContain('/web/index.php/dashboard/index');
  });
});
