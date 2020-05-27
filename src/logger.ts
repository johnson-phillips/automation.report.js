const log4js = require('log4js');
const logger = log4js.getLogger('automation.report.TestData');
logger.level = process.env.LEVEL || 'error';
//ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
export default logger;

