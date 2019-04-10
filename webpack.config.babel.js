import path from "path";
import webpack from "webpack";
var OpenBrowserPlugin = require("open-browser-webpack-plugin");

const config = {
  devServer: {
    hot: true,
    inline: true
  },
  devtool: "cheap-module-eval-source-map",
  entry: path.resolve(__dirname, "app", "main.js"),
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js(x)?$/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 80000,
              mimetype: "application/font-woff"
            }
          }
        ]
      },
      {
        test: /\.json$/,
        use: "json-loader"
      },
      {
        test: /\.(ttf|eot|svg|html)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build", "client")
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: "http://localhost:8000" })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".css"]
  }
};

if (process.env.NODE_ENV !== "production") {
  const DashboardPlugin = require("webpack-dashboard/plugin");
  config.plugins.push(new DashboardPlugin());
}

export default config;
