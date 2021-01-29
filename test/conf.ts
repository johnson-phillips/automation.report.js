exports.config = {
  framework: 'jasmine',
  capabilities: {
    browserName: 'chrome'
  },
  specs: [ './spec.ts' ],

  // You could set no globals to true to avoid jQuery '$' and protractor '$'
  // collisions on the global namespace.
  onPrepare() {
    /* Compile TS files */
    require("ts-node").register({
      project: require("path").join(__dirname, "../tsconfig.json")
    });
}
};