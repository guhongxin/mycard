const path = require("path");

const resolve = (filename) => {
  return path.resolve(__dirname, filename)
}

console.log("----", resolve("src/main.js"))
console.log("----", path.join(__dirname, "src/main.js"))
module.exports = {
  entry: {
    main: resolve("src/main.js")
  },
  output: {
    filename: "js/[name]_[hash:8].js",
    path: resolve("dist")
  }
}