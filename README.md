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
