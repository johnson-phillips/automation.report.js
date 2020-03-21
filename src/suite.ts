import {Test} from "./test";

export class Suite {
    id:string = new Date().toLocaleString().replace(/\//g, '-') + Math.random().toString().slice(0,7);
    totaltests:number = 0;
    totalpass:number = 0;
    totalfail:number = 0;
    totalsteps:number = 0;
    tests:Array<Test> = new Array<Test>();
    starttime:string = new Date().toISOString();
    endtime:string = new Date().toISOString();
}
