import { LogInPage } from './login.po';
import {browser, by, element} from 'protractor';
import {UserStory2Po} from './user-story2.po';

describe('Use case 3', () => {
  let login: LogInPage;
  let page: UserStory2Po;

  beforeEach(() => {
    login = new LogInPage();
    page = new UserStory2Po();
  });

  it('As a patient I should login', async () => {
    await login.navigateTo();
    await login.fillForm('patient');
    await browser.sleep(500);

    await login.clickLoginButton();
    await browser.sleep(500);

    browser.getCurrentUrl().then(url => expect(url).toContain('patient'));
  });

  it('I should search for a health professional', async () => {
    await element.all(by.css('mat-option')).count().then(async () => {
      for (let i = 5; i < 6 ; i++){
        browser.driver.findElement(by.className('mx-2')).click().then(() => {
          browser.waitForAngular();
          browser.driver.findElement(by.css(`mat-option:nth-of-type(${i + 2})>span`)).click().then(async () => {
            await browser.findElement(by.id('location')).clear().then(async () => {
              await browser.findElement(by.id('location')).sendKeys('Lyon').then(async () => {
                await browser.sleep((500));
                await browser.findElement(by.className('search-btn')).click();
              });
            });
          });
        });
        await browser.sleep(5000);
      }
    });
  });

  it('Results should appears as second part of the page as a Map with markers', async () => {
    await browser.sleep(500);
    await expect(element.all(by.id('map')).isDisplayed()).toBeTruthy();
    await expect(browser.findElement(by.className('leaflet-marker-icon leaflet-zoom-animated leaflet-interactive')).isDisplayed()).toBeTruthy();
  });

});
