import { ProfilePage } from './profile.po';
import { LogInPage} from './login.po';
import { browser } from 'protractor';

describe('Patient profil page CRUD tests',  () => {
  let loginPage: LogInPage;
  let page: ProfilePage;

  beforeEach(() => {
    page = new ProfilePage();
    loginPage = new LogInPage();
  });

  it('should create a fake patient', async () => {

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

  it('Should connect the fake patient', async () => {
    await loginPage.navigateTo();
    await page.fillPatientForm('patient');
    await browser.sleep(500);

    await loginPage.clickLoginButton();
    await browser.sleep(500);

    browser.getCurrentUrl().then(url => expect(url).toContain('patient'));
  });

  it('Should read fake patient profil page', async () => {
    await page.openSideBar().then(async () => {
      browser.waitForAngular();
      await browser.sleep(1000);
      await page.selectProfilOption();
    });
  });

  it('Should update fake patient profil', async () => {
    await page.updateFirstName();
    await browser.sleep(1000);
    await page.updatelastName();
    await browser.sleep(1000);
    // await page.updateEmail();
    await browser.sleep(1000);
    await page.updatePassword();
    await browser.sleep(1000);
    await page.updateRepeatPassword();
    await browser.sleep(1000);
    await page.updateNumber();
    await browser.sleep(1000);
    await page.updateStreetNumber();
    await browser.sleep(1000);
    await page.updatePostCode();
    await browser.sleep(1000);
    await page.updateCity();
    await page.updateProfil();
  });

  it('Should navigate to patient fake profil page', async () => {
    await page.openSideBar().then(async () => {
      browser.waitForAngular();
      await browser.sleep(1000);
      await page.selectProfilOption();
      await browser.sleep(1000);
    });
  });

  it('Should delete fake patient profil', async () => {
    await page.deleteProfil();
    await browser.sleep(1000);
  });
});
