/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {ListItem} from './list-item';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<ListItem />', () => {
    it('should render div HTML element', () => {
        const wrapper = app.mount(<ListItem />);
        expect(wrapper.find('div')).toHaveLength(1);
    });

    it('should be focusable', () => {
        const wrapper = app.mount(<ListItem />);
        expect(wrapper.find('div').props().tabIndex).toBe(0);
    });

    it('should be not focusable if disabled', () => {
        const wrapper = app.mount(<ListItem disabled />);
        expect(wrapper.find('div').props().tabIndex).toBe(-1);
    });

    it('should accept tabIndex', () => {
        const wrapper = app.mount(<ListItem tabIndex={2} />);
        expect(wrapper.find('div').props().tabIndex).toBe(2);
    });

    it('should render custom elements', () => {
        const wrapper = app.mount(<ListItem as="button" />);
        expect(wrapper.find('button')).toHaveLength(1);
    });

    it('should render anchor if href property passed', () => {
        app.mount(<ListItem id="test" href="foo" />);
        expect(document.getElementById('test')).toBeInstanceOf(HTMLAnchorElement);
        expect(document.getElementById('test')).toHaveProperty('href', 'http://localhost/foo');
    });
});
