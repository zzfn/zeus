const { rspack } = require('@rspack/core')
const path = require('path');
const Dotenv = require('dotenv-webpack');
const ReactRefreshPlugin = require("@rspack/plugin-react-refresh");
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    experiments: {
    rspackFuture: {
      disableTransformByDefault: true,
    },
  },
  entry: {
    main: path.resolve(__dirname, '../src/index.tsx')
  },
  cache: true,
  output: {
    clean: true,
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[contenthash:8].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        type: 'asset',
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, //10kb
          },
        },
      },
      {
        test: /\.tsx|ts|js$/,
        exclude: /(node_modules|\.png|svg|jpe?g$)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: isDevelopment ? 'style-loader' : rspack.CssExtractRspackPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              modules: false,
              sourceMap: true,
            },
          },
          'postcss-loader',
        ],
        type: 'javascript/auto'
      },
      // {
      //   test: lessRegex,
      //   exclude: lessModuleRegex,
      //   use: [
      //     {
      //       loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 3,
      //         modules: false,
      //         sourceMap: true,
      //       },
      //     },
      //     'postcss-loader',
      //     {
      //       loader: 'less-loader',
      //       options: {
      //         lessOptions: {
      //           javascriptEnabled: true,
      //           modifyVars: {},
      //         },
      //         sourceMap: true,
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: lessModuleRegex,
      //   include: path.resolve(__dirname, '../src'),
      //   use: [
      //     {
      //       loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 3,
      //         modules: {
      //           exportLocalsConvention: 'camelCaseOnly',
      //         },
      //         sourceMap: true,
      //       },
      //     },
      //     'postcss-loader',
      //     {
      //       loader: 'less-loader',
      //       options: {
      //         lessOptions: {
      //           javascriptEnabled: true,
      //           modifyVars: {
      //             'primary-color': '#1DA57A',
      //             'link-color': '#1DA57A',
      //             'border-radius-base': '2px',
      //           },
      //         },
      //         sourceMap: true,
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    isDevelopment && new ReactRefreshPlugin(),
    new Dotenv({
      systemvars: true,
      path: `./.env.${process.env.APP_ENV}`,
    }),
    new rspack.HtmlRspackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
    })
  ].filter(Boolean),
  resolve: {
    tsConfig:{ configFile: path.resolve(__dirname, '../tsconfig.json') },
    extensions: ['.tsx', '.ts', '.js'],
  },
};
