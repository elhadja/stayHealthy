import {browser, element, by, WebDriver, ExpectedConditions} from 'protractor';

export class SignUpPage {
  async navigateTo(): Promise<unknown> {
    return browser.get('/signup');
  }

  async sendRegisterFirstName(): Promise<void> {
    element(by.id('firstName-input')).sendKeys('protractor');
  }

  async sendRegisterLastName(): Promise<void> {
    element(by.id('lastName-input')).sendKeys('protractor');
  }

  async sendRegisterEmail(): Promise<void> {
    const randMail = Math.random().toString(36).substr(2, 7);
    element(by.id('email-input')).sendKeys(randMail + '@gmail.com');
  }

  async sendRegisterPassword(): Promise<void> {
    element(by.id('password-input')).sendKeys('protractor');
  }

  async sendRegisterVerifyPassword(): Promise<void> {
    element(by.id('check-password-input')).sendKeys('protractor');
  }

  async sendRegisterPhoneNumber(): Promise<void> {
    element(by.id('phone-number-input')).sendKeys('0712547856');
  }

  async sendRegisterStreetNumber(): Promise<void> {
    element(by.id('street-number-input')).sendKeys('3 Rue Louis Jouvet');
  }

  async sendRegisterPostCode(): Promise<void> {
    element(by.id('post-code-input')).sendKeys('33600');
  }

  async sendRegisterCity(): Promise<void> {
    element(by.id('city-input')).sendKeys('Pessac');
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
}
