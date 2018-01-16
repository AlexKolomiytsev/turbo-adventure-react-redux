const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV.toLowerCase();

const ENVIRONMENTS = {
    DEV: 'dev',
    STAGE: 'staging',
    PROD: 'prod',
    TEST: 'test',
    DEBUG: 'debug'
};

const isDEBUG = NODE_ENV === ENVIRONMENTS.DEBUG
    || (
        NODE_ENV !== ENVIRONMENTS.STAGE
        && NODE_ENV !== ENVIRONMENTS.PROD
        && NODE_ENV !== ENVIRONMENTS.DEV
        && NODE_ENV !== ENVIRONMENTS.DEBUG
    );

const config = {
    app: __dirname + '/src/app',
    dist: __dirname + '/dist'
};

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
        new HtmlWebpackPlugin({
            chunks: ['app', 'common'],
            template: path.join(config.app, 'index.html')
        }),

        new webpack.DefinePlugin({
            __API__: JSON.stringify(process.env.API)
        }),

        new webpack.optimize.CommonsChunkPlugin({ name: 'common' })
    ]
};

if (isDEBUG) {

} else {
    webpackConfig.plugins.push(
        new CleanWebpackPlugin([config.dist], { verbose: true }),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
    )
}

module.exports = webpackConfig;