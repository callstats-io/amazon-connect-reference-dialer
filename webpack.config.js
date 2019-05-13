const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('./config/config');
const serverConfig = config.getServerConfig();

const outputDirectory = 'dist';

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader']
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]'
        }
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
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
};
