import { SignUpPage } from './signup.po';
import { browser, WebDriver } from 'protractor';

describe('StayHealty SignUp Page Test', () => {
    let page: SignUpPage;

    beforeEach(() => {
        page = new SignUpPage();
    });

    it('Should fill first name input element', () => {
        page.navigateTo();
        page.sendRegisterName();
    });
});
