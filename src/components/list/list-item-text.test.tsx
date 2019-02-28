/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-empty
import {mount, configure} from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import {Typography} from '../typography';

import {ListItemCell} from './list-item-cell';
import {ListItemText} from './list-item-text';

configure({adapter: new ReactSixteenAdapter()});

describe('<ListItemText />', () => {
    test('should use ListItemCell as root element', () => {
        const wrapper = mount(<ListItemText>Test</ListItemText>);
        expect(wrapper.children().is(ListItemCell)).toBe(true);
    });

    test('should use ListItemText element as Typography', () => {
        const wrapper = mount(<ListItemText>Test</ListItemText>);
        expect(wrapper.children().props().as).toBe(Typography);
    });

    test('should use title from children if it is string', () => {
        const wrapper = mount(<ListItemText>Test</ListItemText>);
        expect(wrapper.children().props().title).toBe('Test');
    });

    test('should use title from `title` prop', () => {
        const wrapper = mount(<ListItemText title="Override">Test</ListItemText>);
        expect(wrapper.children().props().title).toBe('Override');
    });

    test('should show console error if there is no title and children is not string', () => {
        const consoleError = jest.spyOn(console, 'error');
        consoleError.mockImplementation(() => {});

        mount(
            <ListItemText title="">
                <b>Test</b>
            </ListItemText>
        );

        expect(consoleError).toBeCalled();
        consoleError.mockClear();
    });
});
