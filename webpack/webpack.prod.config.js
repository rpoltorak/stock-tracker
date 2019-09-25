const config = require("./webpack.config");
const merge = require("webpack-merge");

module.exports = merge(config, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimize: true,
  },
});
