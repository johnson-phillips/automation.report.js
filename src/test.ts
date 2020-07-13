export class Test implements ITest {
    success = true;
    description:string = '';
    name = '';
    starttime = new Date().toISOString();
    endtime = new Date().toISOString();
    steps = new Array<IStep>();
}

