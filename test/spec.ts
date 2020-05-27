import {report} from '../src/main';


async function test() {
    report.testData.startTest('report library features','test to show report library features');
    await report.testData.addTestStep('this is addTestStep method',null);
    await report.testData.addTestStep('this is addTestStep with screenshot',null,'imagename');
    await report.testData.addTestStep('this is addTestStep with api true',null,true);
    await report.testData.addAssertStep('this is addAssertStep method','abc','ABC');
    await report.testData.addAssertStep('this is addAssertStep method','abc','abc');
    await report.testData.endTest();
}

( async () => {
    await test();
})();
