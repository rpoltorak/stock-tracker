const config = require("./webpack.config");
const merge = require("webpack-merge");

module.exports = merge(config, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    historyApiFallback: true,
  },
});
