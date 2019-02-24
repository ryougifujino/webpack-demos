const path = require('path');

module.exports = env => {
    console.log(env.NODE_ENV);
    console.log(env.production);

    return {
        entry: "./src/index.js",
        output:
            {
                path: path.resolve(__dirname, 'dist'),
                filename:
                    "main.js"
            }
    };
};
