import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getSideNav(): Promise<boolean> {
    return element(by.css('mat-sidenav-content>mat-toolbar')).isPresent();
  }

  async getSideNavHomeButton(): Promise<boolean> {
    return element(by.css('mat-nav-list>a>div:nth-of-type(1)')).isPresent();
  }

  async getToolBar(): Promise<boolean> {
    return element(by.css('mat-sidenav>div:nth-of-type(1)')).isPresent();
  }
}
