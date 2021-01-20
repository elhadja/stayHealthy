import {browser, element, by} from 'protractor';
import {LogInPage} from './login.po';

export class AgendaPage {

  async init(): Promise<void> {
    await browser.get('/login');
    await browser.sleep(500);
    const email = 'login@email.com';
    const password = 'motdepasse';
    await this.connectUser(email, password, 'patient');
  }

  async connectUser(email: string, password: string, profile: string): Promise<void> {
    const page = new LogInPage();
    await page.putEmail(email);
    await page.putPassword(password);
    await page.selectProfile(profile);
    await browser.sleep(1000);
    await page.clickLoginButton();
  }

  async getEmptySlots(): Promise<boolean> {
    browser.waitForAngularEnabled();
    const errorMsg = (await element(by.className('empty')).getText());
    return errorMsg === 'Vous ne disposez d\'aucun rendez-vous pour le moment!';
  }

  async searchDoctor(name: string): Promise<void> {
    await element(by.className('name')).sendKeys(name);
    browser.driver.findElement(by.css('button[type="submit"]')).submit().then( () => {
      browser.waitForAngular();
    });
    await browser.sleep(500);

    browser.driver.findElement(by.tagName('app-doctor-card')).click().then(async () => {
      await browser.waitForAngular();
    });
    await browser.waitForAngular();
  }

  async bookSlot(): Promise<void> {
    browser.driver.findElement(by.tagName('mwl-calendar-event-title')).click().then( () => {
      browser.waitForAngular();
    });
    await browser.sleep(500);

    browser.driver.findElement(by.className('confirm')).click().then( () => {
      browser.waitForAngular();
    });
  }

  async cancelBook(): Promise<void> {
    browser.driver.findElement(by.className('cancel')).click().then( () => {
      browser.waitForAngular();
    });
    await browser.sleep(500);

    browser.driver.findElement(by.className('confirm')).click().then( () => {
      browser.waitForAngular();
    });
  }
}
