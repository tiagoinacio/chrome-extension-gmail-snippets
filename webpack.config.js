const debug = process.env.NODE_ENV !== 'production';
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const GenerateJsonFile = require('generate-json-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: __dirname,
    devtool: debug ? 'inline-sourcemap' : null,
    entry: {
        app: './src',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            // sass loader
            {
                test: /\.css$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader', // compiles Sass to CSS, using Node Sass by default
                ],
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
                            '@babel/react',
                        ],
                        plugins: ['transform-class-properties'],
                    },
                },
            },
        ],
    },
    optimization: {
        minimizer: [
            // Minify and mangle
            new UglifyJsPlugin(),
        ],
    },
    plugins: [
        // clean the dist folder
        new CleanWebpackPlugin(['dist']),
        // generates the manifest file
        new GenerateJsonFile({
            filename: 'manifest.json',
            value: {
                manifest_version: 2,
                name: 'Chrome Extension Gmail Snippets',
                version: '1.0',
                permissions: [
                    'https://mail.google.com/',
                    'https://inbox.google.com/',
                    'webRequest',
                    'webRequestBlocking',
                ],
                // hack to allow for cors request for the iframe
                background: {
                    scripts: ['background.js'],
                    persistent: true,
                },
                icons: {
                    16: 'icon-16.png',
                    32: 'icon-32.png',
                    128: 'icon-128.png',
                },
                content_scripts: [
                    {
                        matches: [
                            'https://mail.google.com/*',
                            'https://inbox.google.com/*',
                        ],
                        js: [
                            'inboxsdk.js',
                            'app.js',
                        ],
                        // The "all_frames" field allows the extension to specify if
                        // JavaScript and CSS files should be injected into all frames
                        // matching the specified URL requirements
                        // or only into the topmost frame in a tab.
                        all_frames: true,
                    },
                ],
                /*
                The content security policy for Chrome Apps restricts you from doing the following:
                You can’t use inline scripting in your Chrome App pages. The restriction bans both
                <script> blocks and event handlers (<button onclick="...">).
                You can’t reference any external resources in any of your app files
                (except for video and audio resources).
                You can’t embed external resources in an iframe.
                You can’t use string-to-JavaScript methods like eval() and new Function().
                */
                content_security_policy: "script-src 'self' https://email-snippets.herokuapp.com; frame-src 'self' https://email-snippets.herokuapp.com; object-src 'self'",
            },
        }),
        // copies the inboxsdk to the dist folder
        // find a clever way in the future to not repeat this logic
        new CopyWebpackPlugin([{
            from: './src/vendor/inboxsdk.js',
            to: './inboxsdk.js',
        }, {
            from: './src/assets/button.png',
            to: './button.png',
        }, {
            from: './src/assets/icon-16.png',
            to: './icon-16.png',
        }, {
            from: './src/assets/icon-32.png',
            to: './icon-32.png',
        }, {
            from: './src/assets/icon-128.png',
            to: './icon-128.png',
        }, {
            from: './src/background.js',
            to: './',
        }]),
    ],
};
