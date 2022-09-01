const config = require("./config/index");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DefinePlugin = webpack.DefinePlugin;
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpackCommon = require("./webpack.common.js");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = ({ analyze }) =>
  merge(webpackCommon, {
    mode: "production",
    plugins: [
      new DefinePlugin({
        PRODUCTION: JSON.stringify(true),
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].min.css",
      }),
      new CleanWebpackPlugin({
        ...config.cleanWebpackOptions,
        verbose: false,
      }),
      new HtmlWebpackPlugin({
        ...config.commonHtmlWebpackPlugin,
        title: config.title,
      }),
      analyze === "true" && new BundleAnalyzerPlugin(),
    ].filter(Boolean),
    devtool: false,
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              // Lossless optimization with custom options
              plugins: [
                ["gifsicle", { interlaced: true }],
                ["jpegtran", { progressive: true }],
                ["optipng", { optimizationLevel: 5 }],
                // Svgo configuration here https://github.com/svg/svgo#configuration
                [
                  "svgo",
                  {
                    plugins: [
                      {
                        name: "preset-default",
                        params: {
                          overrides: {
                            removeViewBox: false,
                          },
                        },
                      },
                    ],
                  },
                ],
              ],
            },
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: false,
          defaultVendors: false,
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks(chunk) {
              return ["vendors", "shared"].indexOf(chunk.name) !== -1;
            },
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              // npm package names are URL-safe, but some servers don't like @ symbols
              return packageName.replace("@", "");
            },
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss|css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
              loader: "css-loader",
              options: {
                url: true,
              },
            },
            {
              loader: "postcss-loader",
            },
            // Compiles Sass to CSS
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  quietDeps: true,
                },
              },
            },
          ],
        },
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
      ],
    },
    output: {
      path: config.distPath,
      filename: "js/[name].[contenthash:8].js",
      publicPath: config.siteRoot,
    },
  });
