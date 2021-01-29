import report from '../src/main';
import {browser} from "protractor";



describe("test", function(){
    it("test spec", async () => {
        report.deleteReportFolder();
        report.takeScreenShot = true;
        report.driver = browser;
        report.startTest('report library features','test to show report library features');
        await browser.waitForAngularEnabled(false);
        await browser.get("https://www.google.com/");
        await report.addTestStep('launch google',null);
        await browser.get("https://www.npmjs.com/package/automation.report");
        await report.addTestStep('launch npm',"error");
        report.endTest();
        
    })
})
