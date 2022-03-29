const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = {
    entry: './src/client/index.js',
    mode: "production",
    output: {
      filename: 'js/main.js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [
          {
            test: '/\.js$/',
            exclude: /node_modules/,
            loader: "babel-loader"
          },
          {
            test: /\.scss$/,
            use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
          },
          {
            test: /\.(png|jp(e*)g|svg)$/,  
            use: [{
                loader: 'file-loader',
                options: { 
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: 'images/[hash]-[name].[ext]'
                } 
            }]
        },
        ],
      },
      plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({filename: 'css/[name].css'}),
        new WorkboxPlugin.GenerateSW()
    ]
};