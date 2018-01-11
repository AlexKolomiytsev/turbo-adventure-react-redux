import path from 'path';

const webpackConfig = {
    entry: {
        app: './src/app/index.tsx'
    },
    output: {
        filename: '[name].bundle-[hash:4].js',
        chunkFilename: '[name].chunk-[chunkhash].js',
        publicPath: '/',
        path: __dirname + '/dist'
    }
};

module.exports = webpackConfig;