const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('./config/config');
const serverConfig = config.getServerConfig();
const commonConfig = require('./webpack.common.config');

const outputDirectory = 'dist';

module.exports = merge(commonConfig, {
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      title: 'Amazon connect reference dialer',
      filename: './src/server/views/index.ejs'
    }),
    new HtmlWebpackPlugin({
      title: 'Amazon connect reference dialer',
      filename: './src/server/views/compare.ejs'
    }),
    new HtmlWebpackPlugin({
      title: 'Amazon connect reference dialer',
      filename: './src/server/views/stock.ejs'
    })
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
