class Suite {
    totaltests = 0;
    totalpass = 0;
    totalfail = 0;
    totalsteps = 0;
    tests = [];
    starttime = new Date().toISOString();
    endtime = new Date().toISOString();
}

module.exports = Suite;
