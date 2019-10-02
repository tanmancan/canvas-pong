const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  contentBase: path.resolve(__dirname, 'src'),
  outputPath: path.resolve(__dirname, './dist'),
  publicPath: '/dist/',
};

module.exports = {
  entry: {
    babelpolyfill: 'babel-polyfill',
    app: './src/app.ts',
  },
  output: {
    filename: '[name].js',
    path: config.outputPath,
    publicPath: config.publicPath,
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  devServer: {
    overlay: true,
    disableHostCheck: true,
    hot: true,
    inline: true,
    watchOptions: {
      poll: true,
    },
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|wav)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.wav$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name][hash].[ext]',
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /(node_modules)/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
    },
  },
};
