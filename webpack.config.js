const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Naming and path settings
var appName = 'app';
var entryPoint = './src/main.js';
var exportPath = path.resolve(__dirname, './build');

// Enviroment flag
var plugins = [];
var env = process.env.WEBPACK_ENV;

plugins.push(new VueLoaderPlugin())
// plugins.push(new ExtractTextPlugin({
//   filename: 'build/[name].bundle.css',
//   allChunks: true,
// }))

// Differ settings based on production flag
if (env === 'production') {
  // var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

  // plugins.push(new UglifyJsPlugin({ minimize: true }));
  // plugins.push(new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: '"development"'
  //     }
  //   }
  // ));

  appName = appName + '.min.js';
} else {
  appName = appName + '.js';
}

// Main Settings config
module.exports = {
  entry: entryPoint,
  output: {
    path: exportPath,
    filename: appName
  },
  module: {
    rules: [
      {
        // All .js* files
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-2']
          }
        }]
      },
      {
        // .vue components
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        // .json files. Required to correctly process a lot of npm modules
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        // .css files
        test: /\.css$/,
        use: 'css-loader?importLoaders=1'
      },
      {
        // Handle .sass/.scss files and compile
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'axios$': 'axios/dist/axios.js'
    }
  },
  plugins
};
