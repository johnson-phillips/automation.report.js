const {By, Key, until, Capabilities} = require('selenium-webdriver');
import {report} from '../src/main';
const UI = require('qe.automation.ui');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

afterEach(async function () {
    await report.testData.endTest();
});
describe('ui test', async function () {
    it("should launch google and enter search test", async function() {
        await report.testData.startTest('browser test','browser test');
        let browser = new UI(Capabilities.chrome());
        await browser.driver.get('http://www.google.com/ncr');
        await report.testData.addTestStep('launch browser',null,browser.driver);
        try {
            await browser.driver.findElement(By.xpath('//*[@name="q"]')).sendKeys('webdriver', Key.RETURN);
            await report.testData.addTestStep('enter search data',null,browser.driver);
            await browser.driver.wait(until.titleIs('webdriver - Google Search'), 1000);
            await report.testData.addTestStep('wait for results to show',null,browser.driver);
        } finally {
            await browser.driver.quit();
        }
    });
})

describe('simple test to show report features', function () {
    it("show all method examples", async function() {
        report.testData.startTest('report library features','test to show report library features');
        report.testData.addTestStep('this is addTestStep method',null);
        report.testData.addTestStep('this is addTestStep with screenshot',null,'imagename');
        report.testData.addTestStep('this is addTestStep with api true',null,true);
        report.testData.addAssertStep('this is addAssertStep method','abc','ABC');
        report.testData.addAssertStep('this is addAssertStep method','abc','abc');

    });
})
