import { browser, element, by } from 'protractor';

export class SignUpPage {
    async navigateTo(): Promise<unknown> {
        return browser.get('/signin');
    }

    async sendRegisterName(): Promise<void> {
        const randomString = Math.random().toString(36).substr(2, 7);
        element(by.className('firstName-input')).sendKeys('protractor' + randomString);
    }
}
