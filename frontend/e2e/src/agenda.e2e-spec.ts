import {browser} from 'protractor';
import { AgendaPage } from './agenda.po';
import { DoctorPage } from './doctor.po';
import { LogInPage } from './login.po';

describe('StayHealthy Agenda Page Test', () => {

  it('Should access to agenda', async () => {
    const page = new AgendaPage();
    const loginPage = new LogInPage();
    await page.init();

    await browser.sleep(500);
    await browser.get('/agenda');
    expect(await page.getEmptySlots()).toBeTruthy();
    // disconnect
    await browser.sleep(500);
    await loginPage.clickDisconnectButton();
    await browser.sleep(500);
  });

  it('Should book a slot', async () => {
    const doctorPage = new DoctorPage();
    const loginPage = new LogInPage();
    const page = new AgendaPage();
    // create a slot
    await browser.get('/login');
    await browser.sleep(500);
    await page.connectUser('test@live.com', 'mdp', 'doctor');
    await browser.sleep(500);
    await doctorPage.fillForm(10, 0);
    await doctorPage.clickSaveButton();
    await browser.sleep(2500);
    await loginPage.clickDisconnectButton();
    await browser.sleep(500);
    // book a slot now
    await page.init();
    await browser.sleep(500);
    await page.searchDoctor('Muller');
    await browser.sleep(1000);
    await page.bookSlot();
    await browser.sleep(500);
    await browser.getCurrentUrl().then(url => expect(url).toContain('agenda'));
    // disconnect
    await browser.sleep(500);
    await loginPage.clickDisconnectButton();
    await browser.sleep(500);
  });

  it('Should cancel the slot', async () => {
    const page = new AgendaPage();
    const loginPage = new LogInPage();
    await page.init();

    // cancel a slot now
    await browser.sleep(500);
    await browser.get('/agenda');
    await browser.sleep(500);
    await page.cancelBook();
    await browser.sleep(500);
    expect(await page.getEmptySlots()).toBeTruthy();
    // disconnect
    await browser.sleep(500);
    await loginPage.clickDisconnectButton();
  });
});
