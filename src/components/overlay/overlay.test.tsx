/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-use-before-declare no-non-null-assertion no-unnecessary-type-assertion
import * as enzyme from 'enzyme';
import * as React from 'react';

import {OverlayCloseReason} from './close-reason';
import {Overlay, Props} from './overlay';

jest.useFakeTimers();

describe('<Overlay />', () => {
    let localWrapper: enzyme.ReactWrapper<any> | null = null;
    function mount<P>(element: React.ReactElement<P>) {
        if (localWrapper) {
            localWrapper.unmount();
        }

        localWrapper = enzyme.mount(element);

        return localWrapper as enzyme.ReactWrapper<P>;
    }

    beforeEach(() => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    });

    afterEach(() => {
        if (localWrapper) {
            localWrapper.unmount();
            localWrapper = null;
        }
    });

    describe('on Escape keydown event', () => {
        const dispatchEvent = (event: KeyboardEvent) =>
            document.getElementById('button')!.dispatchEvent(event);

        const setup = (props?: Partial<Props>) => {
            const onClose = jest.fn();
            const wrapper = mount(
                <Overlay open onClose={onClose} {...props}>
                    <button id="button" />
                </Overlay>
            );
            const event = new KeyboardEvent('keydown', {
                key: 'Escape',
                cancelable: true,
                bubbles: true
            });

            return {onClose, wrapper, event};
        };

        it('should call onClose callback', () => {
            const {onClose, event} = setup();

            dispatchEvent(event);

            expect(onClose).toBeCalled();
            expect(onClose).toBeCalledWith(OverlayCloseReason.ESCAPE_KEYDOWN, expect.anything());
        });

        it('should not call onClose callback when disableEscHandler passed', () => {
            const {onClose, event} = setup({
                disableEscHandler: true
            });

            dispatchEvent(event);

            expect(onClose).not.toBeCalled();
        });

        it('should not call onClose callback when event is prevented', () => {
            const {onClose, event} = setup();

            event.preventDefault();
            dispatchEvent(event);

            expect(onClose).not.toBeCalled();
        });
    });

    describe('on Backdrop click', () => {
        const dispatchEvent = (event: MouseEvent) =>
            document.getElementById('backdrop')!.dispatchEvent(event);

        const setup = (props?: Partial<Props>) => {
            const onClose = jest.fn();
            const wrapper = mount(
                <Overlay open onClose={onClose} backdropProps={{id: 'backdrop'}} {...props} />
            );

            const event = new MouseEvent('click', {
                cancelable: true,
                bubbles: true
            });

            return {onClose, wrapper, event};
        };

        it('should call onClose callback on Backdrop click', () => {
            const {onClose, event} = setup();

            dispatchEvent(event);

            expect(onClose).toBeCalled();
            expect(onClose).toBeCalledWith(OverlayCloseReason.BACKDROP_CLICK, expect.anything());
        });

        it('should not call onClose callback when disableClickHandler passed', () => {
            const {onClose, event} = setup({disableClickHandler: true});

            dispatchEvent(event);

            expect(onClose).not.toBeCalled();
        });

        it('should not call onClose callback when event is prevented', () => {
            const {onClose, event} = setup();

            event.preventDefault();
            dispatchEvent(event);

            expect(onClose).not.toBeCalled();
        });
    });

    it('should restore focus after close', () => {
        const onClose = jest.fn();

        const activeElement = document.activeElement;

        const wrapper = mount(<Overlay open onClose={onClose} />);

        wrapper.setProps({open: false});

        jest.runAllTimers();

        expect(document.activeElement).toBe(activeElement);
    });

    it('should call onClosed after close', () => {
        const onClosed = jest.fn();
        const wrapper = mount(<Overlay open onClose={jest.fn()} onClosed={onClosed} />);
        wrapper.setProps({open: false});
        expect(onClosed).not.toBeCalled();
        jest.runAllTimers();
        expect(onClosed).toBeCalled();
    });

    it('should unmount after close', () => {
        const wrapper = mount(
            <Overlay open onClose={jest.fn()}>
                <div id="test" />
            </Overlay>
        );

        wrapper.setProps({open: false});
        expect(document.getElementById('test')).toBeTruthy();
        jest.runAllTimers();
        expect(document.getElementById('test')).toBeFalsy();
    });

    describe('when focus to sentinels', () => {
        beforeEach(() => {
            mount(
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
                document
                    .querySelectorAll('button')
                    .item(0)
                    .focus();
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
