const log4js = require('log4js');
export const logger = log4js.getLogger('TestData');
logger.level = process.env.LEVEL || 'error';
//ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF


