const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require("./config/config");
const clientConfig = config.getClientConfig();


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
                use: ['style-loader'],
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                },
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
                loader: 'url-loader?limit=100000'
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico'
        }),
        new webpack.DefinePlugin({
            __appid__: JSON.stringify(clientConfig.APP_ID),
            __appsecret__: JSON.stringify(clientConfig.APP_SECRET),
            __connect_url__: JSON.stringify(clientConfig.CONNECT_URL),
        }),
        new HtmlWebpackExternalsPlugin({
            externals: [{
                module: 'callstats',
                entry: clientConfig.CS_JS_SDK_URL || 'https://api.callstats.io/static/callstats.min.js',
                global: 'callstats'
            }, {
                module: 'CallstatsAmazonShim',
                entry: clientConfig.CS_AC_SHIM_URL || 'https://api.callstats.io/static/callstats-amazon-shim.js',
                global: 'CallstatsAmazonShim'
            },
            ]
        })
    ],
    devServer: {
        port: 8082,
        open: true,
        disableHostCheck: true,
        /*proxy: {
            '/api': `http://localhost:${process.env.HTTP_PORT}`
        }*/
    },
};
