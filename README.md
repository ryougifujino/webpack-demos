# Integration With Babel

```
npm install -D babel-loader @babel/core @babel/preset-env
```

**webpack.config.js**
```
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```
`options` can be configured in `.babelrc`

**.babelrc**
```
{
  "presets": [
    "@babel/preset-env"
  ]
}

```
```
npm run build
```

## Polyfill
```
npm install --save @babel/polyfill
```
Babel includes a polyfill that includes a custom `regenerator` runtime and `core-js`.

**package.json**
```
"browserslist": "IE >= 10",
```
(write this in `package.json` is recommend by official doc)

**When used alongside `@babel/preset-env`**
- If `useBuiltIns: 'usage'` is specified in `.babelrc` then do not include `@babel/polyfill` in 
either `webpack.config.js` entry array nor source. Note, `@babel/polyfill` still needs to be 
installed.
- If `useBuiltIns: 'entry'` is specified in `.babelrc` then include `@babel/polyfill` at the top of 
the entry point to your application via `require` or `import` as discussed above.
- If `useBuiltIns` key is not specified or it is explicitly set with `useBuiltIns: false` in your 
`.babelrc`, add `@babel/polyfill` directly to the entry array in your `webpack.config.js`.

**.babelrc**
```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage"
      }
    ]
  ]
}

```
```
npm run build
```