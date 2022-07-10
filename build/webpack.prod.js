const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const { merge } = require("webpack-merge");
const base = require("./webpack.base");

module.exports = merge(base, {
  mode: "production",
  devtool: "nosources-source-map",
  optimization: {
    runtimeChunk: "single",
    chunkIds: "named",
    moduleIds: "deterministic",
    minimize: true, // 启动压缩
    usedExports: true, //只导出被使用的模块
    minimizer: [
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: "all",
      minSize: 0,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    process.env.ANALYZER && new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[contenthash:8].chunk.css"
    })
  ].filter(Boolean)
});
