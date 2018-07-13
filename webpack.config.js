const path = require('path');
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  context: path.resolve(__dirname, "src"),
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './assets/js/application.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['env']
          }
        }
      },
      { test: /\.html$/, use: ['html-loader'] },
      {
        test: /\.scss$/,
        use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['src/assets', 'index.html']),
    //html-webpack-plugin instantiation
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
  ],
  devServer: {
    contentBase: [path.resolve(__dirname, "./dist/assets/images"), path.resolve(__dirname, "./build")],
    compress: true,
    port: 12000,
    stats: 'errors-only',
    open: true
  },
  devtool: 'source-map'
};

module.exports = config;
