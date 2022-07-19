const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack')
const {merge} = require('webpack-merge');
const base = require('./webpack.base');
const TerserPlugin = require("terser-webpack-plugin");
const handler = (percentage, message, ...args) => {
    // e.g. Output each progress message directly to the console:
    console.info(`${Number.parseInt(percentage * 100)}%`, message, ...args);
};
module.exports = merge(base, {
    mode: 'production',
    devtool: 'nosources-source-map',
    output: {
        publicPath: 'https://oss-zzf.zzfzzf.com/zeus',
    },
    optimization: {
        runtimeChunk: 'single',
        chunkIds: 'named',
        moduleIds: 'deterministic',
        minimize: true, // 启动压缩
        usedExports: true, //只导出被使用的模块
        minimizer: [new CssMinimizerPlugin(),new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module, chunks, cacheGroupKey) {
                        const moduleFileName = module
                            .identifier()
                            .split('/')
                            .reduceRight((item) => item);
                        const allChunksNames = chunks.map((item) => item.name).join('~');
                        return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                    },
                    chunks: 'all',
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },

    plugins: [
        new webpack.ProgressPlugin(handler),
        process.env.ANALYZER && new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[contenthash:8].chunk.css',
        }),
    ].filter(Boolean),
});
