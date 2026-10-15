const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/');
    await this.page.waitForURL(/\/auth\/login$/);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyDashboard() {
    await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  }

  async verifyInvalidCredentialsMessage() {
    await expect(this.page.getByText('Invalid credentials')).toBeVisible();
  }
}

module.exports = { LoginPage };
