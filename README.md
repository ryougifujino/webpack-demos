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

## Granular Shimming
When the module is executed in a CommonJS context(in this example does't) where `this` is equal to 
`module.exports`. In this case you can override this using the `imports-loader`:  
```
npm install --save-dev imports-loader
```
**webpack.config.js**
```
+   module: {
+     rules: [
+       {
+         test: require.resolve('./src/index.js'),
+         use: 'imports-loader?this=>window'
+       }
+     ]
+   },
```

## Global Exports
We can use `exports-loader`, to export that global variable as a normal module export.  
```
npm install --save-dev exports-loader
```
**webpack.config.js**
```
    module: {
      rules: [
-       {
-         test: require.resolve('./src/index.js'),
-         use: 'imports-loader?this=>window'
-       }
+       },
+       {
+         test: require.resolve('./src/globals.js'),
+         use: 'exports-loader?file,parse=helpers.parse'
+       }
      ]
    },
```
```
npm run build
```

## Loading Polyfills
There are many misconceptions in the community, as well, that modern browsers "don't need" 
polyfills, or that polyfills/shims merely serve to add missing features - in fact, they often repair 
broken implementations, even in the **most modern of browsers**.   

The **best practice** thus remains to unconditionally and synchronously load all polyfills/shims, 
despite the bundle size cost this incurs.

**The two ways of loading polyfills**
- Import directly
- Import conditionally


### Import directly
```
npm install --save babel-polyfill
```
**src/index.js**
```
+ import 'babel-polyfill';
+
  function component() {
    var element = document.createElement('div');

    element.innerHTML = join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

### Import conditionally
```
npm install --save babel-polyfill whatwg-fetch
```
**src/index.js**
```
- import 'babel-polyfill';
- 
...
```
**src/polyfills.js**
```
import 'babel-polyfill';
import 'whatwg-fetch';
```
**webpack.config.js**
```
  module.exports = {
-   entry: './src/index.js',
+   entry: {
+     polyfills: './src/polyfills.js',
+     index: './src/index.js'
+   },
    output: {
-     filename: 'bundle.js',
+     filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: "Shimming",
+           template: "index.html",
+           excludeChunks: ['polyfills']
        }),
        new webpack.ProvidePlugin({
            join: ['lodash', 'join']
        })
    ],
```
We can add the logic to conditionally load our new `polyfills.bundle.js` file.
**dist/index.html**
```
  <!doctype html>
  <html>
    <head>
      <title>Getting Started</title>
+     <script>
+       var modernBrowser = (
+         'fetch' in window &&
+         'assign' in Object
+       );
+
+       if ( !modernBrowser ) {
+         var scriptElement = document.createElement('script');
+
+         scriptElement.async = false;
+         scriptElement.src = 'polyfills.bundle.js';
+         document.head.appendChild(scriptElement);
+       }
+     </script>
    </head>
    <body>
    </body>
  </html>
```
```
npm run build
```