const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: './src/app/index.js',
    output: {
        path: __dirname + '/src/public/js',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {   //traduce codigo moderno a codigo que cualq. navegador puede entender
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.css$/i,
                use: ['css-loader'],
              },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}