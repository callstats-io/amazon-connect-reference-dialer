const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = 'dist';
process.env.HTTP_PORT = process.env.PORT || 8080;

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
