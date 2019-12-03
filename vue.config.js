const path = require('path');

module.exports = {
  lintOnSave: false,
  outputDir: path.resolve(__dirname, 'docs'),
  publicPath: process.env.NODE_ENV === 'production' ? '/badge-generator/' : '/'
};
