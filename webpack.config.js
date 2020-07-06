const path = require('path');
// const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './app/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx', 'html', 'ts', 'json'],
    alias: {
      lib: path.resolve(__dirname, 'app/scripts/lib/'),
      plugins: path.resolve(__dirname, 'app/scripts/plugins/'),
      devices: path.resolve(__dirname, 'app/scripts/src/devices/'),
    }
  }
};
