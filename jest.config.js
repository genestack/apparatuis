/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

module.exports = {
    rootDir: process.cwd(),
    verbose: false,
    collectCoverage: true,
    silent: false,
    testEnvironment: 'jsdom',

    testMatch: ['**/*.test.tsx', '**/*.test.ts'],

    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

    transform: {
        '\\.tsx?$': 'ts-jest',
        '\\.module\\.css$': '<rootDir>/test-utils/jest-css-modules-transform'
    },
    moduleNameMapper: {
        '^((?!(module)).)*\\.css$': '<rootDir>/test-utils/jest-css-mock.js'
    },
    testEnvironmentOptions: {
        url: 'http://localhost/'
    }
};
