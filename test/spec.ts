import report from '../src/main';

report.deleteReportFolder();
report.startTest('report library features','test to show report library features');
report.addTestStep('this is addTestStep method',null);
report.addTestStep('this is addTestStep with api true',null,true);
report.strictEqual('verify abc = ABC','abc','ABC');
report.notStrictEqual('verify abc not equal to abc','abc','abc');
report.strictEqual('verify abc = abc','abc','abc');
report.notStrictEqual('verify abc not equal to ABC','abc','ABC');
report.endTest();
