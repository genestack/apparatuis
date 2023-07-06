/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {act, render, waitFor} from '@testing-library/react';
import * as React from 'react';

import {Tooltip} from './tooltip';

jest.useFakeTimers();

describe('<Tooltip />', () => {
    it('should render children', async () => {
        render(
            <Tooltip referenceElement={document.createElement('div')} open>
                <div id="test" />
            </Tooltip>
        );

        await waitFor(() => expect(document.getElementById('test')).toBeTruthy());
    });

    it('should not mount when closed', () => {
        const div = document.createElement('div');
        const screen = render(
            <Tooltip referenceElement={div} open>
                <div id="test" />
            </Tooltip>
        );

        screen.rerender(
            <Tooltip referenceElement={div}>
                <div id="test" />
            </Tooltip>
        );

        act(() => jest.runAllTimers());

        expect(document.getElementById('test')).toBeFalsy();
    });

    it('should call onClose on window escape keydown', async () => {
        const onClose = jest.fn();

        render(
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

        await waitFor(() => {
            expect(onClose).toHaveBeenCalledTimes(1);
            expect(onClose).toHaveBeenCalledWith('escape_keydown', expect.anything());
        });
    });

    it('should call onClose on window escape keydown when listener is disabled', async () => {
        const onClose = jest.fn();

        render(
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

        await waitFor(() => expect(onClose).not.toHaveBeenCalled());
    });
});
