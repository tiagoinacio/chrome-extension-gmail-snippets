const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ConcatPlugin = require('webpack-concat-plugin');
const GenerateJsonFile = require('generate-json-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: {
        app: './src'
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    module: {
        rules: [
            // sass loader
            {
                test: /\.css$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            // eslint loader
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: [/node_modules/, 'inboxsdk'],
                use: ['eslint-loader'],
            },
            // babel transpilation
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/react'
                        ],
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ]
    },
    plugins: [
        // clean the dist folder
        new CleanWebpackPlugin(['dist']),
        // generates the manifest file
        new GenerateJsonFile({
            filename: 'manifest.json',
            value: {
                manifest_version: 2,
                name: 'Hello World Extension',
                version: '1.0',
                permissions: [
                    'https://mail.google.com/',
                    'https://inbox.google.com/'
                ],
                content_scripts : [
                    {
                        matches: ['https://mail.google.com/*', 'https://inbox.google.com/*'],
                        js: ['inboxsdk.js', 'app.js']
                    }
                ]
            }
        }),
        // copies the inboxsdk to the dist folder
        new CopyWebpackPlugin([{
            from: './src/vendor/inboxsdk.js',
            to: './'
        }, {
            from: './src/assets/button.png',
            to: './'
        }]),
    ]
};
