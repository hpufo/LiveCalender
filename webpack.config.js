var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./app.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/, 
        loader: 'babel-loader',
        query: {
          presets: [['env', { modules: false }], 'react', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  output: {
    path: __dirname + "/build/",
    filename: "app.min.js"
  },
  plugins: debug ? [] : [
    new webpack.LoaderOptionsPlugin({minimize: true, debug: false}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};