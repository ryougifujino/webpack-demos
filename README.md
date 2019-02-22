# Caching

## Output Filenames
We can use the `output.filename` substitutions setting to define the names of our output files.  
The `[contenthash]` substitution will add a unique hash based on the content of an asset.

**webpack.config.js**
```
  const path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
-       title: 'Output Management'
+       title: 'Caching'
      })
    ],
    output: {
-     filename: 'bundle.js',
+     filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```
```
npm run build
```
> Newer versions may not have all the same issues(run build twice and hashes are different) with 
hashing as some older versions.

## Extracting Boilerplate
webpack provides an optimization feature to split runtime code into a separate chunk using the 
`optimization.runtimeChunk` option.
 
**webpack.config.js**
```
+   optimization: {
+     runtimeChunk: 'single'
+   }
```
Set it to single to create a single runtime bundle for all chunks.

**webpack.config.js**
```
+     splitChunks: {
+       cacheGroups: {
+         vendor: {
+           test: /[\\/]node_modules[\\/]/,
+           name: 'vendors',
+           chunks: 'all'
+         }
+       }
+     }
```
It's also good practice to extract third-party libraries, such as `lodash` or `react`, to a separate 
`vendor` chunk as they are less likely to change than our local source code. This step will allow 
clients to request even less from the server to stay up to date.
```
npm run build
```
