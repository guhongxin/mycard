const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const common = require("./webpack.base.conf");

const { merge }  = require("webpack-merge");

const resolve = filePath => {
  return path.join(__dirname, "../", filePath);
};
module.exports = merge(common, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
              // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
              publicPath: "../"
              // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
              // hmr: devMode, // 仅dev环境启用HMR功能
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            // 这里可以指定一个 publicPath
            // 默认使用 webpackOptions.output中的publicPath
            // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
            // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
            publicPath: "../"
            // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
            // hmr: devMode, // 仅dev环境启用HMR功能
          }
        },
        "css-loader",
        "postcss-loader",
        "sass-loader"
      ]}
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ]
})