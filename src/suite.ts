export class Suite implements ISuite {
    id = new Date().toLocaleString()
        .replace(/\//g, '-')
        .replace(/, /,'-')
        .replace(/ /g,'') + Math.random().toString().slice(0,7);
    totaltests = 0;
    totalpass = 0;
    totalfail = 0;
    totalsteps = 0;
    tests = new Array<ITest>();
    starttime = new Date().toISOString();
    endtime = new Date().toISOString();
}
