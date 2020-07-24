# automation.report
javascript library to create simple html report for api or ui test execution

usage 
```
let report = require("automation.report").default;
```
usage typescript:
```
import report from "automation.report";
```
Sample Report:
http://www.myappquality.com/

Current date time is used to create report folder. To delete all report folders before any test execution call deleteReportFolder
```
report.deleteReportFolder();
```

To capture screenshots assign webdriver istance to driver property of report object.
```
report.driver = selenium webdriver instance
```
if you ar using protractor:
```
report.driver = browser.driver;
```
There is a flag to disable screenshot if need be. It is true by default
```
report.takeScreenShot = false;
```
To start capturing test data call startTest method and pass test name and description as parameters. HTML report gets generated/updated every time endTest method is called.
```
report.startTest(string,string);
example: report.startTest('verify login','test to verify user can login');
```
To add test step, call addTestStep method. This method has boolean parameters based on different needs.
To add a simple step, call below method.
```
report.addTestStep(string,null);
example: report.addTestStep('logged in with username and password',null);
```
For api tests to add test step with request or response. Pass true as third parameter.
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
similarly for api tests, to add test step with error or exception
```
report.addTestStep(string,object,true);
ex: report.addTestStep('step description','pass error object here',true);
```
To assert two values are equal, call strictEqual method.
```
report.strictEqual(string,expected,actual);
ex: report.strictEqual('verify two strings are equal','abc','ABC');
```
if the values are equal, the step is marked as green. If the values are not equal the step is marked in red.

To assert two values are not equal, call notStrictEqual method.
```
report.notStrictEqual(string,expected,actual);
ex: report.notStrictEqual('verify two strings are equal','abc','ABC');
```
if the values are not equal, the step is marked as green. If the values are equal the step is marked in red.


To end the test call endTest
```
report.endTest();
```

To get the object of tests call getSuite
```
let suite = report.getSuite();
```

sample code to generate html report:
```
let report = require("automation.report").default;
report.deleteReportFolder();
report.startTest('report library features','test to show report library features');
report.addTestStep('this is addTestStep method',null);
report.addTestStep('this is addTestStep with api true',null,true);
report.strictEqual('verify abc = ABC','abc','ABC');
report.notStrictEqual('verify abc not equal to abc','abc','abc');
report.strictEqual('verify abc = abc','abc','abc');
report.notStrictEqual('verify abc not equal to ABC','abc','ABC');
report.endTest();
```