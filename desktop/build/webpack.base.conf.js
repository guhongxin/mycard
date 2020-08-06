const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlgugin = require("copy-webpack-plugin");

const resolve = filePath => {
  return path.join(__dirname, "../", filePath);
};
module.exports = {
  entry: {
    pcindex: resolve("src/js/pcindex.ts"),
    payment: resolve("src/js/payment.ts"),
    dpurchase: resolve("src/js/dpurchase.ts"),
    voucherall: resolve("src/js/voucherall.ts"),
    h5index: resolve("src/js/h5index.js")
  },
  output: {
    filename: "js/[name]_[hash:8].js",
    path: resolve("dist")
  },
  resolve: {
    alias: {
      Swiper: resolve("src/assets/js/swiper-bundle.min.js")
    },
    extensions: [".js", ".ts"]
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: ['babel-loader']
    }, {
      test: /\.(png|jpg|gif|jpeg|webp)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[hash:6].[ext]',
                esModule:false
              }
            }
          }
        }
      ],
      exclude: /node_modules/
    }, {
      test: /\.(svg|eot|ttf|woff|woff2)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[hash:6].[ext]',
                esModule:false
              }
            }
          }
        }
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlgugin({
      patterns: [
        {
          from: resolve("static"),
          to: "static",
          force: true,
          toType: 'dir'
        }
      ]
    }),
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: "戒灵",
      // minify: {
      //   // 压缩HTML文件
      //   // removeComments: true, // 移除HTML中的注释
      //   // collapseWhitespace: true, // 删除空白符与换行符
      //   // minifyCSS: true// 压缩内联css
      // },
      inject: "body", // 注入的位置不经相同
      filename: "index.html",
      chunks: [],
      minify: false,
      favicon: resolve("public/favicon.ico"),
      template: resolve("src/page/index.html")
    }),
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: "戒灵",
      // minify: {
      //   // 压缩HTML文件
      //   // removeComments: true, // 移除HTML中的注释
      //   // collapseWhitespace: true, // 删除空白符与换行符
      //   // minifyCSS: true// 压缩内联css
      // },
      inject: "body", // 注入的位置不经相同
      filename: "pcindex.html",
      chunks: ["swiper", "pcindex"],
      minify: false,
      favicon: resolve("public/favicon.ico"),
      template: resolve("src/page/pcindex.html")
    }),
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: "戒灵",
      // minify: {
      //   // 压缩HTML文件
      //   // removeComments: true, // 移除HTML中的注释
      //   // collapseWhitespace: true, // 删除空白符与换行符
      //   // minifyCSS: true// 压缩内联css
      // },
      inject: "body", // 注入的位置不经相同
      filename: "h5index.html",
      chunks: ["swiper", "h5index"],
      minify: false,
      favicon: resolve("public/favicon.ico"),
      template: resolve("src/page/h5index.html")
    }),
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: "戒灵",
      // minify: {
      //   // 压缩HTML文件
      //   // removeComments: true, // 移除HTML中的注释
      //   // collapseWhitespace: true, // 删除空白符与换行符
      //   // minifyCSS: true// 压缩内联css
      // },
      minify: false,
      chunks: ["payment"],
      filename: "payment.html",
      favicon: resolve("public/favicon.ico"),
      template: resolve("src/page/payment.html")
    }),
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: "戒灵",
      // minify: {
      //   // 压缩HTML文件
      //   // removeComments: true, // 移除HTML中的注释
      //   // collapseWhitespace: true, // 删除空白符与换行符
      //   // minifyCSS: true// 压缩内联css
      // },
      minify: false,
      chunks: ["dpurchase"],
      filename: "dpurchase.html",
      favicon: resolve("public/favicon.ico"),
      template: resolve("src/page/dpurchase.html")
    }),
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: "戒灵",
      // minify: {
      //   // 压缩HTML文件
      //   // removeComments: true, // 移除HTML中的注释
      //   // collapseWhitespace: true, // 删除空白符与换行符
      //   // minifyCSS: true// 压缩内联css
      // },
      minify: false,
      chunks: ["voucherall"],
      filename: "voucherall.html",
      favicon: resolve("public/favicon.ico"),
      template: resolve("src/page/voucherall.html")
    })
  ]
};
