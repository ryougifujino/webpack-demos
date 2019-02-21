# Output Management

## Preparation
**webpack.config.js**
```
  const path = require('path');

  module.exports = {
-   entry: './src/index.js',
+   entry: {
+     app: './src/index.js',
+     print: './src/print.js'
+   },
    output: {
-     filename: 'bundle.js',
+     filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```
```
npm run build
```

## Setting up HtmlWebpackPlugin
But what would happen if we changed the name of one of our entry points, or even added a new one? 
The generated bundles would be renamed on a build, but our index.html file would still reference the 
old names. Let's fix that with the HtmlWebpackPlugin.
```
npm install html-webpack-plugin --save-dev
```
**webpack.config.js**
```
  const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: 'Output Management'
+     })
+   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```
```
npm run build
```

## Cleaning up the /dist folder
```
npm install --save-dev clean-webpack-plugin
```
```
+ const CleanWebpackPlugin = require('clean-webpack-plugin');
...
+     new CleanWebpackPlugin(['dist']),
```
```
npm run build
```
