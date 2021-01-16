import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('ToolBar and SideNav Test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should check if SideNav exist', async () => {
    await page.navigateTo();
    expect(await page.getSideNav()).toBeTruthy();
  });

  it('should check if Home Button in SideNav', async () => {
    await page.navigateTo();
    expect(await page.getSideNavHomeButton()).toBeTruthy();
  });

  it('should check if ToolBar exist', async () => {
    await page.navigateTo();
    expect(await page.getToolBar()).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
