const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");

const { NODE_ENV } = process.env;

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/dist"),
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },
  devtool: NODE_ENV === "production" ? "hidden-source-map" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/i,
        type: "asset/resource",
        generator: {
          filename: "./image/[contenthash][ext]",
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  mode: NODE_ENV === "production" ? "production" : "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  devServer: {
    compress: true,
    port: 9000,
    client: {
      logging: "info",
    },
  },
};
