const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.bundle.js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "merogers.dev",
      filename: "index.html",
      template: "src/index.html",
      favicon: "src/assets/favicon.ico",
      author: "Michelle Rogers",
      description: "Full-Stack Web Developer",
      keywords:
        "web developer, fullstack, full stack, react, javascript, mongodb, google cloud, gcp",
    }),
    new MiniCssExtractPlugin({
      linkType: "text/css",
      filename: "styles.css",
      chunkFilename: "[name].css",
    }),
  ],
};
