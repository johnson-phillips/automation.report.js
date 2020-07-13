# automation.report
javascript library to create simple html report for test execution

usage:
```
let report = require("automation.report");
```
usage typescript:
```
import report from "automation.report";
```
Sample Report:
http://www.myappquality.com/

To start capturing test data call startTest method and pass test name and description as parameters.HTML report gets generated/updated every time endTest method is called.
```
report.startTest(string,string);
example: report.startTest('verify login','test to verify user can login');
```
To add test step, call addTestStep method. This method has 2 - 3 parameters based on different needs.
To add a simple step, call below method.
```
report.addTestStep(string,null);
example: report.addTestStep('call login api',null);
```
For ui tests to add test step with screenshot. Pass the driver(selenium webdriver) object as third parameter
```
report.addTestStep(string,null,driver);
ex: report.addTestStep('step description',null,driver);
```
For api tests to add test step with request or response. Pass the true as third parameter.
```
report.addTestStep(string,null,true);
ex: report.addTestStep('request or response data',null,true);
```
To add test step with an error, call addTestStep and pass error/exception object. This will ensure this step is marked in red in the html report
```
report.addTestStep(string,object);
ex: report.addTestStep('step description','exception occured');
ex: report.addTestStep('step description',new Error('some error'));
```
similarly for ui tests, to add test step with error or exception
```
report.addTestStep(string,object,driver);
ex: report.addTestStep('step description','pass error object here',driver);
```
To assert two values are equal, call addAssertStep method. Please note all asserts are strict comparison
```
report.addAssertStep(string,expected,actual);
ex: report.addAssertStep('verify two strings are equal','abc','ABC');
```
if the values are equal, the step is marked as green. If the values are not equal the step is marked in red.

To stop the execution of test further if an assertion fails call addAssertStepFailOnMismatch method

```
report.addAssertStepFailOnMismatch(string,expected,actual);
ex: report.addAssertStepFailOnMismatch('verify string are equal','abc','ABC');
```
this will throw an error if the two values are not equal.

To end the test call endTest
```
report.endTest();
```

To get the object where all the tests data is saved call getSuite
```
let suite = report.getSuite();
```
Current date time is used to create report folder. To delete all report folders before any test execution call deleteReportFolder
```
report.deleteReportFolder();
```
