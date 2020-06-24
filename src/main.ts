import {TestData} from "./testdata";
import logger from "./logger";


global.report = {
    testData: new TestData(),
    logger: logger
};
