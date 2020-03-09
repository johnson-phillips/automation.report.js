let log4js = require('log4js');
let logger = log4js.getLogger('TestData');
//ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
logger.level = process.env.level || 'error';
module.exports = logger;
