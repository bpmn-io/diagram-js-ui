/* eslint-env node */

// configures browsers to run test against
// any of [ 'Chrome', 'Firefox' ]
const browsers = (process.env.TEST_BROWSERS || 'ChromeHeadless').split(',');

// use puppeteer provided Chrome for testing
if (!process.env.CHROME_BIN) {
  try {
    process.env.CHROME_BIN = require('puppeteer').executablePath();
  } catch (e) {
    // puppeteer not installed or not properly configured
    console.warn('Puppeteer not available, using system Chrome');
  }
}

module.exports = function(karma) {

  karma.set({
    frameworks: [
      'webpack',
      'mocha'
    ],

    files: [
      'test/suite.js'
    ],

    preprocessors: {
      'test/suite.js': [ 'webpack' ]
    },

    reporters: [ 'progress' ],

    browsers: browsers,

    browserNoActivityTimeout: 30000,

    singleRun: true,
    autoWatch: false,

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /test\/globals\.js$/,
            sideEffects: true
          }
        ]
      }
    }
  });

};