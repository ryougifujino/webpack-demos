const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: "./src/index.js",
        polyfills: './src/polyfills'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.js"
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: "Shimming",
            template: "index.html",
            excludeChunks: ['polyfills']
        }),
        new webpack.ProvidePlugin({
            join: ['lodash', 'join']
        })
    ],
    module: {
        rules: [
            {
                test: require.resolve('./src/globals.js'),
                use: 'exports-loader?file,parse=helpers.parse'
            }
        ]
    }
};
