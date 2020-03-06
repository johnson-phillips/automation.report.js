let logger = require('./logger');
let Test = require('./test');
let Suite = require('./suite');
let Step = require('./step');
let path = require('path');
let fs = require('fs');
let htmlReport = require('./htmlreport');

class TestData {
    #test;
    #suite;
    #startTime;
    #rootDir;
    #reportDir;
    #screenshotDir;
    #supportDrivers = ['Driver','ProtractorBrowser','thenableWebDriverProxy'];

    constructor() {
        this.#suite = new Suite();
        this.#startTime = new Date().toISOString();
        this.#rootDir = getRoot();
        try
        {
            if (!fs.existsSync(this.#rootDir + '/report/')){
                fs.mkdirSync(this.#rootDir + '/report');
            }
            this.#reportDir = this.#rootDir + '/report/' + this.#suite.id;
            this.#screenshotDir = this.#rootDir + '/report/' + this.#suite.id + '/screenshots';
            logger.debug('dir for report data is ' + this.#reportDir);
            fs.mkdirSync(this.#reportDir);
            fs.mkdirSync(this.#screenshotDir);
        } catch (e) {
            logger.fatal('error creating report folder. error message ' + e.toString());
        }
    }

    startTest(name,description)
    {
        this.#test = new Test();
        this.#test.success = true;
        this.startTime = new Date().toISOString();
        this.#test.description = description;
        this.#test.name = name;
        this.#test.starttime = new Date().toISOString();
        this.#test.endtime = new Date().toISOString();
        this.#test.steps = [];
        this.#suite.totaltests += 1;
    }

    addTestStep(description,err)
    {
        try
        {
            let step = new Step();
            step.name = description;
            step.description = description;
            step.starttime = this.startTime;
            this.startTime = new Date().toISOString();
            step.endtime =  this.startTime;
            step.success = true;
            if(err)
            {
                step.error = err;
                step.success = false;
                this.#test.success = false;
                logger.error(description + ' ' + err);
            }
            else{
                logger.info(description);
            }
            this.#test.steps.push(step);
            this.#suite.totalsteps += 1;
        } catch (e) {
            logger.error('error adding step. error message: ' + e.toString())
        }
    }

    addTestStep(description,err,isApiorScreenshot)
    {
        try
        {
            let step = new Step();
            step.name = description;
            step.description = description;
            step.starttime = this.startTime;
            this.startTime = new Date().toISOString();
            step.endtime =  this.startTime;
            if(err)
            {
                step.error = err;
                step.success = false;
                this.#test.success = false;
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
                    step.screenshot = isApiorScreenshot + '.png';
                    step.isapi = false;
                    break;
                case 'object':
                    if(this.#supportDrivers.indexOf(isApiorScreenshot.constructor.name) > -1)
                    {
                        step.screenshot = this.addScreenShot(isApiorScreenshot);
                        step.isapi = false;
                    }
                    else{
                        logger.info(isApiorScreenshot.constructor.name + ' not found');
                    }
                    break;
            }
            this.#test.steps.push(step);
            this.#suite.totalsteps += 1;
        } catch (e) {
            logger.error('error adding step. error message: ' + e.toString())
        }

    }

    addAssertStep(message,expected,actual)
    {
        if(expected === actual){
            this.addTestStep(message + " expected:"+expected + " actual:" + actual,null);
        }
        else{
            this.addTestStep(message + " expected:" + expected + " actual:" + actual,"not equal");
        }
    }

    addAssertStepFailOnMismatch(message,expected,actual)
    {
        if(expected === actual){
            this.addTestStep(message + " expected:"+expected + " actual:" + actual,null);
        }
        else{
            this.addTestStep(message + " expected:" + expected + " actual:" + actual,"not equal");
            throw new Error("not equal - expected:" + expected + " actual:" + actual);
        }
    }

    endTest()
    {
        this.#test.endtime = new Date().toISOString();
        const test = this.#test;
        if(this.#test.success)
        {
            this.#suite.totalpass += 1;
        }
        else {
            this.#suite.totalfail += 1;
        }
        this.#test = {};
        this.#suite.tests.push(test);
        this.#suite.endtime = new Date().toISOString();
        try
        {
            fs.writeFile(this.#rootDir + '/report/' + this.#suite.id + '/report.html', htmlReport(JSON.stringify(this.#suite)), function (err) {
                if (err) throw err;
            });
        } catch (e) {
            logger.error('error creating html report. error message: ' + e.toString())
        }
        return test;
    }

    getSuite()
    {
        return this.#suite;
    }

    addScreenShot(data) {
        let filename = Date.now() + '.png';
        try {
             data.takeScreenshot().then(img => {
                fs.promises.writeFile(this.#screenshotDir + '/' + filename, img, 'base64');
            })
        }
        catch (e) {
            logger.error('error saving screenshot. error message: ' + e.toString())
        }
        return filename;
    }

    getReportDir()
    {
       return this.#reportDir;
    }

    addSupportDriver(driver)
    {
        this.#supportDrivers.push(driver);
        return this.#supportDrivers;
    }
}


function getRoot()
{
    let temp = true;
    let counter = 1;
    let rootDir =__dirname;
    while(temp)
    {
        let pathext = '';
        for(i=0;i < counter; i++)
        {
            pathext += './';
        }
        counter += 1;
        let filepath = pathext + 'package.json';
        if (fs.existsSync(filepath)) {
            temp  = false;
            rootDir = path.resolve(pathext);
            logger.debug('dir for report data is ' + rootDir);
        }
        if(counter > 10)
        {
            temp = false;
            logger.debug('root dir not found. setting dir for report data to ' + rootDir);
        }
    }
    return rootDir;
}


module.exports = new TestData();
