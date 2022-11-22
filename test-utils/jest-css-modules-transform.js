/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

const fs = require('fs');

const reg = /^export const (.+)?: string;$/gm;

/**
 * Temporary css modules jest transformer.
 * Will be removed after NPM will start to work.
 * https://www.npmjs.com/package/jest-css-modules-transform
 */
module.exports = {
    /**
     * @param {string} src
     * @param {string} filePath
     */
    process: (src, filePath) => {
        const classNames = [];

        try {
            const dts = fs.readFileSync(`${filePath}.d.ts`, 'utf-8');
            let match = reg.exec(dts);

            while (match !== null) {
                classNames.push(match[1]);
                match = reg.exec(dts);
            }
        } catch (error) {}

        return {
            code: `module.exports = {\n${
                classNames.map((className) => `    "${className}":"${className}"`).join(',\n')
            }\n}`
        };
    }
};
