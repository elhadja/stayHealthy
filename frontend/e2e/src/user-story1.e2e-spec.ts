import { UserStory1Po } from './user-story1.po';
import { LogInPage } from './login.po';
import {browser, by, element} from 'protractor';

describe('Use case 1', () => {
  let page: UserStory1Po;
  let login: LogInPage;

  beforeEach(() => {
    page = new UserStory1Po();
    login = new LogInPage();
  });

  it('As a patient I should login', async () => {
    await login.navigateTo();
    await login.fillForm('patient');
    await browser.sleep(500);

    await login.clickLoginButton();
    await browser.sleep(500);

    browser.getCurrentUrl().then(url => expect(url).toContain('patient'));
  });

  it('I should select one of all the type of health professional available', async () => {
    await element.all(by.css('mat-option')).count().then(async () => {
      for (let i = 1; i < 13 ; i++){
        browser.driver.findElement(by.className('mx-2')).click().then(() => {
          browser.waitForAngular();
          browser.driver.findElement(by.css(`mat-option:nth-of-type(${i + 1})>span`)).click();
        });
        await browser.sleep(500);
      }
    });
  });

  it('And for all available health professional, I should provide a location to find them', async () => {
    await element.all(by.css('mat-option')).count().then(async () => {
      for (let i = 1; i < 13 ; i++){
        await browser.driver.findElement(by.className('mx-2')).click().then(async () => {
          await browser.driver.findElement(by.css(`mat-option:nth-of-type(${i + 1})>span`)).click().then(async () => {
            await browser.findElement(by.id('location')).clear().then(async () => {
              await browser.findElement(by.id('location')).sendKeys('Pessac').then(async () => {
                await browser.findElement(by.className('search-btn')).click().then(async () => {
                  await browser.waitForAngular();
                  await browser.sleep(500);
                  await browser.findElement(by.className('cancel')).click();
                });
              });
            });
          });
        });
      }
    });
  });
});
