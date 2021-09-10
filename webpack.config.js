const path = require('path');

module.exports = {
    entry : './src/editor-main',
    module : {
        rules : [{
            use : 'ts-loader',
            exclude : '/node_modules/'
        }]
    },
    mode: "development",
    resolve : {
        extensions : ['.ts', '.js']
    },
    output : {
        filename : 'bundle.js',
        path : path.resolve(__dirname, 'dist')
    },
    watch : true
}