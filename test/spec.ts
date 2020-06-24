import {TestData} from "../src/testdata";
import logger from "../src/logger";

async function test() {

    global.report = {
        testData: new TestData(),
        logger: logger
    };
    global.report.testData.deleteReportFolder();
    global.report.testData.startTest('report library features','test to show report library features');
    await global.report.testData.addTestStep('this is addTestStep method',null);
    await global.report.testData.addTestStep('this is addTestStep with screenshot',null,'imagename');
    await global.report.testData.addTestStep('this is addTestStep with api true',null,true);
    await global.report.testData.addAssertStep('verify abc = ABC','abc','ABC');
    await global.report.testData.addAssertStep('verify abc = abc','abc','abc');
    await global.report.testData.endTest();
}

( async () => {
    await test();
})();
