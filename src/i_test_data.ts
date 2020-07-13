declare interface ITestData {

    readonly reportDir: string;
    readonly currentReportDir: string;
    readonly screenshotDir: string;
    takeScreenShot: boolean;
    deleteReportFolder(): void;
    initStartTime(): void;
    startTest(name: string, description: string): void;
    addTestStep(description: string, err: any, isApiorScreenshot?: boolean|string): Promise<void>;
    addAssertStep(message: string, expected: any, actual: any, isApiorScreenshot?: boolean|string): Promise<void>;
    addAssertStepFailOnMismatch(message: string, expected: any, actual: any, isApiorScreenshot?: boolean|string): Promise<void>;
    endTest(): Promise<ITest>;
    getSuite():any;
    addScreenShot(data: any): Promise<string>;
    binEncode(data: any): void;
    getReportDir(): string;
    addSupportDriver(driver: string): string[];
}
