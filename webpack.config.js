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
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const process = require('process');

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
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: false,
    cache: true,
    entry: './src/index.ts',
    output: isProduction
        ? {
              libraryTarget: 'commonjs',
              path: path.join(__dirname, 'dist'),
              filename: 'index.js'
          }
        : {
              libraryTarget: 'commonjs',
              path: path.join(__dirname, 'dist'),
              filename: 'genestack-ui.js'
          },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: isProduction
        ? [
              new MiniCssExtractPlugin({
                  // Options similar to the same options in webpackOptions.output
                  // all options are optional
                  filename: 'index.css',
                  ignoreOrder: false // Enable to remove warnings about conflicting order
              })
          ]
        : [],
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
                    ...(isProduction ? [MiniCssExtractPlugin.loader] : []),
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
            }
        ]
    },
    externals: [
        'react',
        'react-dom',
        'classnames',
        'dom-helpers',
        'downshift',
        'react-popper',
        'react-textarea-autosize',
        'react-transition-group'
    ],
    optimization: {
        minimize: isProduction
    }
};
