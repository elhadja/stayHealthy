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

    await browser.getCurrentUrl().then(url => expect(url).toContain('doctor'));
  });

  it('Should notify for invalid email', async () => {
    await page.navigateTo();
    await page.putEmail('tést@email.com');
    await browser.sleep(500);

    await page.clickLoginButton();
    await browser.sleep(500);

    expect(await page.getEmailError()).toBeTruthy();
    await browser.getCurrentUrl().then(url => expect(url).toContain('login'));
  });

  it('Should notify required fields', async () => {
    await page.navigateTo();

    await page.clickLoginButton();
    await browser.sleep(500);

    expect(await page.getEmailError()).toBeTruthy();
    expect(await page.getPasswordError()).toBeTruthy();
    expect(await page.getProfileError()).toBeTruthy();
    await browser.getCurrentUrl().then(url => expect(url).toContain('login'));
  });

  it('Should notify for failed connection v1', async () => {
    await page.navigateTo();
    await page.putEmail('t@email.com');
    await page.putPassword('mdp');
    await page.selectProfile('patient');
    await browser.sleep(500);

    await page.clickLoginButton();
    await browser.sleep(500);

    expect(await page.getLoginError()).toBeTruthy();
    await browser.getCurrentUrl().then(url => expect(url).toContain('login'));
  });

  it('Should notify for failed connection v2', async () => {
    await page.navigateTo();
    await page.putEmail('test@email.com');
    await page.putPassword('m');
    await page.selectProfile('patient');
    await browser.sleep(500);

    await page.clickLoginButton();
    await browser.sleep(500);

    expect(await page.getLoginError()).toBeTruthy();
    await browser.getCurrentUrl().then(url => expect(url).toContain('login'));
  });
});
