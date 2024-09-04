// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
    entry: './src/doccrypt.js',
    output: {
        path: path.resolve(__dirname),
        filename: 'index.js',
        library: {
            name: 'DocCrypt',
            type: 'umd'
        }
    },
    plugins: [
        //new HtmlWebpackPlugin({
        //    template: 'index.html',
        //}),

        new webpack.ProvidePlugin({
            Buffer: [ 'buffer', 'Buffer' ]
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        })

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        fallback: {
            stream: require.resolve('stream-browserify'),
            crypto: require.resolve('crypto-browserify'),
            buffer: 'buffer/',
        }
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }

    return config;
};
