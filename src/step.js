class Step {
    name;
    description;
    starttime;
    endtime = new Date().toISOString();
    success = true;
    error = null;
    isapi = false;
    screenshot = null;
}

module.exports = Step;
