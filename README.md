# qe.automation.report
javascript library to create simple html report for test execution

usage:
```
let report = require("qe.automation.report");
```
To start capturing test data call startTest method and pass test name and description as parameters
```
report.testData.startTest(string,string);
example: report.testData.startTest('verify login','test to verify user can login');
```
To add test step, call addTestStep method. This method has 2 - 3 parameters based on different needs.
To add a simple step, call below method.
```
report.testData.addTestStep(string,null);
example: report.testData.addTestStep('call login api',null);
```
For ui tests to add test step with screenshot. Pass the driver object as third parameter
```
report.testData.addTestStep(string,null,driver);
ex: report.testData.addTestStep('step description',null,driver);
```
For api tests to add test step with request or response. Pass the true as third parameter.
```
report.testData.addTestStep(string,null,true);
ex: report.testData.addTestStep('request or response data',null,true);
```
To add test step with an error, call addTestStep and pass error/exception object. This will ensure this step is marked in red in the html report
```
report.testData.addTestStep(string,object);
ex: report.testData.addTestStep('step description','exception occured');
ex: report.testData.addTestStep('step description',new Error('some error'));
```
similarly for ui tests, to add test step with error or exception
```
report.testData.addTestStep(string,object,driver);
ex: report.testData.addTestStep('step description','pass error object here',driver);
```
To assert two values are equal, call addAssertStep method. Please note all asserts are strict comparison
```
report.testData.addAssertStep(string,expected,actual);
ex: report.testData.addAssertStep('verify two strings are equal','abc','ABC');
```
if the values are equal, the step is marked as green. If the values are not equal the step is marked in red.

To stop the execution of test further if an assertion fails call addAssertStepFailOnMismatch method

```
report.testData.addAssertStepFailOnMismatch(string,expected,actual);
ex: report.testData.addAssertStepFailOnMismatch('verify string are equal','abc','ABC');
```
this will throw an error if the two values are not equal.

To end the test call endTest
```
report.testData.endTest();
```

To get the object where all the tests data is saved call getSuite
```
let suite = report.testData.getSuite();
```

