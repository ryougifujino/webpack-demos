const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: "./src/index.js",
        print: "./src/print.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ]
};
