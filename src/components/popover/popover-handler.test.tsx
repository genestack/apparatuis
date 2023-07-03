/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {act, fireEvent, render, waitFor} from '@testing-library/react';
import * as React from 'react';

import {PopoverHandler, Props as PopoverHandlerProps} from './popover-handler';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
});

describe('<PopoverHandler />', () => {
    const setup = (props?: Partial<PopoverHandlerProps>) =>
        render(
            <PopoverHandler popoverContent={<div id="content" />} {...props}>
                <div id="reference" />
            </PopoverHandler>
        );

    it('should show popover content when mouse enter on reference element', async () => {
        setup();

        act(() => {
            fireEvent.mouseEnter(document.getElementById('reference')!);
        });

        act(() => {
            jest.runAllTimers();
        });

        await waitFor(() => {
            expect(document.getElementById('content')).toBeTruthy();
        });
    });

    it('should not show popover content immediately', () => {
        setup();

        act(() => {
            fireEvent.mouseEnter(document.getElementById('reference')!);
        });

        expect(document.getElementById('content')).toBeFalsy();

        act(() => {
            jest.runAllTimers();
        });
    });

    it('should hide popover content when mouse leave on reference element', () => {
        setup();

        act(() => {
            fireEvent.mouseEnter(document.getElementById('reference')!);
        });

        act(() => {
            jest.runAllTimers();
        });

        expect(document.getElementById('content')).toBeTruthy();

        act(() => {
            fireEvent.mouseLeave(document.getElementById('reference')!);
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
        setup({openDelay: 1000});

        act(() => {
            fireEvent.mouseEnter(document.getElementById('reference')!);
        });

        // after 700 ms should be hidden
        setTimeout(() => {
            expect(document.getElementById('content')).toBeFalsy();
        }, 700);

        jest.advanceTimersByTime(700);

        act(() => {
            jest.runAllTimers();
        });

        // after 1000ms are passed should be shown
        expect(document.getElementById('content')).toBeTruthy();
    });
});
