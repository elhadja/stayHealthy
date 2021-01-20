import { browser, element, by } from 'protractor';

export class LogInPage {
  async navigateTo(): Promise<unknown> {
    return browser.get('/login');
  }

  async putEmail(email: string): Promise<void> {
    await element(by.css('input[formControlName="email"]')).sendKeys(email);
    await browser.sleep(500);
  }

  async putPassword(password: string): Promise<void> {
    await element(by.css('input[formControlName="password"]')).sendKeys(password);
  }

  async selectProfile(profile: string): Promise<void> {
    element(by.tagName('mat-select')).click().then( () => {
      browser.waitForAngular();
      element(by.css(`mat-option[value="${profile}"]`)).click().then( () => {
        browser.waitForAngular();
      });
    });
  }

  async fillForm(profile: string): Promise<void> {
    await this.putEmail('login@email.com');
    await this.putPassword('motdepasse');
    await this.selectProfile(profile);
  }

  async clickLoginButton(): Promise<void> {
    browser.driver.findElement(by.css('button[type="submit"]')).submit().then( () => {
      browser.waitForAngular();
    });
  }

  async clickDisconnectButton(): Promise<void> {
    browser.driver.findElement(by.css('button[aria-label="Toggle sidenav"]')).click().then(() => {
      browser.waitForAngular();
    });
    await browser.sleep(500);
    element(by.className('disconnect')).click().then( () => {
      browser.waitForAngular();
    });
  }

  async getEmailError(): Promise<boolean> {
    const errorMsg = (await browser.driver.findElement(by.id('email-err')).getText());
    return errorMsg === 'Email invalide' || errorMsg === 'Saisissez votre email';
  }

  async getPasswordError(): Promise<boolean> {
    const errorMsg = (await browser.driver.findElement(by.id('password-err')).getText());
    return errorMsg === 'Saisissez votre mot de passe';
  }

  async getProfileError(): Promise<boolean> {
    const errorMsg = (await browser.driver.findElement(by.id('profile-err')).getText());
    return errorMsg === 'Mentionnez votre profil';
  }

  async getLoginError(): Promise<boolean> {
    browser.waitForAngularEnabled();
    const errorMsg = (await browser.driver.findElement(by.id('login-err')).getText());
    return errorMsg === 'mot de passe ou email incorrect';
  }
}
