const path = require("path");
const outputDirectory = "dist";
const webpack = require("webpack");

const { getClientConfig } = require("./config/config");
module.exports = {
  entry: ["babel-polyfill", "./src/client/index.js"],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader"]
      },
      {
        test: /\.css$/,
        loader: "css-loader",
        options: {
          modules: true,
          localIdentName: "[path][name]__[local]--[hash:base64:5]"
        }
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|gif|mp3)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      WEB_PACK_APP_ID: JSON.stringify(getClientConfig().APP_ID || ""),
      WEB_PACK_APP_SECRET: JSON.stringify(getClientConfig().APP_SECRET || ""),
      WEB_PACK_CONNECT_URL: JSON.stringify(getClientConfig().CONNECT_URL || "")
    })
  ]
};
