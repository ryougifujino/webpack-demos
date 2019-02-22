# Production

## Setup
**development demands**
- strong source mapping
- localhost server with live reloading or hot module replacement

**production demands**
- minified bundles
- lighter weight source maps
- optimized assets to improve load time

So we typically recommend writing separate webpack configurations for each environment.

```
npm install --save-dev webpack-merge
```
Used to maintain a "common" configuration to keep things DRY.
**webpack.common.js** 
```
+ const path = require('path');
+ const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');
+
+ module.exports = {
+   entry: {
+     app: './src/index.js'
+   },
+   plugins: [
+     new CleanWebpackPlugin(['dist']),
+     new HtmlWebpackPlugin({
+       title: 'Production'
+     })
+   ],
+   output: {
+     filename: '[name].bundle.js',
+     path: path.resolve(__dirname, 'dist')
+   }
+ };
```
**webpack.dev.js**
```
+ const merge = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   mode: 'development',
+   devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   }
+ });
```
**webpack.prod.js**
```
+ const merge = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   mode: 'production',
+ });
```

## NPM Scripts
**package.json**
```
    "scripts": {
+     "start": "webpack-dev-server --open --config webpack.dev.js",
-     "build": "webpack"
+     "build": "webpack --config webpack.prod.js"
    },
```

## Specify the Mode
`process.env.NODE_ENV` is not set to `"production"` within the build script `webpack.config.js`.

## Minification
production mode - TerserPlugin - start for minification
