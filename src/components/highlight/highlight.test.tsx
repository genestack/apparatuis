/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import * as React from 'react';

import {Highlight, Props} from './highlight';

describe('<Highlight />', () => {
    it('should wrap word with <b> element', () => {
        const screen = render(
            <div>
                <Highlight words="str">test string</Highlight>
            </div>
        );

        expect(screen.container.innerHTML).toBe('<div>test <b>str</b>ing</div>');
    });

    it('should wrap words with <b> element', () => {
        const screen = render(
            <div>
                <Highlight words={['str', 'n']}>test string</Highlight>
            </div>
        );

        expect(screen.container.innerHTML).toBe('<div>test <b>str</b>i<b>n</b>g</div>');
    });

    it('should accept custom screen', () => {
        const renderHighlighter: Props['renderHighlighter'] = (props) => <a {...props} />;

        const screen = render(
            <div>
                <Highlight words={['str', 'n']} renderHighlighter={renderHighlighter}>
                    test string
                </Highlight>
            </div>
        );

        expect(screen.container.innerHTML).toBe('<div>test <a>str</a>i<a>n</a>g</div>');
    });
});
