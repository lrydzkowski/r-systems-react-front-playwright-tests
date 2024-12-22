import { expect, Page } from '@playwright/test';
import { loadEnvConfig } from '../tests-setup/env.config';

const envConfig = loadEnvConfig();

export class LexicaPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/');
    await expect(this.page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  }

  async signIn() {
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await this.page.getByLabel('Email address').fill(envConfig.userEmail);
    await this.page.getByLabel('Password').fill(envConfig.userPassword);
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async createSet(setName: string) {
    await this.page.getByRole('button', { name: 'Lexica English vocabulary' }).click();
    await this.page
      .locator('div')
      .filter({ hasText: /^RefreshNewOpenDelete$/ })
      .getByRole('button')
      .nth(1)
      .click();
    await this.page.getByLabel('Name').fill(setName);
    await this.page.locator('input[name="entries\\.0\\.word"]').click();
    await this.page.locator('input[name="entries\\.0\\.word"]').fill('word');
    await this.page.locator('input[name="entries\\.0\\.translations"]').click();
    await this.page.locator('input[name="entries\\.0\\.translations"]').fill('słowo');
    await this.page
      .locator('div')
      .filter({ hasText: /^NameNameWordWordWord TypeNounWord TypeTranslationsTranslations$/ })
      .locator('button')
      .click();
    await this.page.locator('input[name="entries\\.1\\.word"]').click();
    await this.page.locator('input[name="entries\\.1\\.word"]').fill('go');
    await this.page.locator('[id="mui-component-select-entries\\.1\\.wordType"]').click();
    await this.page.getByRole('option', { name: 'Verb', exact: true }).click();
    await this.page.locator('input[name="entries\\.1\\.translations"]').click();
    await this.page.locator('input[name="entries\\.1\\.translations"]').fill('iść');
    await this.page.getByRole('button', { name: 'Create' }).click();
  }

  async searchSet(setName: string) {
    await this.page.getByPlaceholder('Search…').fill(setName);
    await this.page.getByPlaceholder('Search…').press('Enter');
    await this.page.getByPlaceholder('Search…').dispatchEvent('change');
    await this.page.waitForResponse(
      (response) => response.url().includes('/api/lexica/sets') && response.status() === 200,
    );
  }

  async verifySetVisibility(setName: string) {
    await expect(this.page.getByRole('cell', { name: setName })).toBeVisible();
  }

  async deleteSet() {
    await this.page.locator("button[aria-label='Delete']").click();
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }

  async verifyNoRows() {
    await expect(this.page.getByText('No rows')).toBeVisible();
  }
}
