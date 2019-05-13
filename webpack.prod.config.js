const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const commonConfig = require('./webpack.common.config');
const outputDirectory = 'dist';

module.exports = merge(commonConfig, {
  plugins: [
    new CleanWebpackPlugin([outputDirectory])
  ]
});
