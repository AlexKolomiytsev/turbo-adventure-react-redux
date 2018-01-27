const path                  = require('path'),
    webpack                 = require('webpack'),
    HtmlWebpackPlugin       = require('html-webpack-plugin'),
    CleanWebpackPlugin      = require('clean-webpack-plugin'),
    WebpackNotifierPlugin   = require('webpack-notifier'),
    ExtractTextPlugin 		= require('extract-text-webpack-plugin'),
    autoprefixer			= require('autoprefixer');

const NODE_ENV = process.env.NODE_ENV.toLowerCase();

const ENVIRONMENTS = {
    DEV     : 'development',
    STAGE   : 'staging',
    PROD    : 'production',
    TEST    : 'test',
    DEBUG   : 'debug'
};

const isDEBUG = NODE_ENV === ENVIRONMENTS.DEBUG
    || (
        NODE_ENV !== ENVIRONMENTS.STAGE
        && NODE_ENV !== ENVIRONMENTS.PROD
        && NODE_ENV !== ENVIRONMENTS.DEV
        && NODE_ENV !== ENVIRONMENTS.DEBUG
    );

const isPROD = NODE_ENV === ENVIRONMENTS.PROD;

const config = {
    app     : __dirname + '/src/app',
    dist    : __dirname + '/dist',
    src     : __dirname + '/src',
    root    : __dirname
};

const postcssConfig = path.join(config.root, 'index.html');

const webpackConfig = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
        mainFiles: ['index']
    },
    entry: {
        app: ['./src/app/index.tsx']
    },
    output: {
        filename: '[name].bundle-[hash:4].js',
        chunkFilename: '[name].chunk-[chunkhash].js',
        publicPath: '/',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                loader: 'tslint-loader'
            },
            {
                test: /\.tsx?$/,
                use: isDEBUG ? ['react-hot-loader/webpack', 'babel-loader', 'ts-loader'] : ['babel-loader', 'ts-loader'],
                include: path.join(config.src),
                exclude: /(node_modules)/
            },
            {
                test: /\.(scss|sass|css)$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { minimize: isPROD } },
                        // { loader: 'postcss-loader', options: { sourceMap: true, config: { path: postcssConfig } } },
                        { loader: 'postcss-loader', options: { sourceMap: true, parser: 'sugarss', exec: true, plugins: [require('autoprefixer')()] } },
                        'resolve-url-loader',
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ]
                })
            },
            {
                test: /\.html?$/,
                loader: 'html-loader'
            },
            {
                test: /\.(woff|woff2|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                }]
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/octet-stream'
                    }
                }]
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        hash: 'sha512',
                        digest: 'hex',
                        name: '[hash].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['app', 'common'],
            template: path.join(config.app, 'index.html')
        }),

        new webpack.DefinePlugin({
            __API__: JSON.stringify(process.env.API),
            __isDEBUG__: isDEBUG
        }),

        new webpack.optimize.CommonsChunkPlugin({name: 'common'}),

        new ExtractTextPlugin({filename: '[name]-[contenthash:5].css', allChunks: true, ignoreOrder: true}),
    ]
};

if (isDEBUG) {
    webpackConfig.entry.app.unshift('react-hot-loader/patch');
    webpackConfig.plugins.push(
        new WebpackNotifierPlugin({alwaysNotify: true})
    )
} else {
    webpackConfig.plugins.push(
        new CleanWebpackPlugin([config.dist], {verbose: true}),
        new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
    )
}

module.exports = webpackConfig;