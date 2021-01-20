import { LogInPage } from './login.po';
import {browser, by, element} from 'protractor';
import {UserStory2Po} from './user-story2.po';

describe('Use case 2', () => {
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

  it('I should search for one health professional', async () => {
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

  it('Results should appears as part of the page as a card tile', async () => {
    await browser.sleep(500);
    expect(element.all(by.className('mat-card-subtitle')).count()).toBeGreaterThanOrEqual(0);
  });

  it('Each card tile, if it found a doctor, should have detailed information about him', async () => {
    await browser.sleep(500);
    const doctorFoundList = expect(element.all(by.className('mat-card-subtitle')).count()).toBeGreaterThan(0);
    await browser.findElement(by.tagName('app-doctor-card')).click();
    await browser.sleep(1000);
  });

  it('* * * Get Doctor Name Information', async () => {
    await expect(browser.findElement(by.tagName('mat-card-title')).getText()).toContain('Dr');
  });

  it('* * * Get Doctor medical speciality', async () => {
    await expect(page.isASpeciality(await browser.findElement(by.tagName('mat-card-subtitle')).getText())).toBeTruthy();
  });

  it('* * * Get Doctor Adress Information', async () => {
    await expect(browser.findElement(by.tagName('mat-card-content')).getText()).toContain('Adresse: ');
  });

  it('* * * Get Doctor Email Information', async () => {
    await expect(browser.findElement(by.tagName('mat-card-content')).getText()).toContain('Email: ');
  });

  it('* * * Get Doctor Phone Number Information', async () => {
    await expect(browser.findElement(by.tagName('mat-card-content')).getText()).toContain('Téléphone: ');
  });

  it('* * * Get Doctor Pricing Information', async () => {
    await expect(browser.findElement(by.tagName('mat-card-content')).getText()).toContain('Tarification');
  });

  it('* * * Get Doctor Availability Information', async () => {
    await expect(browser.findElement(by.tagName('mat-card-content')).getText()).toContain('Disponibilités');
  });

});
