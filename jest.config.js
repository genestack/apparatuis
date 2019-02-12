/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

module.exports = {
    rootDir: process.cwd(),
    verbose: true,
    collectCoverage: true,

    testMatch: ['**/*.test.tsx', '**/*.test.ts'],

    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

    transform: {
        '\\.tsx?$': 'ts-jest',
        '\\.module\\.css$': '<rootDir>/jest-css-modules-transform'
    }
};
