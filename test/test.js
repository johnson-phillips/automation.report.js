let testData = new require("../src/index").TestData;
let logger = require('../src/index').logger;

console.log(testData.getSuite());
testData.startTest('my test','this is intial test');
testData.addTestStep('begin test');
testData.addAssertStep('verify string','abc','ABC');
testData.addAssertStep('verify string','abc','abc');
testData.addAssertStepFailOnMismatch('verify number',1,1);
testData.addAssertStep('verify test',13,123);
testData.endTest();
console.log(testData.getSuite());



