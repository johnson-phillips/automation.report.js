import report, {logger} from '../src/main';

async function test() {
    report.deleteReportFolder();
    report.startTest('report library features','test to show report library features');
    await report.addTestStep('this is addTestStep method',null);
    await report.addTestStep('this is addTestStep with screenshot',null,'imagename');
    await report.addTestStep('this is addTestStep with api true',null,true);
    await report.addAssertStep('verify abc = ABC','abc','ABC');
    await report.addAssertStep('verify abc = abc','abc','abc');
    await report.endTest();
}

( async () => {
    await test();
})();
