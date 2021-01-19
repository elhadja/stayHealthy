import { SignUpPage } from './signup.po';
import {browser, logging, WebDriver} from 'protractor';

describe('Sign In Test', () => {
  let page: SignUpPage;

  beforeEach(() => {
    page = new SignUpPage();
  });

  it('should register a fake patient', async () => {

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
    await browser.sleep(1500);
  });

  it('should check if the fake patient registration succeed ', async () => {

    expect(await page.checkRegistration()).toEqual('Inscription réussie');

  });

  it('should register a fake doctor', async () => {

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
    await page.generateDoctorProfil();
    await browser.sleep(1500);
  });

  it('should check if the fake doctor registration succeed ', async () => {

    expect(await page.checkRegistration()).toEqual('Inscription réussie');

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

