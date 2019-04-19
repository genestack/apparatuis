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

jest.useFakeTimers();

const app = createTestApp();
beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<Tooltip />', () => {
    it('should render children', () => {
        app.mount(
            <Tooltip referenceElement={document.createElement('div')} open>
                <div id="test" />
            </Tooltip>
        );
        expect(document.getElementById('test')).toBeTruthy();
    });

    it('should not mount when closed', () => {
        const wrapper = app.mount(
            <Tooltip referenceElement={document.createElement('div')} open>
                <div id="test" />
            </Tooltip>
        );

        wrapper.setProps({open: false});
        jest.runAllTimers();

        expect(document.getElementById('test')).toBeFalsy();
    });

    it('should call onClose on window escape keydown', () => {
        const onClose = jest.fn();

        app.mount(
            <Tooltip referenceElement={document.createElement('div')} open onClose={onClose}>
                <div id="test" />
            </Tooltip>
        );

        window.dispatchEvent(
            new KeyboardEvent('keydown', {
                bubbles: true,
                key: 'Escape'
            })
        );

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledWith('escape_keydown', expect.anything());
    });

    it('should call onClose on window escape keydown when listener is disabled', () => {
        const onClose = jest.fn();

        app.mount(
            <Tooltip
                referenceElement={document.createElement('div')}
                open
                onClose={onClose}
                disableEscListener
            >
                <div id="test" />
            </Tooltip>
        );

        window.dispatchEvent(
            new KeyboardEvent('keydown', {
                bubbles: true,
                key: 'Escape'
            })
        );

        expect(onClose).not.toBeCalled();
    });
});
