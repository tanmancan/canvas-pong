const path = require('path');
const webpack = require('webpack');

const config = {
  contentBase: path.resolve(__dirname, 'src'),
  outputPath: path.resolve(__dirname, './dist'),
  publicPath: '/dist/'
}

module.exports = {
  entry: {
    babelpolyfill: 'babel-polyfill',
    app: './src/app.js'
  },
  output: {
    filename: '[name].js',
    path: config.outputPath,
    publicPath: config.publicPath
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
  ],
  devServer:{
    overlay: true,
    disableHostCheck: true,
    hot: true,
    inline: true,
    watchOptions: {
      poll: true
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
    }
  },
};
