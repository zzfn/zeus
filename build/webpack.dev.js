const { merge } = require("webpack-merge");
const base = require("./webpack.base");
module.exports = merge(base, {
  mode: "development",
  target: "web",
  devtool: "eval-source-map",
  devServer: {
    hot: true,
    historyApiFallback: true
  }
});
