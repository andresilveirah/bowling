module.exports = function(config){
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
      'src/**/*.js',
      'spec/**/*.js'
    ],
    exclude: [],
    reporters: ['progress'],
    port: 8083,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: false,
    browsers: ['PhantomJS'],
    captureTimeout: 20000,
    singleRun: true,
    reportSlowerThan: 500
  });
};
