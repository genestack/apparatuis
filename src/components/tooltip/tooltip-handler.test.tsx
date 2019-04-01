/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {Tooltip} from './tooltip';
import {TooltipHandler, Props as TooltipHandlerProps} from './tooltip-handler';

jest.useFakeTimers();

const app = createTestApp();
beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<TooltipHandler />', () => {
    const setup = (props?: Partial<TooltipHandlerProps>) =>
        app.mount(
            <TooltipHandler tooltip={<Tooltip id="tooltip" />} {...props}>
                <div id="reference" />
            </TooltipHandler>
        );

    it('should show tooltip when mouse enter on reference element', () => {
        const wrapper = setup();
        wrapper.find('#reference').simulate('mouseenter');
        jest.runAllTimers();
        expect(document.getElementById('tooltip')).toBeTruthy();
    });

    it('should not show tooltip immediately', () => {
        const wrapper = setup();
        wrapper.find('#reference').simulate('mouseenter');
        expect(document.getElementById('tooltip')).toBeFalsy();
    });

    it('should close tooltip when mouse leave on reference element', () => {
        const wrapper = setup();
        wrapper.find('#reference').simulate('mouseenter');
        jest.runAllTimers();
        wrapper.find('#reference').simulate('mouseleave');
        jest.runAllTimers();
        expect(document.getElementById('tooltip')).toBeFalsy();
    });

    it('should show tooltip when focus on reference element', () => {
        const wrapper = setup();
        wrapper.find('#reference').simulate('focus');
        jest.runAllTimers();
        expect(document.getElementById('tooltip')).toBeTruthy();
    });

    it('should close tooltip when blur on reference element', () => {
        const wrapper = setup();
        wrapper.find('#reference').simulate('focus');
        jest.runAllTimers();
        wrapper.find('#reference').simulate('blur');
        jest.runAllTimers();
        expect(document.getElementById('tooltip')).toBeFalsy();
    });

    it('should close tooltip on escape window keydown event', () => {
        const wrapper = setup();
        wrapper.find('#reference').simulate('focus');
        jest.runAllTimers();
        window.dispatchEvent(
            new KeyboardEvent('keydown', {
                bubbles: true,
                key: 'Escape'
            })
        );
        jest.runAllTimers();
        expect(document.getElementById('tooltip')).toBeFalsy();
    });

    describe('when all listeners are disabled', () => {
        it('should not show tooltip on mouse enter', () => {
            const wrapper = setup({disableListeners: true});
            wrapper.find('#reference').simulate('mouseenter');
            jest.runAllTimers();
            expect(document.getElementById('tooltip')).toBeFalsy();
        });

        it('should not show tooltip on focus', () => {
            const wrapper = setup({disableListeners: true});
            wrapper.find('#reference').simulate('focus');
            jest.runAllTimers();
            expect(document.getElementById('tooltip')).toBeFalsy();
        });
    });

    describe('when only focus listener is disabled', () => {
        it('should show tooltip on mouse enter', () => {
            const wrapper = setup({disableFocusListener: true});
            wrapper.find('#reference').simulate('mouseenter');
            jest.runAllTimers();
            expect(document.getElementById('tooltip')).toBeTruthy();
        });

        it('should not show tooltip on focus', () => {
            const wrapper = setup({disableFocusListener: true});
            wrapper.find('#reference').simulate('focus');
            jest.runAllTimers();
            expect(document.getElementById('tooltip')).toBeFalsy();
        });
    });

    describe('when only hover listener is disabled', () => {
        it('should not show tooltip on mouse enter', () => {
            const wrapper = setup({disableHoverListener: true});
            wrapper.find('#reference').simulate('mouseenter');
            jest.runAllTimers();
            expect(document.getElementById('tooltip')).toBeFalsy();
        });

        it('should show tooltip on focus', () => {
            const wrapper = setup({disableHoverListener: true});
            wrapper.find('#reference').simulate('focus');
            jest.runAllTimers();
            expect(document.getElementById('tooltip')).toBeTruthy();
        });
    });
});
