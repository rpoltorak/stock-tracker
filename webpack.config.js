var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: "development",

  devtool: "source-map",

  entry: {
    app: [path.resolve("src/index.js")],
  },

  output: {
    path: path.resolve("build"),
    filename: "[name].[hash].js",
    chunkFilename: "[name].[chunkhash].js",
  },

  resolve: {
    extensions: [".js"],
  },

  plugins: [new HtmlWebpackPlugin()]
};
