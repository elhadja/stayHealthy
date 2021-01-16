import { StayHealthyPage } from './app.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('stayhealthy App', () => {
  let page: StayHealthyPage;

  beforeEach(() => {
    page = new StayHealthyPage();
  });
  // Test Home Page Elements
  
  it('should display the home page heading saying StayHealthy', async () => {
    await page.navigateTo();
    expect(await page.getHeadingText()).toEqual('StayHealthy');
  });

  it('should display the home page title saying StayHealthy', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('StayHealthy');
  });

  it('should display the home page message', async () => {
    await page.navigateTo();
    expect(await page.getHomeMessage()).toEqual('Trouvez un Professionnel de santé et gérez vos rendez-vous facilement');
  });

  it('should check if sign in button exist', async () => {
    await page.navigateTo();
    expect(await page.getSignUpButton()).toEqual("S'enregistrer");
  });

  it('should click on sign in button then redirect to signin page', async () => {
    await page.navigateTo();
    expect(await page.clickSignUpButton()).toEqual("http://localhost:4200/");
  });
  
  it('should get log in button', async () => {
    await page.navigateTo();
    expect(await page.getLoginButton()).toEqual("Se connecter");
  });



  

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
