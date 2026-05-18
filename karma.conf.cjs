// configures browsers to run test against
// any of [ 'Chrome', 'Firefox' ]
const browsers = (process.env.TEST_BROWSERS || 'ChromeHeadless').split(',');

module.exports = async function(karma) {

  // use puppeteer provided Chrome for testing
  process.env.CHROME_BIN = await require('puppeteer').executablePath();

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
      mode: 'development'
    }
  });

};
