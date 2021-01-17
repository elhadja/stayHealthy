import {browser, element, by} from 'protractor';

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
      element(by.id('email-input')).sendKeys('protractor@gmail.com');
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

  async generateDoctorProfil(): Promise<boolean> {
    const button = element(by.id('profil-form'));
    button.click().then( () => {
      element(by.id('doctor-profil')).click();
    } ).then(() => element(by.className('register-btn')).click() );
    return true;
  }

    async checkRegistration(): Promise<string> {
      return browser.findElement(by.css('simple-snack-bar')).getText();
    }
}
