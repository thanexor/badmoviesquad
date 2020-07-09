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
    hot: false, // you can really blow through firebase with hot reloading on
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
      // {
      //   test: /\.sass$/,
      //   use: [
      //     { loader: MiniCssExtractPlugin.loader, },
      //     "style-loader",
      //     "css-loader",
      //     "sass-loader",
      //   ]
      // },
    ],
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
      app: path.resolve(__dirname, 'app/'),
      components: path.resolve(__dirname, 'app/components/'),
      containers: path.resolve(__dirname, 'app/containers/'),
      reduxState: path.resolve(__dirname, 'app/reduxState/'),
      services: path.resolve(__dirname, 'app/services/'),
    }
  }
};
