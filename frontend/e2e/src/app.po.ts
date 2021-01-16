import { browser, by, element } from 'protractor';

export class StayHealthyPage {
  async navigateTo(): Promise<unknown> {
    // Navigate to the home page of the app
    return browser.get(browser.baseUrl);
  }

  async getHeadingText(): Promise<string> {
    // Get the home page heading element reference
    return element(by.css('mat-sidenav-content>mat-toolbar>a')).getText();
  }

  async getTitleText(): Promise<string> {
    // Get the home page title element reference
    return element(by.css('b')).getText();
  }

  async getHomeMessage(): Promise<string> {
    // Get the home page message element reference
    return element(by.css('h3')).getText();
  }

  async getSignUpButton(): Promise<string> {
    // test the home page sign up button element 
    let button = element(by.className('signin-btn'));
    return button.getText();
  }

  async getLoginButton(): Promise<string> {
    // test the home page login button element 
    let button = element(by.className('login-btn'));
    return button.getText();
  }

  async clickSignUpButton(): Promise<string> {
    // click the home page sign up button 
    let button = element(by.className('signin-btn'));
    button.click();
    var urlChanged = function() {
      return browser.getCurrentUrl().then(function(url) {
        return url
      });
    };

    return urlChanged().then((value) => value)
  }
  

}
