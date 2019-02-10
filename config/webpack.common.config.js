const path = require('path');

const dist = '../docs';

module.exports = {
  entry: {
    index: './src/index.js',
    // vendor: './src/scripts/vendors/vendor.js',
  },
  output: {
    path: path.resolve(__dirname, dist),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        resolve: {
          extensions: [".js", ".jsx"]
        },
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  },
};
