# Shimming

**use cases**
- "broken modules" (e.g. $ for jQuery)
- polyfill (i.e. load them on demand).

## Shimming Globals
The `ProvidePlugin` makes a package available as a variable in every module compiled through webpack.

**webpack.config.js**
```
  const path = require('path');
+ const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
-   }
+   },
+   plugins: [
+     new webpack.ProvidePlugin({
+       _: 'lodash'
+     })
+   ]
  };
```
```
npm run build
```

We can also use the `ProvidePlugin` to expose a single export of a module by configuring it with an 
"array path" (e.g. `[module, child, ...children?]`).

**webpack.config.js**
```
      new webpack.ProvidePlugin({
-       _: 'lodash'
+       join: ['lodash', 'join']
      })
```
This would go nicely with Tree Shaking as the rest of the `lodash` library should get dropped.
```
npm run build
```
