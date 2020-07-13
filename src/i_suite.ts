interface ISuite {
    id:string;
    totaltests:number;
    totalpass:number;
    totalfail:number;
    totalsteps:number;
    tests:Array<ITest>;
    starttime:string;
    endtime:string;
}
