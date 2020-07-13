import report from '../src/main';


async function test() {

    console.log('av efbf wrwg'.replace(/ /g,'-'));
    report.deleteReportFolder();
    report.startTest('myappquality test','verify myappquality app launches successfully');
    await report.addTestStep('open browser and navigate to http://www.myappquality.com/','');
    await report.addTestStep('verify 5 tiles appear at the top','','');
    await report.addTestStep('this is addTestStep with api true',null,true);
    await report.addAssertStep('verify abc = ABC','abc','ABC');
    await report.addAssertStep('verify abc = abc','abc','abc');
    await report.endTest();
}

( async () => {
    await test();
})();
