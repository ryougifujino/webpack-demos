# Getting Started

## Basic Setup
Initialize npm, install webpack locally, and install the webpack-cli
```
npm -y
npm install webpack webpack-cli --save-dev
```

Make sure we mark our package as private, as well as removing the main entry.
This is to prevent an accidental publish of your code.
**package.json**
```
{
+   "private": true,
-   "main": "index.js",
}
```

## Creating a Bundle
Install lodash
```
npm install --save lodash
```
Let's run `npx webpack`, which will take our script at `src/index.js` as the entry point, and will
 generate `dist/main.js` as the output. 

## Using a Configuration
```
npx webpack --config webpack.config.js
```
If a `webpack.config.js` is present, the webpack command picks it up by default. We use the 
`--config` option here only to show that you can pass a config of any name. 

## NPM Scripts
Adding an npm script  
**package.json**
```
"scripts": {
+      "build": "webpack"
},
```
Execute script
```
npm run build
```
Within scripts we can reference locally installed npm packages by name(here is webpack) the same 
way we did with npx. 
