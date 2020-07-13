export class Step implements IStep {
    name ='';
    description = '';
    starttime = new Date().toISOString();
    endtime = new Date().toISOString();
    success = true;
    error = '';
    isapi = false;
    screenshot = '';
}
