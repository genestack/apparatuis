/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-non-null-assertion
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {Input} from './input';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<Input />', () => {
    it('should render input element', () => {
        app.mount(<Input id="input" />);
        expect(document.getElementById('input')!.tagName).toBe('INPUT');
    });

    it('should call onValueChange on input change', () => {
        const onValueChange = jest.fn();
        const wrapper = app.mount(<Input id="input" onValueChange={onValueChange} />);
        (document.getElementById('input')! as HTMLInputElement).value = 'foo';
        wrapper.find('input').simulate('change');
        expect(onValueChange).toBeCalledWith('foo');
    });
});
