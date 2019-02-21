# Development

**webpack.config.js**
```
+   mode: 'development',
```

## Using source maps
**webpack.config.js**
```
entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
+   devtool: 'inline-source-map',   // Not for production!
```
**src/print.js**
```
export default function printMe() {
-   console.log('I get called from print.js!');
+   cosnole.log('I get called from print.js!');     // typo bug
  }
```
```
npm run build
```

## Choosing a Development Tool
Use automatic compilation in place of `run npm build`:
1. webpack's Watch Mode
2. webpack-dev-server
3. webpack-dev-middleware

### Using Watch Mode
**package.json**
```
"scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "watch": "webpack --watch",
      "build": "webpack"
    },
```
```
npm run watch
```
The only downside is that you have to refresh your browser in order to see the changes.

### Using webpack-dev-server
```
npm install --save-dev webpack-dev-server
```
**webpack.config.js**
```
    devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'     // Tell the dev server where to look for files:
+   },
```
This tells webpack-dev-server to serve the files from the `dist` directory on `localhost:8080`.
**package.json**
```
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
+     "start": "webpack-dev-server --open",
```
```
npm start (or npm run start)
```

### Using webpack-dev-middleware
`webpack-dev-middleware` is a wrapper that will emit files processed by webpack to a server.
```
npm install --save-dev express webpack-dev-middleware
```
**webpack.config.js**
```
output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
+     publicPath: '/'
    }
```
The `publicPath` will be used within our server script as well in order to make sure files are 
served correctly on `http://localhost:3000`.
**server.js**
```javascript
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```
**package.json**
```
+     "server": "node server.js",
      "build": "webpack"
```
```
npm run server
```
