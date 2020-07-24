import Step from "./step";

export default class Test {
    success = true;
    description:string = '';
    name:string = '';
    starttime:string = new Date().toISOString();
    endtime:string = new Date().toISOString();
    steps:Array<Step> = new Array<Step>();
}