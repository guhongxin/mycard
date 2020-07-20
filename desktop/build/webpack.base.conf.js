const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlgugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const resolve = filePath => {
  return path.join(__dirname, "../", filePath);
};

module.exports = {
  entry: {
    index: resolve("src/js/index.js"),
    about: resolve("src/js/about.js")
  },
  mode: "production",
  output: {
    filename: "js/[name]_[chunkhash:8].js",
    path: resolve("dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
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
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new CopyWebpackPlgugin({
      patterns: [
        {
          from: resolve("static"),
          to: "static"
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: "Hello World app",
      minify: {
        // 压缩HTML文件
        // removeComments: true, // 移除HTML中的注释
        // collapseWhitespace: true, // 删除空白符与换行符
        // minifyCSS: true// 压缩内联css
      },
      inject: "body", // 注入的位置不经相同
      filename: "index.html",
      chunks: ["index"],
      favicon: resolve("public/favicon.ico"),
      template: resolve("src/page/index.html")
    }),
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: "Hello World app",
      minify: {
        // 压缩HTML文件
        // removeComments: true, // 移除HTML中的注释
        // collapseWhitespace: true, // 删除空白符与换行符
        // minifyCSS: true// 压缩内联css
      },
      chunks: ["about"],
      filename: "about.html",
      favicon: resolve("public/favicon.ico"),
      template: resolve("src/page/about.html")
    })
  ]
};
