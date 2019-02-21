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
