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
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
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
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Bad Movie Squad',
      template: 'app/index.html'
    })
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
