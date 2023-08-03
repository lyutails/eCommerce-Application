const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname,'public/index.html'),
    favicon: path.resolve(__dirname,'public/favicon/favicon.ico'),
  }),
  new MiniCssExtractPlugin({
    filename:'[name].css',
  }),
]

module.exports = {
  plugins,
  mode,
  entry: path.resolve(__dirname,'src/main.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    port: 3001,
    hot: true,
    historyApiFallback: true
  },
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions:{
                plugins: [require('postcss-preset-env')]
              }
            },
          },
          'sass-loader'
        ],
      },
      {
        test: /\.(ttf?|woff?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'public/[name].[ext][query]',
    clean: true,
  },
};