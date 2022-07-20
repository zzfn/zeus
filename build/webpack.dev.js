const { merge } = require('webpack-merge');
const base = require('./webpack.base');
module.exports = merge(base, {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  target: 'web',
  devtool: 'eval',
  devServer: {
    hot: true,
    port: 8088,
    historyApiFallback: true,
  },
});
