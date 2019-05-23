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

import {Textarea} from './textarea';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<Textarea />', () => {
    it('should render textarea element', () => {
        app.mount(<Textarea id="textarea" />);
        expect(document.getElementById('textarea')!.tagName).toBe('TEXTAREA');
    });

    it('should call onValueChange on textarea change', () => {
        const onValueChange = jest.fn();
        const wrapper = app.mount(<Textarea id="textarea" onValueChange={onValueChange} />);
        (document.getElementById('textarea')! as HTMLTextAreaElement).value = 'foo';
        wrapper.find('textarea').simulate('change');
        expect(onValueChange).toBeCalledWith('foo');
    });
});
