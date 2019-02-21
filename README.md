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

## Loading Images
```
npm install file-loader --save-dev
```
**webpack.config.js**
```
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
```
When you `import MyImage from './my-image.png'`, that image will be processed and added to your 
output directory and the `MyImage` variable will contain the final url of that image after processing.  
`css-loader` will handle `url('./my-image.png')` and `html-loader` will handle `<img src="./my-image.png" />`.
```
npm run build
```
