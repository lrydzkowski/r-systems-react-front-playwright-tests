import { test as base } from '@playwright/test';
import { LexicaPage } from '../tests-pages/lexica.page';

export const test = base.extend<{ lexicaPage: LexicaPage }>({
  lexicaPage: async ({ page }, use) => {
    const lexicaPage = new LexicaPage(page);
    await lexicaPage.navigate();
    await lexicaPage.signIn();
    await use(lexicaPage);
  },
});
