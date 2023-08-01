const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname,'src/index.html'),
  }),
  // new MiniCssExtractPlugin({
  //   filename: isDev ? 'name.css' : '[name].[contenthash].css',
  //   chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
  // }),
  // new EslingPlugin({ extensions: 'ts' }),
]

module.exports = {
  plugins,
  mode,
  entry: path.resolve(__dirname,'src/main.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          }
        ]
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};