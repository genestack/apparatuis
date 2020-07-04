/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

const path = require('path');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const calc = require('postcss-calc');

// Styleguidist has dependencies that are not traspiled and do not work in IE.
// Force babel-loader to transpile it manually.
const transpileDependencies = [
    'react-dev-utils',
    'ansi-regex',
    'ansi-styles',
    'chalk',
    'strip-ansi'
];

const babelExcludePattern = new RegExp(`node_modules/(?!(${transpileDependencies.join('|')})/).*`);

module.exports = {
    devtool: false,
    cache: true,
    entry: './src/index.ts',
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'dist'),
        filename: 'genestack-ui.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: babelExcludePattern,
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.module\.css/,
                include: /src/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                postcssImport,
                                postcssCustomProperties({preserve: false}),
                                calc(),
                                autoprefixer
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css/,
                exclude: /\.module\.css/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                postcssImport,
                                postcssCustomProperties({preserve: false}),
                                calc(),
                                autoprefixer
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    externals: ['classnames', 'react', 'react-dom']
};
