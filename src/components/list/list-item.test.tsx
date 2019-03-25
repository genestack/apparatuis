/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {mount} from 'enzyme';
import * as React from 'react';

import {ListItem} from './list-item';

describe('<ListItem />', () => {
    test('should render div HTML element', () => {
        const wrapper = mount(<ListItem />);
        expect(wrapper.find('div')).toHaveLength(1);
    });

    test('should be focusable', () => {
        const wrapper = mount(<ListItem />);
        expect(wrapper.find('div').props().tabIndex).toBe(0);
    });

    test('should be not focusable if disabled', () => {
        const wrapper = mount(<ListItem disabled />);
        expect(wrapper.find('div').props().tabIndex).toBe(-1);
    });

    test('should accept tabIndex', () => {
        const wrapper = mount(<ListItem tabIndex={2} />);
        expect(wrapper.find('div').props().tabIndex).toBe(2);
    });

    test('should render custom elements', () => {
        const wrapper = mount(<ListItem as="button" />);
        expect(wrapper.find('button')).toHaveLength(1);
    });
});
