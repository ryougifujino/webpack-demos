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

## Mark the file as side-effect-free
**package.json**
```
{
  "name": "your-project",
  "sideEffects": false
}
```
If code does not contain side effects, we can simply mark the property as `false` to inform webpack 
that it can safely prune unused exports.
> A "side effect" is defined as code that performs a special behavior when imported, other than 
exposing one or more exports. An example of this are polyfills, which affect the global scope and 
usually do not provide an export.

**package.json**
```
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js",     // assign code with side effects (uses micromatch)
    "*.css"
  ]
}
```
Note that any imported file is subject to tree shaking. This means if you use something like 
`css-loader` in your project and import a CSS file, it needs to be added to the side effect list so 
it will not be unintentionally dropped in production mode.

## Minify the Output
**webpack.config.js**
```
- mode: 'development',
- optimization: {
-   usedExports: true
- }
+ mode: 'production'
```
```
npm run build
```
