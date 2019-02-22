# Code Splitting
Split your code into various bundles which can then be loaded on demand or in parallel.  
**three general approaches**
- Entry Points: Manually split code using `entry` configuration.
- Prevent Duplication: Use the `SplitChunksPlugin` to dedupe and split chunks.
- Dynamic Imports: Split code via inline function calls within modules.

## Entry Points
**webpack.config.js**
```
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
+   another: './src/another-module.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
```
npm run build
```
**pitfalls**
- If there are any duplicated modules between entry chunks they will be included in both bundles.
- It isn't as flexible and can't be used to dynamically split code with the core application logic. 

## Prevent Duplication
The `SplitChunksPlugin` allows us to extract common dependencies into an existing entry chunk or an 
entirely new chunk.

**webpack.config.js**
```
+   optimization: {
+     splitChunks: {
+       chunks: 'all'
+     }
+   }
```
```
npm run build
```

## Dynamic Imports
- `import()` syntax
- `require.ensure`
**webpack.config.js**
```
  const path = require('path');

  module.exports = {
    mode: 'development',
    entry: {
+     index: './src/index.js'
-     index: './src/index.js',
-     another: './src/another-module.js'
    },
    output: {
      filename: '[name].bundle.js',
+     chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
-   optimization: {
-     splitChunks: {
-       chunks: 'all'
-     }
-   }
  };
```
`chunkFilename` determines the name of non-entry chunk files.
```
npm run build
``` 
