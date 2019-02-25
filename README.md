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
