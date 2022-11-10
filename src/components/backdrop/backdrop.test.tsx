/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {mount} from 'enzyme';
import * as React from 'react';

import {Backdrop} from './backdrop';

jest.useFakeTimers();

describe('Backdrop Component', () => {
    xtest('should unmount children after close and end transition', () => {
        const wrapper = mount(<Backdrop open />);
        expect(wrapper.html()).toBeTruthy();
        wrapper.setProps({open: false});
        expect(wrapper.html()).toBeTruthy();
        jest.runAllTimers();
        expect(wrapper.html()).toBeFalsy();
    });

    test('should pass onExited callback to Fade element', () => {
        const onExited = jest.fn();

        const wrapper = mount(<Backdrop open fadeProps={{onExited}} />);
        wrapper.setProps({open: false});
        jest.runAllTimers();
        expect(onExited).toBeCalled();
    });
});
