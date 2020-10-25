import Step from "./step";

export default class Test {
    success = true;
    description:string = '';
    name:string = '';
    classname:string | undefined = '';
    methodname:string | undefined = '';
    starttime:string = new Date().toISOString();
    endtime:string = new Date().toISOString();
    steps:Array<Step> = new Array<Step>();
}