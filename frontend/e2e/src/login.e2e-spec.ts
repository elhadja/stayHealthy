import { LogInPage } from './login.po';
import {browser, logging, WebDriver} from 'protractor';

describe('StayHealthy Login Page Test', () => {
  let page: LogInPage;

  beforeEach(() => {
    page = new LogInPage();
  });

  it('Should connect as a patient', async () => {
    await page.navigateTo();
    await page.fillForm('patient');
    await browser.sleep(500);

    await page.clickLoginButton();
    await browser.sleep(500);

    browser.getCurrentUrl().then(url => expect(url).toContain('patient'));
  });

  it('Should disconnect the user', async () => {

    await page.clickDisconnectButton();
    await browser.sleep(500);

    browser.getCurrentUrl().then(url => expect(url).toContain('/'));
  });

  it('Should connect as a doctor', async () => {
    await page.navigateTo();
    await page.fillForm('doctor');
    await browser.sleep(500);

    await page.clickLoginButton();
    await browser.sleep(500);

    browser.getCurrentUrl().then(url => expect(url).toContain('doctor'));
  });
});

afterEach(async () => {
  // Assert that there are no errors emitted from the browser
  const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  expect(logs).not.toContain(jasmine.objectContaining({
    level: logging.Level.SEVERE,
  } as logging.Entry));
});
