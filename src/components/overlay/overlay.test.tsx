/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {render} from '@testing-library/react';
import * as React from 'react';

import {Overlay, Props} from './overlay';

jest.useFakeTimers();

describe('<Overlay />', () => {
    describe('on Escape keydown event', () => {
        const dispatchEvent = (event: KeyboardEvent) =>
            document.getElementById('button')!.dispatchEvent(event);

        const setup = (props?: Partial<Props>) => {
            const onClose = jest.fn();
            const screen = render(
                <Overlay open onClose={onClose} {...props}>
                    <button id="button" />
                </Overlay>
            );
            const event = new KeyboardEvent('keydown', {
                key: 'Escape',
                cancelable: true,
                bubbles: true
            });

            return {onClose, screen, event};
        };

        it('should call onClose callback', () => {
            const {onClose, event} = setup();

            dispatchEvent(event);

            expect(onClose).toHaveBeenCalled();
            expect(onClose).toHaveBeenCalledWith('escape-keydown', expect.anything());
        });

        it('should not call onClose callback when disableEscListener passed', () => {
            const {onClose, event} = setup({
                disableEscListener: true
            });

            dispatchEvent(event);

            expect(onClose).not.toHaveBeenCalled();
        });
    });

    describe('on Backdrop click', () => {
        const dispatchEvent = (event: MouseEvent) =>
            document.getElementById('backdrop')!.dispatchEvent(event);

        const setup = (props?: Partial<Props>) => {
            const onClose = jest.fn();
            const screen = render(
                <Overlay open onClose={onClose} backdropProps={{id: 'backdrop'}} {...props} />
            );

            const event = new MouseEvent('click', {
                cancelable: true,
                bubbles: true
            });

            return {onClose, screen, event};
        };

        it('should call onClose callback on Backdrop click', () => {
            const {onClose, event} = setup();

            dispatchEvent(event);

            expect(onClose).toHaveBeenCalled();
            expect(onClose).toHaveBeenCalledWith('backdrop-click', expect.anything());
        });

        it('should not call onClose callback when disableClickListener passed', () => {
            const {onClose, event} = setup({disableClickListener: true});

            dispatchEvent(event);

            expect(onClose).not.toHaveBeenCalled();
        });
    });

    it('should restore focus after close', () => {
        const onClose = jest.fn();

        const activeElement = document.activeElement;

        const screen = render(<Overlay open onClose={onClose} />);

        screen.rerender(<Overlay onClose={onClose} />);

        jest.runAllTimers();

        expect(document.activeElement).toBe(activeElement);
    });

    it('should call onClosed after close', () => {
        const onClosed = jest.fn();
        const screen = render(<Overlay open onClose={jest.fn()} onClosed={onClosed} />);
        screen.rerender(<Overlay onClose={jest.fn()} onClosed={onClosed} />);
        expect(onClosed).not.toHaveBeenCalled();
        jest.runAllTimers();
        expect(onClosed).toHaveBeenCalled();
    });

    it('should unrender after close', () => {
        const screen = render(
            <Overlay open onClose={jest.fn()}>
                <div id="test" />
            </Overlay>
        );

        screen.rerender(
            <Overlay onClose={jest.fn()}>
                <div id="test" />
            </Overlay>
        );
        expect(document.getElementById('test')).toBeTruthy();
        jest.runAllTimers();
        expect(document.getElementById('test')).toBeFalsy();
    });

    it('should stay rendered after close (used keepMounted property)', () => {
        const screen = render(
            <Overlay open keepMounted onClose={jest.fn()}>
                <div id="test" />
            </Overlay>
        );

        screen.rerender(
            <Overlay keepMounted onClose={jest.fn()}>
                <div id="test" />
            </Overlay>
        );
        expect(document.getElementById('test')).toBeTruthy();
        jest.runAllTimers();
        expect(document.getElementById('test')).toBeTruthy();
    });

    describe('when focus to sentinels', () => {
        beforeEach(() => {
            render(
                <Overlay open onClose={jest.fn()}>
                    <div>
                        <input id="first" />
                        <input id="last" />
                    </div>
                </Overlay>
            );
        });

        it('start sentinel button should exist', () => {
            expect(document.querySelectorAll('button').item(0)).toBeTruthy();
        });

        it('end sentinel button should exist', () => {
            expect(
                document
                    .querySelectorAll('button')
                    .item(document.querySelectorAll('button').length - 1)
            ).toBeTruthy();
        });

        it(
            'should focus to the first focusable element ' +
                'in the overlay after focus the start sentinel',
            () => {
                document.querySelectorAll('button').item(0).focus();
                expect(document.activeElement).toBe(document.getElementById('first'));
            }
        );

        it(
            'should focus to the last focusable element ' +
                'in the overlay after focus the end sentinel',
            () => {
                document
                    .querySelectorAll('button')
                    .item(document.querySelectorAll('button').length - 1)
                    .focus();
                expect(document.activeElement).toBe(document.getElementById('last'));
            }
        );
    });
});
