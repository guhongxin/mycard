const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

const resolve = filePath => {
  return path.join(__dirname, "../", filePath);
}
console.log("resolve", resolve('src/js/index.js'));

module.exports = {
  entry: {
    index: resolve('src/js/index.js'),
    about: resolve('src/js/about.js')
  },
  mode: "production",
  output: {
    filename: 'js/[name]_[chunkhash:8].js',
    path: resolve('dist')
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ // 打包输出HTML
      title: 'Hello World app',
      minify: { // 压缩HTML文件
        // removeComments: true, // 移除HTML中的注释
        // collapseWhitespace: true, // 删除空白符与换行符
        // minifyCSS: true// 压缩内联css
      },
      filename: 'index.html',
      chunks: ["index"],
      template: resolve("src/page/index.html")
    }),
    new HtmlWebpackPlugin({ // 打包输出HTML
      title: 'Hello World app',
      minify: { // 压缩HTML文件
        // removeComments: true, // 移除HTML中的注释
        // collapseWhitespace: true, // 删除空白符与换行符
        // minifyCSS: true// 压缩内联css
      },
      chunks: ["about"],
      filename: 'about.html',
      template: resolve("src/page/about.html")
    })
  ]
}