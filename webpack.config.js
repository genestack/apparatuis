/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssImport = require('postcss-import');

module.exports = {
    devtool: false,
    cache: true,
    entry: './src/index.js',
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'dist'),
        filename: 'genestack-ui.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                include: /src/
            },
            {
                test: /\.module\.css/,
                include: /src/,
                use: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'style-loader'
                    }],
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoader: 1,
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [postcssImport, postcssCustomProperties({preserve: false})]
                        }
                    }]
                })
            },
            {
                test: /\.css/,
                exclude: /\.module\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'style-loader'
                    }],
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoader: 1
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [postcssImport, postcssCustomProperties({preserve: false})]
                        }
                    }]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('genestack-ui.css')
    ],
    externals: [
        'classnames',
        'react',
        'react-dom',
        'prop-types'
    ]
};
