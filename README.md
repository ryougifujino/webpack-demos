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
