const path = require("path");
const glob = require("glob");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlgugin = require("copy-webpack-plugin");

const resolve = filePath => {
  return path.join(__dirname, "../", filePath);
};

const setMPA = () => {
  const entry = {};
  const HtmlWebpackPlugins = [];
  const entryFiles = glob.sync(resolve("src/js/*"));
  for (let i = 0; i < entryFiles.length; i++) {
    const filename = entryFiles[i].match(/\/js\/(.*)\./)[1]
    entry[filename] = entryFiles[i];
    let chunks = /index/.test(filename) ? [filename, 'swiper'] : [filename]
    HtmlWebpackPlugins.push(
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
        filename: `${filename}.html`,
        chunks: chunks,
        minify: false,
        favicon: resolve("public/favicon.ico"),
        template: resolve(`src/page/${filename}.html`)
      })
    )
  }
  return {
    entry,
    HtmlWebpackPlugins
  }
}
let { entry, HtmlWebpackPlugins } = setMPA();

module.exports = {
  entry: entry,
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
      title: "Leandonplay.game",
      inject: "body", // 注入的位置不经相同
      filename: "index.html",
      chunks: [],
      minify: false,
      favicon: resolve("public/favicon.ico"),
      template: resolve("src/page/index.html")
    })
  ].concat(HtmlWebpackPlugins)
};
