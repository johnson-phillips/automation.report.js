const {Builder, By, Key, until} = require('selenium-webdriver');
const report = require("../src/main");

report.logger.level = 'all';
(async function example() {
    report.testData.startTest('browser test','browser test');

    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://www.google.com/ncr');
        report.testData.addTestStep('launch browser',null,driver);
        await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        report.testData.addTestStep('enter search data',null,driver);
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
        report.testData.addTestStep('wait for results to show',null,driver);

        report.testData.endTest();
    } finally {
        await driver.quit();
    }
})();
