/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';

import {WithSeparator} from './with-separator';

describe('<WithSeparator />', () => {
    it('should join elements with comma', () => {
        render(
            <div id="test">
                <WithSeparator separator=",">
                    <b>a</b>
                    <b>b</b>
                    <b>c</b>
                </WithSeparator>
            </div>
        );

        expect(document.getElementById('test')).toHaveTextContent('a,b,c');
    });

    it('should join elements with other element', () => {
        render(
            <div id="test">
                <WithSeparator separator={<i>d</i>}>
                    <b>a</b>
                    <b>b</b>
                    <b>c</b>
                </WithSeparator>
            </div>
        );

        expect(document.getElementById('test')).toHaveTextContent('adbdc');
        expect(document.querySelectorAll('i')).toHaveLength(2);
    });
});
