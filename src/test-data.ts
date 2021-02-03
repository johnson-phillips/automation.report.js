import * as path from "path";
import * as assert from "assert";``
import * as fs from "fs-extra";
import Test from './test';
import Step from './step';
import Suite from './suite';
import htmlReport from './html-report';
import logger from "./logger";
import * as crypto from "crypto";

export class TestData {
 private test:Test = new Test();
 private suite:Suite = new Suite();
 private startTime:string = '';
 private fileName:string = 'report';
 driver:any;
 readonly reportDir:string  = '';
 readonly currentReportDir:string  = '';
 readonly screenshotDir:any = '';
 private supportDrivers = ['Driver','ProtractorBrowser','thenableWebDriverProxy'];
 takeScreenShot:boolean = true;
 logApi:boolean = process.env.logApi == "true" || false;

    constructor() {
        try {
            this.reportDir = getReportRootDirectory();
            this.startTime = new Date().toISOString();
            if (!fs.existsSync(this.reportDir)) {
            fs.mkdirSync(this.reportDir);
        }
        this.currentReportDir = this.reportDir + this.suite.id;
        this.screenshotDir = this.currentReportDir +  '/screenshots';
        logger.debug('dir for report data is ' + this.currentReportDir);
        fs.mkdirSync(this.currentReportDir);
        fs.mkdirSync(this.screenshotDir);
        } catch (e) {
            logger.fatal('error creating report folder. error message ' + e.toString());
        }
    }

    deleteReportFolder(){
        fs.emptyDirSync(this.reportDir);
        fs.mkdirSync(this.currentReportDir);
        fs.mkdirSync(this.screenshotDir);
    }

    initStartTime() {
        this.startTime = new Date().toISOString();
    }

    setTitle(title:string){
        this.suite.title = title;
    }

    setFileName(name:string){
        this.fileName = name;
    }

    startTest(name:string, description:string, classname?:string, methodname?:string) {
        this.test = new Test();
        this.test.success = true;
        this.startTime = new Date().toISOString();
        this.test.description = description;
        this.test.name = name;
        this.test.starttime = new Date().toISOString();
        this.test.endtime = new Date().toISOString();
        this.test.steps = [];
        this.suite.totaltests += 1;
        this.test.classname = classname;
        this.test.methodname = methodname;

        logger.info('Test Started')
        logger.info('Test Name: ' + name);
        logger.info('Test Description: ' + description);
    }

    /***
     * @param description - description of the step
     * @param err - if any error msg has to be pass, it can be string or any object including Error object. Pass null or '' if there is no error
     * @param isApi - pass true, if you adding api request or response, this will ensure the html report will encapsulate this in a text area
     */
    async addTestStep(description:string ,err:any, isApi?:boolean) {
        let step = new Step();
        if(isApi){
            // if step is api and logApi is false return empty step object without adding step
            if(!this.logApi) {
                return step;
            }
        }
        try {
            step.name = description;
            step.description = description;
            step.isapi = (isApi == true) || false;
            step.starttime = this.startTime;
            this.startTime = new Date().toISOString();
            step.endtime =  this.startTime;
            if(err) {
                step.error = err;
                step.success = false;
                this.test.success = false;
                logger.error(description + ' ' + err);
            } else {
                logger.info(description);
            }
            if(this.driver) {
                if(!step.success){
                    step.screenshot = await this.addScreenShot(this.driver);
                } else {
                    step.screenshot = this.takeScreenShot?await this.addScreenShot(this.driver, step.success):null;
                }
            }
            this.test.steps.push(step);
            this.suite.totalsteps += 1;
        } catch (e) {
            logger.error('error adding step. error message: ' + e.toString(),e)
        }
        return step;
    }

    endTest() {
        this.test.endtime = new Date().toISOString();
        const test = this.test;
        if(this.test.success)
        {
            this.suite.totalpass += 1;
        } else {
        this.suite.totalfail += 1;
        }
        this.test = new Test();
        this.suite.tests.push(test);
        this.suite.endtime = new Date().toISOString();
        try {
            fs.writeFileSync(getReportRootDirectory() + this.suite.id + '/'+ this.fileName + '.html', htmlReport(JSON.stringify(this.suite)));
        } catch (e) {
            logger.error('error creating html report. error message: ' + e.toString())
        }
        logger.info('End Test');
        return test;
    }

    getSuite() {
        return this.suite;
    }

async addScreenShot(driver:any,success?:any) {
        let filename:string = crypto.randomBytes(16).toString("hex") + '.png';
        try {
            await driver.takeScreenshot().then((img:any) => {
                if(!success){
                    filename = img;
                } else{
                     fs.writeFileSync(this.screenshotDir + '/' + filename, img, 'base64');
                }
            });
        } catch (e) {
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
            let max = (n - s.length)/c.length;
            for (let i = 0; i < max; i++) {
                s = c + s; } return s;
        }
    }

    getReportDir() {
        return this.reportDir;
    }

    addSupportDriver(driver:string) {
        this.supportDrivers.push(driver);
        return this.supportDrivers;
    }
}

function getReportRootDirectory() {
    let rootDir = __dirname.split(path.sep);
    let pathext = '';
    for(let i=0;i < rootDir.length ; i++){
        pathext += rootDir[i] + '/';
        if (fs.existsSync(pathext + 'package.json')) {
            logger.debug('dir for report data is ' + pathext);
            break;
        }
    }
    return  pathext + 'report/';
}

function getDirectories(path:string) {
    return fs.readdirSync(path).filter(function (file:string) {
        return fs.statSync(path+'/'+file).isDirectory();
    });
}
