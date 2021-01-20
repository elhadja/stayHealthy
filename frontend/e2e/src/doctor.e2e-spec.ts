import {browser, logging} from 'protractor';
import { DoctorPage } from './doctor.po';
import {LogInPage} from './login.po';

describe('StayHealthy Doctor Page Test', () => {
  let page: DoctorPage;

  beforeEach(async () => {
    page = new DoctorPage();
    await page.init();
  });

  it('Should see the calendar', async () => {
    expect(page.checkViewFormat('month')).toBeTruthy();
    browser.waitForAngular();
    await browser.sleep(1000);

    expect(page.checkViewFormat('week')).toBeTruthy();
    browser.waitForAngular();
    await browser.sleep(1000);

    expect(page.checkViewFormat('day')).toBeTruthy();
    browser.waitForAngular();
    await browser.sleep(1000);
  });

  it('Should create a slot', async () => {

    await page.fillForm(8, 0);
    await page.clickSaveButton();
    await browser.sleep(1000);

    // slot created now try to duplicate it
    await page.clickSaveButton();
    await browser.sleep(500);

    expect(await page.getDuplicationError()).toBeTruthy();
  });

  it('Should notify required fields', async () => {
    await page.clickSaveButton();
    await browser.sleep(500);

    expect(await page.getReqFieldError('date-error')).toBeTruthy();
    expect(await page.getReqFieldError('hour-error')).toBeTruthy();
    expect(await page.getReqFieldError('minute-error')).toBeTruthy();
  });
});

afterEach(async () => {
  // Disconnect the user
  const loginPage = new LogInPage();
  await loginPage.clickDisconnectButton();
  await browser.sleep(500);
  // Assert that there are no errors emitted from the browser
  const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  expect(logs).not.toContain(jasmine.objectContaining({
    level: logging.Level.SEVERE,
  } as logging.Entry));
});
