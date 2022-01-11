const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const glob = require("glob");

const pages = glob.sync("./src/pages/*.html");

const { NODE_ENV } = process.env;

module.exports = {
  entry: {
    index: "./src/page-types/index.js",
    carousel: "./src/page-types/carousel.js",
    note: "./src/page-types/pageOfNote.js",
    feedback: "./src/page-types/feedBackPage.js",
    common: "./src/page-types/common.js",
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
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
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/image/[contenthash][ext]",
        },
      },
      {
        test: /\.(woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[contenthash].[ext]",
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
      template: "./src/index.html",
      chunks: ["index", "common"],
    }),
    ...pages.map((el) => {
      const file = el.match(/(\w+)(?=\.html)/im);
      return new HtmlWebpackPlugin({
        filename: el.replace(/^.\/src\//, ""),
        template: el,
        chunks: file,
      });
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new BrowserSyncPlugin(
      {
        host: "localhost",
        port: 3000,
        proxy: "http://localhost:9000/",
      },
      {
        reload: false,
      }
    ),
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
