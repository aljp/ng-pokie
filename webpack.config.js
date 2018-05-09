const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const PROJECT_FOLDER = path.join(__dirname, '.');
const NODE_MODULES = path.join(PROJECT_FOLDER, 'node_modules');
const SRC_FOLDER = path.join(PROJECT_FOLDER, 'src');
const BUILD_FOLDER = path.join(PROJECT_FOLDER, 'dist');

module.exports = {
    entry: {
        // app: ['babel-polyfill', path.join(SRC_FOLDER, 'js', 'ngPokie.js')]
        app: path.join(SRC_FOLDER, 'index.js')
    },
    output: {
        path: BUILD_FOLDER,
        filename: 'ngPokie.js'
    },
    plugins: [
        new ngAnnotatePlugin({
            add: true
        }),
        new miniCssExtractPlugin({
            filename: 'bundle.css'
        })
    ],
    mode: 'production',
    module: {
        rules: [{
                test: /\.js$/,
                include: [
                    SRC_FOLDER
                ],
                loaders: ['ng-annotate-loader', {
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }]//, 'source-map-loader']  // Uncomment for source map support
            },
            {
                test: /\.html$/,
                include: [
                    SRC_FOLDER
                ],
                loader: 'html-loader'
            },
            {
                test: /\.scss$/,
                include: [
                    SRC_FOLDER
                ],
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    }
};
