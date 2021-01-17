import { SignUpPage } from './signup.po';
import {browser, logging, WebDriver} from 'protractor';

describe('StayHealty SignUp Page Test', () => {
    let page: SignUpPage;

    beforeEach(() => {
        page = new SignUpPage();
    });

    it('Should fill register form input elements then register fake patient', async () => {

      await page.navigateTo();
      await page.sendRegisterFirstName();
      await page.sendRegisterLastName();
      await page.sendRegisterEmail();
      await page.sendRegisterPassword();
      await page.sendRegisterVerifyPassword();
      await page.sendRegisterPhoneNumber();
      await page.sendRegisterStreetNumber();
      await page.sendRegisterPostCode();
      await page.sendRegisterCity();
      await page.generatePatientProfil();
    });

    afterEach(async () => {
      // Assert that there are no errors emitted from the browser
      const logs = await browser.manage().logs().get(logging.Type.BROWSER);
      const value = expect(logs).not.toContain(jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry));
    });
});

