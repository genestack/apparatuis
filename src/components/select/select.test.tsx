/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {Emitter} from './emitter';
import {Option} from './option';
import {Select} from './select';
import {SelectMenu} from './select-menu';
import {SelectNative} from './select-native';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

const mockOnValueChange = jest.fn();

describe('<Select />', () => {
    // Menu select
    it('should render menu select', () => {
        const wrapper = app.mount(<Select />);
        expect(wrapper.find(SelectNative)).toHaveLength(0);
        expect(wrapper.find(SelectMenu)).toHaveLength(1);
    });

    it('should render emitter as button', () => {
        const wrapper = app.mount(<Select />);
        expect(wrapper.find(Emitter).getDOMNode().tagName).toBe('BUTTON');
    });

    // Native select
    it('should render native select', () => {
        const wrapper = app.mount(<Select native />);
        expect(wrapper.find(SelectNative)).toHaveLength(1);
        expect(wrapper.find(SelectMenu)).toHaveLength(0);
    });

    it('should render emitter as div', () => {
        const wrapper = app.mount(<Select native />);
        expect(wrapper.find(Emitter).getDOMNode().tagName).toBe('DIV');
    });

    it('should render Option as option', () => {
        const wrapper = app.mount(
            <Select native>
                <Option value="1" />
            </Select>
        );
        expect(wrapper.find('option')).toHaveLength(1);
    });

    it('should render emitter with placeholder', () => {
        const wrapper = app.mount(
            <Select
                native
                value="0"
                placeholder="Some placeholder"
                onValueChange={mockOnValueChange}
            >
                <Option value="1" label="Some value" />
            </Select>
        );

        expect(wrapper.find(Emitter).text()).toBe('Some placeholder');
    });

    it('should render emitter with custom label', () => {
        const wrapper = app.mount(
            <Select native value="1" onValueChange={mockOnValueChange}>
                <Option value="1" label="Some text" />
            </Select>
        );

        expect(wrapper.find(Emitter).text()).toBe('Some text');
    });
});
