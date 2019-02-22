# Tree Shaking
`webpack 4` provide hints to the compiler via the `"sideEffects"` `package.json` property to denote 
which files in your project are "pure" and therefore safe to prune if unused.

## Add a Utility
**webpack.config.js**
```
+ mode: 'development',
+ devtool: 'source-map',    // must, or code in bunddle will be wrapped by eval
+ optimization: {
+   usedExports: true
+ }
```
```
npm run build
```
