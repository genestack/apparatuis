/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';
import {Button} from '../button';
import {Tab} from '../tab';

import {DropdownTabs} from './dropdown-tabs';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

// tslint:disable no-magic-numbers
describe('<DropdownTabs />', () => {
    it('should render <Button/> with icon', () => {
        const wrapper = app.mount(<DropdownTabs value={1} />);

        expect(wrapper.find(Button).prop('icon')).toBeTruthy();
    });

    it('should set values for size and variant from tabs to dropdown control', () => {
        const wrapper = app.mount(<DropdownTabs value={1} size="small" variant="solid" />);

        expect(wrapper.find(Tab).prop('size')).toBe('small');
        expect(wrapper.find(Tab).prop('variant')).toBe('solid');
    });
});
