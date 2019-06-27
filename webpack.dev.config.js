const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('./config/config');
const serverConfig = config.getServerConfig();
const commonConfig = require('./webpack.common.config');

const outputDirectory = 'dist';

module.exports = merge(commonConfig, {
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
  ],
  devServer: {
    port: 8082,
    open: true,
    disableHostCheck: true,
    proxy: {
      '/': `http://localhost:${serverConfig.HTTP_PORT}`
    }
  }
});
