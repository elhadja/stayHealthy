import {browser, element, by, protractor} from 'protractor';
import {addDays} from 'date-fns';

export class DoctorPage {

  async init(): Promise<void> {
    await browser.get('/login');
    const email = 'login@email.com';
    await element(by.css('input[formControlName="email"]')).sendKeys(email);
    const password = 'motdepasse';
    await element(by.css('input[formControlName="password"]')).sendKeys(password);
    element(by.tagName('mat-select')).click().then( () => {
      browser.waitForAngular();
      element(by.css(`mat-option[value="doctor"]`)).click().then( () => {
        browser.waitForAngular();
      });
    });
    await browser.sleep(500);

    browser.driver.findElement(by.css('button[type="submit"]')).click().then( () => {
      browser.waitForAngular();
    });
    await browser.sleep(500);
  }

  async checkViewFormat(format: string): Promise<boolean> {
    element(by.className(format)).click().then( () => {
      browser.waitForAngular();
    });
    await browser.sleep(500);
    return element(by.tagName(`mwl-calendar-${format}-view`)).isPresent();
  }

  async selectTime(model: string, value: string|number): Promise<void> {
    await element(by.css(`mat-select[formControlName="${model}"] .mat-select-arrow`)).click().then(async () => {
      browser.waitForAngular();
      await browser.sleep(500);
      await element(by.css(`mat-option[ng-reflect-value="${value}"]`)).click().then( () => {
        browser.waitForAngular();
      });
      await browser.sleep(500);
    });
  }

  async fillForm(): Promise<void> {
    // Select date
    let date = new Date();
    if (date.getDay() === 6) {
      date = addDays(date, 2);
    } else {
      date = addDays(date, 1);
    }
    date.setHours(8, 0, 0);
    // Convert date to string
    const dateStr = date.toLocaleDateString('fr-FR',
      {day: 'numeric', month: 'long', year: 'numeric'});
    browser.driver.findElement(by.css('.mat-datepicker-toggle')).click().then(async () => {
      await browser.waitForAngular();
      await browser.sleep(500);
      await element(by.css(`.cdk-overlay-container mat-month-view [aria-label="${dateStr}"]`)).click().then(async () => {
        browser.waitForAngular();
      });
    });
    await browser.sleep(1000);

    // select time
    await this.selectTime('hour', 8);
    await this.selectTime('minute', 0);
  }

  async clickSaveButton(): Promise<void> {
    browser.driver.findElement(by.css('button[type="submit"]')).submit().then( () => {
      browser.waitForAngular();
    });
  }

  async selectDateInCalendar(): Promise<void> {
    await browser.sleep(500);
    element(by.css('.cal-cell-top aria-label=" mardi janvier 19, One event, click to expand "')).click().then( () => {
      browser.waitForAngular();
    });
  }
  async checkForCreation(): Promise<string> {
    const EC = protractor.ExpectedConditions;
    const snackBar = element(by.css('simple-snack-bar'));
    await browser.wait(EC.visibilityOf(snackBar), 1000);
    return element(by.css('simple-snack-bar')).getText();
  }

  async getReqFieldError(id: string): Promise<boolean> {
    browser.waitForAngularEnabled();
    const errorMsg = (await browser.driver.findElement(by.id(id)).getText());
    return errorMsg === 'Champ Obligatoire';
  }

  async getDuplicationError(): Promise<boolean> {
    browser.waitForAngularEnabled();
    const errorMsg = (await element(by.id('save-error')).getText());
    return errorMsg === 'créneau déjà existant';
  }
}
