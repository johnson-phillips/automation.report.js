import {Test} from './test';
import {Step} from './step';
import {Suite} from './suite';
let path = require('path');
let fs = require('fs');
import {htmlReport} from './htmlreport';
import {logger} from "./logger";

export class TestData {
 private test:Test = new Test();
 private suite:Suite = new Suite();
 private startTime:string = '';
 readonly rootDir:string = '';
 readonly reportDir:string  = '';
 readonly screenshotDir:any = '';
 private supportDrivers = ['Driver','ProtractorBrowser','thenableWebDriverProxy'];
 private screenShot:boolean = false;

    constructor() {
        try
        {
            this.startTime = new Date().toISOString();
            this.rootDir = getRoot();
            if (!fs.existsSync(this.rootDir + '/report/')){
            fs.mkdirSync(this.rootDir + '/report');
        }
        this.reportDir = this.rootDir + '/report/' + this.suite.id;
        this.screenshotDir = this.rootDir + '/report/' + this.suite.id + '/screenshots';
        logger.debug('dir for report data is ' + this.reportDir);
        fs.mkdirSync(this.reportDir);
        fs.mkdirSync(this.screenshotDir);
        } catch (e) {
            logger.fatal('error creating report folder. error message ' + e.toString());
        }
    }

    startTest(name:string, description:string)
    {
        this.test = new Test();
        this.test.success = true;
        this.startTime = new Date().toISOString();
        this.test.description = description;
        this.test.name = name;
        this.test.starttime = new Date().toISOString();
        this.test.endtime = new Date().toISOString();
        this.test.steps = [];
        this.suite.totaltests += 1;
    }

    /***
     * @param description - description of the step
     * @param err - if any error msg has to be pass, it can be string or any object including Error object. Pass null if there is no error
     * @param isApiorScreenshot - pass true, if you adding api request or response, this will ensure the html report will encapsulate this in a text area or pass the driver instance for ui tests to capture screenshot
     */
    addTestStep(description:string ,err:any, isApiorScreenshot?:any)
    {
        let step = new Step();
        try
        {

            step.name = description;
            step.description = description;
            step.starttime = this.startTime;
            this.startTime = new Date().toISOString();
            step.endtime =  this.startTime;
            if(err)
            {
                step.error = err;
                step.success = false;
                this.test.success = false;
                logger.error(description + ' ' + err);
            }
            else{
                logger.info(description);
            }
            const type = typeof isApiorScreenshot;
            switch (type) {
                case 'boolean':
                    step.isapi = isApiorScreenshot;
                    step.screenshot = null;
                    break;

                case 'string':
                    step.screenshot = isApiorScreenshot;
                    step.isapi = false;
                    break;
                case 'object':
                    if(this.supportDrivers.indexOf(isApiorScreenshot.constructor.name) > -1)
                {
                    if(err)
                    {
                        (async () => {
                            await isApiorScreenshot.takeScreenshot().then((img:any) => {
                                step.screenshot = img;
                            });
                            step.isapi = false;
                        })();
                    }
                    else
                    {
                        step.screenshot = this.addScreenShot(isApiorScreenshot);
                        step.isapi = false;
                    }


                }
                else{
                    logger.info(isApiorScreenshot.constructor.name + ' not found');
                }
                    break;
            }
            this.test.steps.push(step);
            this.suite.totalsteps += 1;
        } catch (e) {
            logger.error('error adding step. error message: ' + e.toString())
        }
    }

    addAssertStep(message:string, expected:any, actual:any, isApiorScreenshot?:any)
    {
        if(expected === actual){
            this.addTestStep(message + " expected:"+expected + " actual:" + actual,null,isApiorScreenshot);
        }
        else{
            this.addTestStep(message + " expected:" + expected + " actual:" + actual,"not equal",isApiorScreenshot);
        }
    }

    addAssertStepFailOnMismatch(message:string, expected:any, actual:any, isApiorScreenshot?:any)
    {
        if(expected === actual){
            this.addTestStep(message + " expected:"+expected + " actual:" + actual,null,isApiorScreenshot);
        }
        else{
            this.addTestStep(message + " expected:" + expected + " actual:" + actual,"not equal",isApiorScreenshot);
            throw new Error("not equal - expected:" + expected + " actual:" + actual);
        }
    }

    endTest()
    {
        this.test.endtime = new Date().toISOString();
        const test = this.test;
        if(this.test.success)
        {
            this.suite.totalpass += 1;
        }
    else {
        this.suite.totalfail += 1;
    }
        this.test = new Test();
        this.suite.tests.push(test);
        this.suite.endtime = new Date().toISOString();
        try
        {
            fs.writeFile(this.rootDir + '/report/' + this.suite.id + '/report.html', htmlReport(JSON.stringify(this.suite)), function (err:any) {
            if (err) throw err;
        });
        } catch (e) {
            logger.error('error creating html report. error message: ' + e.toString())
        }
        return test;
    }

    getSuite()
    {
        return this.suite;
    }

    addScreenShot(data:any) {
        let filename = Date.now() + '.png';
        try {
            data.takeScreenshot().then((img:any) => {
                fs.promises.writeFile(this.screenshotDir + '/' + filename, img, 'base64');
            });
        }
        catch (e) {
            logger.error('error saving screenshot. error message: ' + e.toString())
        }
        return filename;
    }

    binEncode(data:any) {
        var binArray = [];
        var datEncode = "";

        for (let i=0; i < data.length; i++) {
            binArray.push(data[i].charCodeAt(0).toString(2));
        }
        for (let j=0; j < binArray.length; j++) {
            var pad = padding_left(binArray[j], '0', 8);
            datEncode += pad + ' ';
        }
        function padding_left(s:any, c:any, n:any) { if (! s || ! c || s.length >= n) {
            return s;
        }
            var max = (n - s.length)/c.length;
            for (let i = 0; i < max; i++) {
                s = c + s; } return s;
        }
        //console.log(binArray);
    }

    setScreenshot(value:any){
        this.screenShot = value;
    }

    getReportDir()
    {
        return this.reportDir;
    }

    addSupportDriver(driver:string)
    {
        this.supportDrivers.push(driver);
        return this.supportDrivers;
    }
}


function getRoot() {
    let rootDir = __dirname.split(path.sep);
    let pathext = '';
    for(let i=0;i < rootDir.length ; i++){
        pathext += rootDir[i] + path.sep;
        if (fs.existsSync(pathext + 'package.json')) {
            logger.debug('dir for report data is ' + pathext);
            break;
        }
    }
    return pathext;

}
