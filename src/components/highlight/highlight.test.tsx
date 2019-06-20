/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {Highlight, Props} from './highlight';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<Highlight />', () => {
    it('should wrap word with <b> element', () => {
        const wrapper = app.mount(
            <div>
                <Highlight words="str">test string</Highlight>
            </div>
        );

        expect(wrapper.html()).toBe('<div>test <b>str</b>ing</div>');
    });

    it('should wrap words with <b> element', () => {
        const wrapper = app.mount(
            <div>
                <Highlight words={['str', 'n']}>test string</Highlight>
            </div>
        );

        expect(wrapper.html()).toBe('<div>test <b>str</b>i<b>n</b>g</div>');
    });

    it('should accept custom wrapper', () => {
        const renderHighlighter: Props['renderHighlighter'] = (props) => <a {...props} />;

        const wrapper = app.mount(
            <div>
                <Highlight words={['str', 'n']} renderHighlighter={renderHighlighter}>
                    test string
                </Highlight>
            </div>
        );

        expect(wrapper.html()).toBe('<div>test <a>str</a>i<a>n</a>g</div>');
    });
});
