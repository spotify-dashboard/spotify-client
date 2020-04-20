var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/public');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  plugins: [
      new MiniCssExtractPlugin({
          filename: devMode ? '[name].css' : '[name].[hash].css',
          chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      })
  ],
  module: {
    rules: [
        {
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                'presets': ['@babel/preset-env', '@babel/preset-react']
            }
        },
        {
            test: /\.module\.s(a|c)ss$/,
            loader: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                loader: 'css-loader',
                options: {
                    modules: true,
                    sourceMap: devMode
                }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: devMode
                    }
                }
            ]
        },
        {
            test: /\.s(a|c)ss$/,
            exclude: /\.module.(s(a|c)ss)$/,
            loader: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                {
                loader: 'sass-loader',
                options: {
                    sourceMap: devMode
                }
                }
            ]
        }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  }
};