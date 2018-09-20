const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ConcatPlugin = require('webpack-concat-plugin');

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: [
        './src/index'
    ],
    output: {
        path: __dirname + "/build",
        filename: "[name].js"
    },
    module: {
        rules: [
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
            new UglifyJsPlugin({
                test: /index/,
            })
        ]
    },
};
