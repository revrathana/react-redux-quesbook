const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { BaseHrefWebpackPlugin } = require("base-href-webpack-plugin");
var fs = require("fs");
var path = require("path");

module.exports = env => {
  return {
    externals: {
      config: JSON.stringify(require("./config/" + env.NODE_ENV + ".json"))
    },
    entry: ["./src/index.js"],
    output: {
      path: path.resolve(__dirname, "build"),
      publicPath: "/start_new/",
      filename: "index_bundle.[chunkhash].js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader"
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ]
        },
        {
          test: /\.ico$/,
          loader: "file-loader?name=[name].[ext]"
        },
        {
          test: /\.(png|jpg|gif|svg|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/"
              }
            }
          ]
        }
      ]
    },
    devServer: {
      inline: true,
      port: 8118,
      historyApiFallback: true,
      contentBase: path.join(__dirname, "./build"),
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${__dirname}/src/index.html`,
        filename: "index.html",
        inject: "body"
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash].css",
        chunkFilename: "[id].css"
      }),
      new BaseHrefWebpackPlugin({ baseHref: "/" }),
      new FaviconsWebpackPlugin({ logo: "./qb_icon.png", inject: true })
    ]
  };
};
