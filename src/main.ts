import {TestData} from "./testdata";

const log4js = require('log4js');
export const logger = log4js.getLogger('automation.report.TestData');
logger.level = process.env.LEVEL || 'error';

const report:ITestData = new TestData();
export default report;
