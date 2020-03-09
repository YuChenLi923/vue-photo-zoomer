const webpackConfig = require('@vue/cli-service/webpack.config.js')
module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      'tests/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      '**/*.spec.js': ['webpack', 'coverage']
    },
    webpack: webpackConfig,
    browsers: ['Chrome'],
    reporters: ['spec', 'coverage', 'coveralls'],
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    }
  })
}
