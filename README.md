# Asset Management

## Loading CSS
In order to import a CSS file from within a JavaScript module, you need to install and add the 
style-loader and css-loader to your module configuration:
```
npm install style-loader css-loader --save-dev
```
**webpack.config.js**
```
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'        // will be first used
+         ]
+       }
+     ]
+   }
```
This enables you to import `'./style.css'` into the file that depends on that styling. Now, when 
that module is run, a `<style>` tag with the stringified css will be inserted into the `<head>` of 
your html file.
```
npm run build
```
