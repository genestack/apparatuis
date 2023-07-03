/*
 * Copyright (c) 2011-2020 Genestack Limited
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
const CopyPlugin = require('copy-webpack-plugin');

// Styleguidist has dependencies that are not traspiled and do not work in IE.
// Force babel-loader to transpile it manually.
const transpileDependencies = [
    'react-dev-utils',
    'ansi-regex',
    'ansi-styles',
    'chalk',
    'strip-ansi'
];

const postCssLoaderParams = {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: [
                postcssImport,
                postcssCustomProperties({preserve: false}),
                calc(),
                autoprefixer
            ]
        }
    }
};

const babelExcludePattern = new RegExp(`node_modules/(?!(${transpileDependencies.join('|')})/).*`);

const styleLoader = {
    loader: 'style-loader',
    options: {
        esModule: false
    }
};

module.exports = (env) => {
    const isProduction = env.production;

    return {
        mode: isProduction ? 'production' : 'development',
        devtool: false,
        cache: true,
        entry: './src/index.ts',
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, 'dist'),
            filename: isProduction ? 'index.js' : 'genestack-ui.js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        plugins: isProduction
            ? [
                  new MiniCssExtractPlugin({
                      // Options similar to the same options in webpackOptions.output
                      // all options are optional
                      filename: 'genestack-ui.css',
                      ignoreOrder: false // Enable to remove warnings about conflicting order
                  }),
                  new CopyPlugin({
                      patterns: [
                          {
                              context: path.join(__dirname, 'src'),
                              from: '**/*.css.d.ts',
                              to: path.join(__dirname, 'dist')
                          },
                          {
                              context: path.join(__dirname, 'src'),
                              from: 'variables.css',
                              to: path.join(__dirname, 'dist')
                          }
                      ]
                  })
              ]
            : [],
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/i,
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, './tsconfig.build.json')
                    }
                },
                {
                    test: /\.js?$/,
                    enforce: 'pre',
                    loader: 'babel-loader',
                    exclude: babelExcludePattern,
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                {
                    test: /\.module\.css/,
                    enforce: 'pre',
                    include: /src/,
                    use: [
                        ...(isProduction
                            ? [
                                  {
                                      loader: MiniCssExtractPlugin.loader,
                                      options: {
                                          esModule: false
                                      }
                                  }
                              ]
                            : [styleLoader]),
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[name]__[local]--[hash:base64:5]'
                                },
                                importLoaders: 1
                            }
                        },
                        postCssLoaderParams
                    ]
                },
                {
                    test: /\.css/,
                    enforce: 'pre',
                    exclude: /\.module\.css/,
                    use: [
                        ...(isProduction
                            ? [
                                  {
                                      loader: MiniCssExtractPlugin.loader,
                                      options: {
                                          esModule: false
                                      }
                                  }
                              ]
                            : [styleLoader]),
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        postCssLoaderParams
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/i,
                    type: 'asset/resource'
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
            '@popperjs/core',
            'react-textarea-autosize',
            'react-transition-group',
            'simplebar',
            'simplebar-react'
        ],
        optimization: {
            minimize: false
        }
    };
};
