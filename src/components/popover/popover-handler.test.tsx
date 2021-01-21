/*
 * Copyright (c) 2011-2021 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/* tslint:disable no-magic-numbers */
import * as React from 'react';
import {act} from 'react-dom/test-utils';

import {createTestApp} from '../../../test-utils/create-test-app';

import {PopoverHandler, Props as PopoverHandlerProps} from './popover-handler';

const app = createTestApp();
beforeEach(app.beforeEach);
afterEach(app.afterEach);

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
});

describe('<PopoverHandler />', () => {
    const setup = (props?: Partial<PopoverHandlerProps>) =>
        app.mount(
            <PopoverHandler popoverContent={<div id="content" />} {...props}>
                <div id="reference" />
            </PopoverHandler>
        );

    it('should show popover content when mouse enter on reference element', async () => {
        const wrapper = setup();
        act(() => {
            wrapper.find('#reference').simulate('mouseenter');
        });

        act(() => {
            jest.runAllTimers();
        });

        expect(document.getElementById('content')).toBeTruthy();
    });

    it('should not show popover content immediately', () => {
        const wrapper = setup();

        act(() => {
            wrapper.find('#reference').simulate('mouseenter');
        });

        expect(document.getElementById('content')).toBeFalsy();

        act(() => {
            jest.runAllTimers();
        });
    });

    it('should hide popover content when mouse leave on reference element', () => {
        const wrapper = setup();

        act(() => {
            wrapper.find('#reference').simulate('mouseenter');
        });

        act(() => {
            jest.runAllTimers();
        });

        expect(document.getElementById('content')).toBeTruthy();

        act(() => {
            wrapper.find('#reference').simulate('mouseleave');
        });

        // should run all timers twice because after mouseleave two timers can be called sequentially
        act(() => {
            jest.runAllTimers();
        });

        act(() => {
            jest.runAllTimers();
        });

        expect(document.getElementById('content')).toBeFalsy();
    });

    it('should show popover content after `openDelay` timeout', async () => {
        const wrapper = setup({openDelay: 1000});

        act(() => {
            wrapper.find('#reference').simulate('mouseenter');
        });

        // after 700 ms should be hidden
        setTimeout(() => {
            expect(document.getElementById('content')).toBeFalsy();
        }, 700);

        jest.runTimersToTime(700);

        act(() => {
            jest.runAllTimers();
        });

        // after 1000ms are passed should be shown
        expect(document.getElementById('content')).toBeTruthy();
    });
});
