import { browser, element, by } from 'protractor';

export class ProfilePage {
  async navigateTo(): Promise<unknown> {
    // Navigate to the profil page of the app
    return browser.get('/signup');
  }

  async sendRegisterFirstName(): Promise<void> {
    element(by.id('firstName-input')).sendKeys('test');
  }

  async sendRegisterLastName(): Promise<void> {
    element(by.id('lastName-input')).sendKeys('test');
  }

  async sendRegisterEmail(): Promise<void> {
    element(by.id('email-input')).sendKeys('test@email.com');
  }

  async sendRegisterPassword(): Promise<void> {
    element(by.id('password-input')).sendKeys('motdepasse');
  }

  async sendRegisterVerifyPassword(): Promise<void> {
    element(by.id('check-password-input')).sendKeys('motdepasse');
  }

  async sendRegisterPhoneNumber(): Promise<void> {
    element(by.id('phone-number-input')).sendKeys('0712547856');
  }

  async sendRegisterStreetNumber(): Promise<void> {
    element(by.id('street-number-input')).sendKeys('3');
  }

  async sendRegisterPostCode(): Promise<void> {
    element(by.id('post-code-input')).sendKeys('33000');
  }

  async sendRegisterCity(): Promise<void> {
    element(by.id('city-input')).sendKeys('Bordeaux');
  }

  async generatePatientProfil(): Promise<boolean> {
    const button = element(by.id('profil-form'));
    button.click().then( () => {
      element(by.id('patient-profil')).click();
    } ).then(() => element(by.className('register-btn')).click() );
    return true;
  }

  async generateDoctorProfil(): Promise<void> {
    const button = element(by.id('profil-form'));
    button.click().then( () => {
      element(by.id('doctor-profil')).click();
    } ).then(() => element(by.className('register-btn')).click() );
  }

  async checkRegistration(): Promise<string> {
    return element(by.css('simple-snack-bar')).getText();
  }

  async getHeadingText(): Promise<string> {
    // Get the profil page heading element reference
    return element(by.css('h1')).getText();
  }
  async sendFirstName(): Promise<void> {
    element(by.id('email-input')).sendKeys('update');
  }

  async sendPassword(): Promise<void> {
    element(by.id('password-input')).sendKeys('update');
  }

  async loginPatientProfil(): Promise<void> {
    browser.driver.findElement(by.css('button[type="submit"]')).click().then( () => {
      browser.waitForAngular();
    }).then(() => {
      browser.sleep(3000);
    });
  }

  async openSideBar(): Promise<void> {
    element(by.css('button[aria-label="Toggle sidenav"]>span:nth-of-type(1)>mat-icon')).click();
  }

  async selectProfilOption(): Promise<void> {
    element(by.css('mat-nav-list>a:nth-of-type(2)>div:nth-of-type(1)')).click();
  }

  async updateFirstName(): Promise<void> {
    await browser.sleep(500);
    await element(by.css('input[formControlName="firstName"]')).clear();
    await element(by.css('input[formControlName="firstName"]')).sendKeys('update');
  }

  async updatelastName(): Promise<void> {
    await element(by.css('input[formControlName="lastName"]')).clear();
    await element(by.css('input[formControlName="lastName"]')).sendKeys('update');
  }

  async updateEmail(): Promise<void> {
    await element(by.css('input[formControlName="email"]')).clear();
    await element(by.css('input[formControlName="email"]')).sendKeys('update@email.com');
  }

  async updatePassword(): Promise<void> {
    await element(by.css('input[formControlName="password"]')).clear();
    await element(by.css('input[formControlName="password"]')).sendKeys('motdepasse');
  }

  async updateRepeatPassword(): Promise<void> {
    await element(by.css('input[formControlName="password2"]')).clear();
    await element(by.css('input[formControlName="password2"]')).sendKeys('motdepasse');
  }

  async updateNumber(): Promise<void> {
    await element(by.css('input[formControlName="tel"]')).clear();
    await element(by.css('input[formControlName="tel"]')).sendKeys('0934566543');
  }

  async updateStreetNumber(): Promise<void> {
    await element(by.css('textarea')).clear();
    await element(by.css('textarea')).sendKeys('3');
  }

  async updatePostCode(): Promise<void> {
    await element(by.css('input[formControlName="postalCode"]')).clear();
    await element(by.css('input[formControlName="postalCode"]')).sendKeys('34000');
  }
  async updateCity(): Promise<void> {
    await element(by.css('input[formControlName="city"]')).clear();
    await element(by.css('input[formControlName="city"]')).sendKeys('toulouse');
  }

  async updateProfil(): Promise<void> {
    browser.driver.findElement(by.css('button[type="submit"]')).click().then( () => {
      browser.waitForAngular();
    });
  }

  async deleteProfil(): Promise<void> {
    await browser.sleep(1000);
    browser.driver.findElement(by.id('delete-btn')).click().then( () => {
      browser.waitForAngular();
      element(by.css('app-dialog>div:nth-of-type(1)>button:nth-of-type(2)>span:nth-of-type(1)')).click();
    });
  }

  async fillPatientForm(profile: string): Promise<void> {
    const email = 'test@email.com';
    await element(by.css('input[formControlName="email"]')).sendKeys(email);

    const pwd = 'motdepasse';
    await element(by.css('input[formControlName="password"]')).sendKeys(pwd);

    element(by.tagName('mat-select')).click().then( () => {
      browser.waitForAngular();
      element(by.css(`mat-option[value="${profile}"]`)).click().then( () => {
        browser.waitForAngular();
      });
    });
  }
}
