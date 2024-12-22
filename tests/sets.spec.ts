import { v4 as uuidv4 } from 'uuid';
import { test } from '../tests-setup/app-test.setup';

test.describe('create a new set', () => {
  test('on desktop', async ({ isMobile, lexicaPage }) => {
    test.skip(isMobile);

    const setName = uuidv4();

    await lexicaPage.createSet(setName);
    await lexicaPage.searchSet(setName);
    await lexicaPage.verifySetVisibility(setName);
    await lexicaPage.deleteSet();
    await lexicaPage.verifyNoRows();
  });

  test('on mobile', async ({ isMobile, lexicaPage }) => {
    test.skip(!isMobile);

    const setName = uuidv4();

    await lexicaPage.createSet(setName);
    await lexicaPage.searchSet(setName);
    await lexicaPage.verifySetVisibility(setName);
    await lexicaPage.deleteSet();
    await lexicaPage.verifyNoRows();
  });
});
