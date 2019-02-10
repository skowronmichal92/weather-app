const merge = require('webpack-merge'),
      common = require('./webpack.common.config.js'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dist = '../docs';

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    pathinfo: false
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')({
                  flexbox: 'no-2009',
                  grid: "autoplace",
                  browsers: [
                    '> 0.5%',
                    'not dead',
                    'ie >= 11'
                  ]
                }),
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          },
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: './images',
            name: '[name].[ext]',
            publicPath: './images',
          }
        }]
      }
    ]
  },
  devServer: {
    contentBase: dist,
    open: true,
    publicPath: '/',
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './style.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/images/favicon.png'
    }),
  ],
});
