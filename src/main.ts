import {TestData} from "./test-data";
import logger from "./logger";
export {TestData,logger,CustomJasmineReporter,CustomMochaReporter};
const report = new TestData();
export default report;

//custom Mocha Reporter
function CustomMochaReporter (runner:any, options:any) {
      runner.on('test', function(test:any) {
        const title = test.parent?.title || 'data not available';
          report.startTest(title,test.title);
        });
        runner.on('test end', function(test:any) {
          report.endTest();
        });
        runner.on('fail', function(test:any,err:any) {
            report.addTestStep(test.title + ' failed',err);
        });
        runner.on('pass', function(test:any) {
            report.addTestStep(test.title + ' ' + test.state,'');
        });
  }

  //Custom Jasmine Reporter
class CustomJasmineReporter {
  groupByDescribe:boolean = false;
    constructor(groupByDescribe:boolean){
      this.groupByDescribe = groupByDescribe;
    }

  suiteStarted(result:any){
    if(this.groupByDescribe){
      report.startTest(result.fullName,result.fullName);
    }
  }
  suiteDone(result:any){
    if(this.groupByDescribe){
      report.endTest();
    }
  }
 specStarted(result:any) {
        if(!this.groupByDescribe){
          report.startTest(result.fullName.replace(result.description,''),result.description);
        }
    }
 specDone(result:any) {
        for(var i = 0; i < result.failedExpectations.length; i++) {
            const msg = result.failedExpectations[i].message;
            report.addTestStep( msg, msg);
        }
        report.addTestStep( result.description  + ' ' +  result.status,'');
        if(!this.groupByDescribe){
          report.endTest();
        }
      }
}