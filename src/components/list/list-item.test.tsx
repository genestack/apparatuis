/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {mount, configure} from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import {ListItem} from './list-item';

configure({adapter: new ReactSixteenAdapter()});

describe('<ListItem />', () => {
    test('should render div HTML element', () => {
        const wrapper = mount(<ListItem />);
        expect(wrapper.children().is('div')).toBe(true);
    });

    test('should be focusable', () => {
        const wrapper = mount(<ListItem />);
        expect(wrapper.children().props().tabIndex).toBe(0);
    });

    test('should be not focusable if disabled', () => {
        const wrapper = mount(<ListItem disabled />);
        expect(wrapper.children().props().tabIndex).toBe(-1);
    });

    test('should accept tabIndex', () => {
        const wrapper = mount(<ListItem tabIndex={2} />);
        expect(wrapper.children().props().tabIndex).toBe(2);
    });

    test('should spread contentProps to content element', () => {
        const wrapper = mount(<ListItem contentProps={{id: 'test'}} />);
        expect(wrapper.find('#test').length).toBeTruthy();
    });

    test('should render custom elements', () => {
        const wrapper = mount(<ListItem as="button" />);
        expect(wrapper.children().is('button')).toBe(true);
    });
});
