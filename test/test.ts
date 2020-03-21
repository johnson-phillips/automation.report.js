import {report} from "../src/main";

report.logger.level = 'info';
report.testData.startTest('my test','this is intial test');
report.testData.addTestStep('begin test',null);
report.testData.addTestStep('begin test',null,'imagename');
report.testData.addTestStep('begin test',null,true);
report.testData.addAssertStep('verify string','abc','ABC');
report.testData.addAssertStep('verify string','abc','abc');
report.testData.addAssertStepFailOnMismatch('verify number',1,1);
report.testData.addAssertStep('verify test',13,123);
report.testData.endTest();
