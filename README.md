# qe.automation.report
javascript library to create html and json data for test execution

usage:
```
var testData = require('qe.automation.report').TestData;
testData.startTest('my test','this is intial test');
testData.addTestStep('begin test');
testData.addAssertStep('verify string','abc','ABC');
testData.addAssertStep('verify string','abc','abc');
testData.addAssertStepFailOnMismatch('verify number',1,1);
testData.addAssertStep('verify test',13,123);
testData.endTest();
```
