exports.config = {
  framework: 'jasmine2',
  mochaOpts:{
    timeout: 0
  },
  capabilities: {
    browserName: 'chrome'
  },
  specs: [ './spec.ts' ],
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // You could set no globals to true to avoid jQuery '$' and protractor '$'
  // collisions on the global namespace.
  noGlobals: true,
  onPrepare() {
    /* Compile TS files */
    require('ts-node').register({
      project: './tsconfig.json'
    });
}
};