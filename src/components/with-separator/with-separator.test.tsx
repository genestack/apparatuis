/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {mount} from 'enzyme';
import * as React from 'react';

import {WithSeparator} from './with-separator';

describe('<WithSeparator />', () => {
    it('should join elements with comma', () => {
        const wrapper = mount(
            <div>
                <WithSeparator separator=",">
                    <b>a</b>
                    <b>b</b>
                    <b>c</b>
                </WithSeparator>
            </div>
        );

        expect(wrapper.text()).toBe('a,b,c');
    });

    it('should join elements with other element', () => {
        const wrapper = mount(
            <div>
                <WithSeparator separator={<i>d</i>}>
                    <b>a</b>
                    <b>b</b>
                    <b>c</b>
                </WithSeparator>
            </div>
        );

        expect(wrapper.text()).toBe('adbdc');
        expect(wrapper.find('i')).toHaveLength(2);
    });
});
