# Environment Variables
`--env` allows you to pass in as many environment variables as you like.
```
webpack --env.NODE_ENV=local --env.production --progress
``` 
Setting up your `env` variable without assignment, `--env.production` sets `--env.production` to 
`true` by default.

To use the env variable, you must convert `module.exports` to a function:
```
const path = require('path');

module.exports = env => {
  // Use env.<YOUR VARIABLE> here:
  console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
  console.log('Production: ', env.production); // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
};
```
```
npm run build
```