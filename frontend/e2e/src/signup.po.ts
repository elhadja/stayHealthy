import { browser, element, by, Key } from 'protractor'

export class SignUpPage {
    navigateTo() {
        return browser.get('/signin');
    }

    sendRegisterName() {
        let randomString = Math.random().toString(36).substr(2, 7);
        element(by.className('firstName-input')).sendKeys('protractor'+randomString);
        browser.pause;
    }
}