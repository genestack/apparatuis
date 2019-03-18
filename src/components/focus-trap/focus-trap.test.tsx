/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-unbound-method no-non-null-assertion max-file-line-count no-magic-numbers
import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';

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

function createTestApp() {
    let appElement: HTMLElement | undefined;
    let wrapper: ReactWrapper<any, any> | null = null;

    const mountToBody = <P, S = any>(node: React.ReactElement<P>): ReactWrapper<P, S> => {
        wrapper = mount(node, {attachTo: appElement});

        return wrapper;
    };

    return {
        beforeEach: () => {
            appElement = document.createElement('div');
            document.body.appendChild(appElement);
        },

        afterEach: () => {
            if (wrapper) {
                wrapper.detach();
            }

            if (appElement) {
                appElement.remove();
            }
        },

        mount: mountToBody,
        unmount: () => {
            if (wrapper) {
                wrapper.detach();
            }
        }
    };
}

describe('<FocusTrap />', () => {
    const app = createTestApp();

    beforeEach(app.beforeEach);
    afterEach(app.afterEach);

    const setup = (
        containerProps?: React.HTMLAttributes<HTMLDivElement>,
        props?: Partial<FocusTrapProps>
    ) => {
        const wrapper = app.mount(
            <React.Fragment>
                <input id="first" />
                <FocusTrap {...props}>
                    <div {...containerProps} id="trap-container">
                        <input id="trap-first" />
                        <input id="trap-last" />
                    </div>
                </FocusTrap>
                <input id="last" />
            </React.Fragment>
        );

        const firstOuterElement = document.getElementById('first')!;
        const lastOuterElement = document.getElementById('last')!;
        const trapContainer = document.getElementById('trap-container')!;
        const firstTrapElement = document.getElementById('trap-first')!;
        const lastTrapElement = document.getElementById('trap-last')!;

        return {
            wrapper,
            firstOuterElement,
            lastOuterElement,
            trapContainer,
            firstTrapElement,
            lastTrapElement
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
            containerProps?: React.HTMLAttributes<HTMLDivElement>,
            props?: Partial<FocusTrapProps>
        ) => {
            const wrapper = app.mount(
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
            setup({}, {focusOnMount: true});
            app.unmount();
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
            app.unmount();
            expect(document.activeElement).toBe(activeElement);
        });
    });
});
