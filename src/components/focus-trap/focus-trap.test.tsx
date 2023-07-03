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

import {SlotProps} from '../../utils/slot-props';

import {FocusTrap, Props as FocusTrapProps} from './focus-trap';

function simulateTabKeyDown({shiftKey}: {shiftKey: boolean} = {shiftKey: false}) {
    const element =
        document.activeElement instanceof HTMLElement ? document.activeElement : document.body;

    element.dispatchEvent(
        new KeyboardEvent('keydown', {
            key: 'Tab',
            shiftKey,
            bubbles: true
        })
    );

    const focusableElements = Array.from(
        document.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]'
        )
    );

    if (!focusableElements.length) {
        return;
    }

    const currentIndex =
        element !== document.body
            ? focusableElements.indexOf(element)
            : shiftKey
            ? focusableElements.length
            : -1;

    const nextIndex = shiftKey ? currentIndex - 1 : currentIndex + 1;

    // simulate URL focus
    if (nextIndex < 0 || nextIndex > focusableElements.length - 1) {
        if (element !== document.body) {
            element.blur();
        }
    } else {
        focusableElements[nextIndex].focus();
    }
}

describe('<FocusTrap />', () => {
    const setup = (containerProps?: SlotProps<'div'>, props?: Partial<FocusTrapProps>) => {
        const screen = render(
            <React.Fragment>
                <input id="first" tabIndex={0} />
                <FocusTrap {...props}>
                    <div {...containerProps} id="trap-container">
                        <input id="trap-first" tabIndex={0} />
                        <input id="trap-last" tabIndex={0} />
                    </div>
                </FocusTrap>
                <input id="last" tabIndex={0} />
            </React.Fragment>
        );

        const firstOuterElement = document.getElementById('first')!;
        const lastOuterElement = document.getElementById('last')!;
        const trapContainer = document.getElementById('trap-container')!;
        const firstTrapElement = document.getElementById('trap-first')!;
        const lastTrapElement = document.getElementById('trap-last')!;

        return {
            firstOuterElement,
            lastOuterElement,
            trapContainer,
            firstTrapElement,
            lastTrapElement,
            screen
        };
    };

    describe('with focusable container', () => {
        describe('on tab keydown', () => {
            it('should focus container after first outer input', () => {
                const {firstOuterElement, trapContainer} = setup({tabIndex: 0});
                firstOuterElement.focus();
                simulateTabKeyDown();
                expect(document.activeElement).toBe(trapContainer);
            });

            it('should focus first trapped input after container', () => {
                const {firstTrapElement, trapContainer} = setup({tabIndex: 0});
                trapContainer.focus();
                simulateTabKeyDown();
                expect(document.activeElement).toBe(firstTrapElement);
            });

            it('should focus container after last trapped input', () => {
                const {lastTrapElement, trapContainer} = setup({tabIndex: 0});
                lastTrapElement.focus();
                simulateTabKeyDown();
                expect(document.activeElement).toBe(trapContainer);
            });
        });

        describe('on shift+tab keydown', () => {
            it('should focus container after last outer input', () => {
                const {lastOuterElement, trapContainer} = setup({tabIndex: 0});
                lastOuterElement.focus();
                simulateTabKeyDown({shiftKey: true});
                expect(document.activeElement).toBe(trapContainer);
            });

            it('should focus last trapped input after container', () => {
                const {lastTrapElement, trapContainer} = setup({tabIndex: 0});
                trapContainer.focus();
                simulateTabKeyDown({shiftKey: true});
                expect(document.activeElement).toBe(lastTrapElement);
            });

            it('should focus container after first trapped input', () => {
                const {firstTrapElement, trapContainer} = setup({tabIndex: 0});
                firstTrapElement.focus();
                simulateTabKeyDown({shiftKey: true});
                expect(document.activeElement).toBe(trapContainer);
            });
        });
    });

    describe('with non-focusable container', () => {
        describe('on tab keydown', () => {
            it('should focus first trapped input after first outer input', () => {
                const {firstOuterElement, firstTrapElement} = setup();
                firstOuterElement.focus();
                simulateTabKeyDown();
                expect(document.activeElement).toBe(firstTrapElement);
            });

            it('should focus first trapped input after last trapped input', () => {
                const {lastTrapElement, firstTrapElement} = setup();
                lastTrapElement.focus();
                simulateTabKeyDown();
                expect(document.activeElement).toBe(firstTrapElement);
            });
        });

        describe('on shift+tab keydown', () => {
            it('should focus last trapped input after last outer input', () => {
                const {lastOuterElement, lastTrapElement} = setup();
                lastOuterElement.focus();
                simulateTabKeyDown({shiftKey: true});
                expect(document.activeElement).toBe(lastTrapElement);
            });

            it('should focus last trapped input after first trapped input', () => {
                const {firstTrapElement, lastTrapElement} = setup();
                firstTrapElement.focus();
                simulateTabKeyDown({shiftKey: true});
                expect(document.activeElement).toBe(lastTrapElement);
            });
        });
    });

    describe('without focusable elements', () => {
        const setupEmptyContainer = (
            containerProps?: SlotProps<'div'>,
            props?: Partial<FocusTrapProps>
        ) => {
            const wrapper = render(
                <React.Fragment>
                    <input id="first" />
                    <FocusTrap {...props}>
                        <div {...containerProps} id="trap-container" />
                    </FocusTrap>
                    <input id="last" />
                </React.Fragment>
            );

            const firstOuterElement = document.getElementById('first')!;
            const lastOuterElement = document.getElementById('last')!;
            const trapContainer = document.getElementById('trap-container')!;

            return {
                wrapper,
                firstOuterElement,
                lastOuterElement,
                trapContainer
            };
        };

        it('and focusable container should save focus on container on tab key down', () => {
            const {trapContainer} = setupEmptyContainer({tabIndex: 0});
            trapContainer.focus();
            simulateTabKeyDown();
            expect(document.activeElement).toBe(trapContainer);
        });

        it('and focusable container should save focus on container on shift+tab key down', () => {
            const {trapContainer} = setupEmptyContainer({tabIndex: 0});
            trapContainer.focus();
            simulateTabKeyDown({shiftKey: true});
            expect(document.activeElement).toBe(trapContainer);
        });

        it('and non-focusable container should move out of trap on tab key down', () => {
            const {firstOuterElement, lastOuterElement} = setupEmptyContainer();
            firstOuterElement.focus();
            simulateTabKeyDown();
            expect(document.activeElement).toBe(lastOuterElement);
        });

        it('and non-focusable container should move out of trap on shift+tab key down', () => {
            const {firstOuterElement, lastOuterElement} = setupEmptyContainer();
            lastOuterElement.focus();
            simulateTabKeyDown({shiftKey: true});
            expect(document.activeElement).toBe(firstOuterElement);
        });
    });

    describe('when focusOnMount property is passed', () => {
        beforeEach(() => {
            const activeElement = document.createElement('button');
            activeElement.id = 'active-element';
            document.body.appendChild(activeElement);
            activeElement.focus();
        });

        afterEach(() => {
            document.getElementById('active-element')!.remove();
        });

        it('should focus children when mount', () => {
            const activeElement = document.getElementById('active-element')!;
            expect(document.activeElement).toBe(activeElement);
            const {firstTrapElement} = setup({}, {focusOnMount: true});
            expect(document.activeElement).toBe(firstTrapElement);
        });

        it('should restore focus when unmount', () => {
            const activeElement = document.getElementById('active-element')!;
            const {screen} = setup({}, {focusOnMount: true});
            screen.unmount();
            expect(document.activeElement).toBe(activeElement);
        });
    });

    describe('when focusOnMount property is not passed', () => {
        beforeEach(() => {
            const activeElement = document.createElement('button');
            activeElement.id = 'active-element';
            document.body.appendChild(activeElement);
            activeElement.focus();
        });

        afterEach(() => {
            document.getElementById('active-element')!.remove();
        });

        it('should not focus children when mount', () => {
            const activeElement = document.getElementById('active-element')!;
            expect(document.activeElement).toBe(activeElement);
            setup();
            expect(document.activeElement).toBe(activeElement);
        });

        it('should not restore focus when unmount', () => {
            const activeElement = document.getElementById('active-element')!;
            setup();
            expect(document.activeElement).toBe(activeElement);
        });
    });
});
