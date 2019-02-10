const webpack = require('webpack'),
  merge = require('webpack-merge'),
  common = require('./webpack.common.config.js'),
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  // ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

const dist = './docs';

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: './fonts',
            name: '[name].[ext]',
            publicPath: '../fonts/',
          }
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: './images',
            name: '[name].[ext]',
            publicPath: './images',
          }
        }]
      },
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'index-vendors',
          chunks: 'all'
        }
      }
    },
  },
  plugins: [
    new CleanWebpackPlugin([dist], {
      root: path.resolve(__dirname , '..'),
      verbose: true
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.[hash].css',
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/images/favicon.png',
    }),
    // new ReplaceInFileWebpackPlugin([{
    //   dir: 'dist/css',
    //   test: [/\.css$/],
    //   rules: [{
    //     search: /\.\/images\//,
    //     replace: '../images/'
    //   }]
    // }]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ]
});
