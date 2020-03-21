const {Builder, By, Key, until, Capabilities} = require('selenium-webdriver');
import {report} from '../src/main';
const UI = require('qe.automation.ui');

report.logger.level = 'all';
(async function example() {
    report.testData.startTest('browser test','browser test');

    let browser = new UI(Capabilities.chrome());
    try {
        await browser.driver.get('http://www.google.com/ncr');
        report.testData.addTestStep('launch browser',null,browser.driver);
        await browser.driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        report.testData.addTestStep('enter search data',null,browser.driver);
        await browser.driver.wait(until.titleIs('webdriver - Google Search'), 1000);
        report.testData.addTestStep('wait for results to show',null,browser.driver);

        report.testData.endTest();
    } finally {
        await browser.driver.quit();
    }
})();
