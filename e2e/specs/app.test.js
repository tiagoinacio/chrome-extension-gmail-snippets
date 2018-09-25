const fs = require('fs');
const path = require('path');

const secret = JSON.parse(fs.readFileSync(path.join(__dirname, '../.secret'), 'utf8'));

describe('Chrome Extension Gmail Snippets', () => {

    // Login
    beforeEach(() => {
        browser.url('https://mail.google.com/');
        browser.pause(2000);
        browser.setValue('input[type=email]', secret.username);
        browser.pause(2000);
        browser.element('span*=Seguinte').click();
        browser.pause(2000);
        browser.setValue('input[type=password]', secret.password);
        browser.pause(1000);
        browser.element('span*=Seguinte').click();
        browser.pause(6000);
    });

    it('should have the extension loaded', () => {
        // Open compose box
        browser.url('https://mail.google.com/mail/#inbox?compose=new');
        browser.pause(3000);

        // Box should be empty
        browser.element('div[aria-label="Message Body"]').getText().should.be.equal('');

        // Open extension
        browser.element('.inboxsdk__button_icon').click();
        browser.pause(2000);

        const iframe = browser.element('iframe[class="iframe"]').value;
        // Switch context to iframe so we can target elements
        browser.frame(iframe);

        // Select the first template
        browser.element('.list .item').click();
        browser.pause(2000);

        // The box should contain the template text
        browser.element('div[aria-label="Message Body"]').getText().should.be.equal('Hello,\nThank you for your reply.\nBest regards, John Doe');
    });
});
