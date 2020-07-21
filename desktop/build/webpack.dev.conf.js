
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlgugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const common = require("./webpack.base.conf");
const { merge }  = require("webpack-merge");


const resolve = filePath => {
  return path.join(__dirname, "../", filePath);
};

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: resolve("dist"),
    compress: true,
    port: 9000,
    inline: true,
    hot: true,
    open: "Chrome"
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader"
      ]
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        "style-loader",
        "css-loader",
        "postcss-loader",
        "sass-loader"
      ]
    }]
  }
})
