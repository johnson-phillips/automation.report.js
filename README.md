# qe.automation.report
javascript library to create html and json data for test execution

usage:
```
let report = require("../src/main");
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
console.log(JSON.stringify(report.testData.getSuite()));
```
