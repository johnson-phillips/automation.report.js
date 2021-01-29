import log4js, { Logger } from "log4js";
const logger: Logger = log4js.getLogger('automation.report.TestData');
logger.level = process.env.LEVEL || 'error';
//ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
export default logger;

