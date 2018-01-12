const   path    = require('path'),
        webpack = require('webpack');

const webpackConfig = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
        mainFiles: ['index']
    },
    entry: {
        app: './src/app/index.tsx'
    },
    output: {
        filename: '[name].bundle-[hash:4].js',
        chunkFilename: '[name].chunk-[chunkhash].js',
        publicPath: '/',
        path: __dirname + '/dist'
    },
    plugins: [
        new webpack.DefinePlugin({
            __API__: JSON.stringify(process.env.API)
        })
    ]
};

module.exports = webpackConfig;