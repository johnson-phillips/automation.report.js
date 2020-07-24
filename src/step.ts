export default class Step {
    name:string  ='';
    description:string = '';
    starttime:string = new Date().toISOString();
    endtime:string = new Date().toISOString();
    success:boolean = true;
    error:any = null;
    isapi:boolean = false;
    screenshot:any = null;
}
