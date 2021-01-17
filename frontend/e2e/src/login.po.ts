import { browser, element, by } from 'protractor';

export class LogInPage {
  async navigateTo(): Promise<unknown> {
    return browser.get('/login');
  }

  async fillForm(profile: string): Promise<void> {
    const email = 'test@email.com';
    await element(by.css('input[formControlName="email"]')).sendKeys(email);

    const pwd = 'mdp';
    await element(by.css('input[formControlName="password"]')).sendKeys(pwd);

    element(by.tagName('mat-select')).click().then( () => {
      browser.waitForAngular();
      element(by.css(`mat-option[value="${profile}"]`)).click().then( () => {
        browser.waitForAngular();
      });
    });
  }

  async clickLoginButton(): Promise<void> {
    browser.driver.findElement(by.css('button[type="submit"]')).click().then( () => {
      browser.waitForAngular();
    });
  }

  async clickDisconnectButton(): Promise<void> {
    browser.driver.findElement(by.css('button[aria-label="Toggle sidenav"]')).click().then(() => {
      browser.waitForAngular();
      element(by.css(`a[routerLink="/"]`)).click().then(() => {
        browser.waitForAngular();
      });
    });
  }
}
