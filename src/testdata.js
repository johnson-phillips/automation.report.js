let logger = require('./logger');
let Test = require('./test');
let Suite = require('./suite');
let Step = require('./step');

class TestData {
    #test;
    #suite;
    #startTime;

    constructor() {
        this.#suite = new Suite();
        this.#startTime = new Date().toISOString();
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
    }

    addTestStep(description,err,isApiorScreenshot)
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
                step.screenshot = isApiorScreenshot;
                step.isapi = false;
                break;
        }
        this.#test.steps.push(step);
        this.#suite.totalsteps += 1;
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
            throw   ("not equal - expected:" + expected + " actual:" + actual);
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
        return test;
    }

    getSuite()
    {
        return this.#suite;
    }
}

module.exports = new TestData();
