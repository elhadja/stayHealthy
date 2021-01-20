import { StayHealthyPage } from './homepage.po';
import {browser, by, element} from 'protractor';

describe('Use case 4', () => {
  let login: StayHealthyPage;

  beforeEach(() => {
    login = new StayHealthyPage();
  });

  it('Non logged user should not acces to patient web app profil', async () => {
    await expect(browser.get('/patient').then( async () => {
      await expect(browser.getCurrentUrl()).not.toContain('/patient');
    }));
  });

  it('Non logged user should not acces to doctor web app profil', async () => {
    await expect(browser.get('/doctor').then( async () => {
      await expect(browser.getCurrentUrl()).not.toContain('/doctor');
    })).toBeFalsy();
  });
});
