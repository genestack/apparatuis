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

import {FocusTrap} from './focus-trap';

function simulateTabKeyDown({shiftKey}: {shiftKey: boolean} = {shiftKey: false}) {
    const element = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    if (element) {
        element.dispatchEvent(
            new KeyboardEvent('keydown', {
                key: 'Tab',
                shiftKey,
                bubbles: true
            })
        );
    }

    const focusableElements = Array.from(
        document.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]'
        )
    );

    if (!focusableElements.length) {
        return;
    }

    const currentIndex = element ? focusableElements.indexOf(element) : 0;

    let nextIndex = shiftKey ? currentIndex - 1 : currentIndex + 1;

    if (nextIndex === -1) {
        nextIndex = focusableElements.length - 1;
    }

    if (nextIndex === focusableElements.length) {
        nextIndex = 0;
    }

    focusableElements[nextIndex].focus();
}

function createTestApp() {
    let appElement: HTMLElement | undefined;
    let wrapper: ReactWrapper<any, any> | null = null;
    let activeElement: HTMLElement | null = null;

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

        createActiveElement: () => {
            if (activeElement) {
                activeElement.remove();
            }

            activeElement = document.createElement('input');
            activeElement.id = 'active';
            document.body.appendChild(activeElement);
            activeElement.focus();

            return activeElement;
        }
    };
}

describe('<FocusTrap />', () => {
    const app = createTestApp();

    beforeEach(app.beforeEach);
    afterEach(app.afterEach);

    describe('by default', () => {
        it('should not change active element on mount', () => {
            const activeElement = app.createActiveElement();

            app.mount(
                <FocusTrap>
                    <div id="trap">
                        <input id="trapped" />
                    </div>
                </FocusTrap>
            );

            expect(document.activeElement).toBe(activeElement);
        });

        it('should focus on trapped element with tab key', () => {
            app.createActiveElement();

            app.mount(
                <FocusTrap>
                    <div id="trap">
                        <input id="trapped" />
                    </div>
                </FocusTrap>
            );

            simulateTabKeyDown();

            expect(document.activeElement).toBe(document.getElementById('trapped'));
        });

        it('should leave focus on trapped element with tab key when already trapped', () => {
            app.createActiveElement();

            app.mount(
                <FocusTrap>
                    <div id="trap">
                        <input id="trapped" />
                    </div>
                </FocusTrap>
            );

            simulateTabKeyDown();
            simulateTabKeyDown();

            expect(document.activeElement).toBe(document.getElementById('trapped'));
        });

        it('should loop focus trap', () => {
            app.createActiveElement();

            app.mount(
                <FocusTrap>
                    <div id="trap">
                        <input id="trapped" />
                        <input id="second-trapped" />
                    </div>
                </FocusTrap>
            );

            simulateTabKeyDown();
            expect(document.activeElement).toBe(document.getElementById('trapped'));
            simulateTabKeyDown();
            expect(document.activeElement).toBe(document.getElementById('second-trapped'));
            simulateTabKeyDown();
            expect(document.activeElement).toBe(document.getElementById('trapped'));
        });

        it('should loop focus trap with Shift key', () => {
            app.createActiveElement();

            app.mount(
                <FocusTrap>
                    <div id="trap">
                        <input id="trapped" />
                        <input id="second-trapped" />
                    </div>
                </FocusTrap>
            );

            simulateTabKeyDown({shiftKey: true});
            expect(document.activeElement).toBe(document.getElementById('second-trapped'));
            simulateTabKeyDown({shiftKey: true});
            expect(document.activeElement).toBe(document.getElementById('trapped'));
            simulateTabKeyDown({shiftKey: true});
            expect(document.activeElement).toBe(document.getElementById('second-trapped'));
        });

        it('should focus on container when there are no focusable elements', () => {
            app.createActiveElement();

            app.mount(
                <FocusTrap>
                    <div id="trap">
                        <b>Hi bro!</b>
                    </div>
                </FocusTrap>
            );

            simulateTabKeyDown();
            expect(document.activeElement).toBe(document.getElementById('trap'));
            simulateTabKeyDown();
            expect(document.activeElement).toBe(document.getElementById('trap'));
        });
    });

    describe('with enableSelfFocus property', () => {
        it('should focus on trap element with tab key', () => {
            app.createActiveElement();

            app.mount(
                <FocusTrap enableSelfFocus>
                    <div id="trap">
                        <input id="trapped" />
                    </div>
                </FocusTrap>
            );

            simulateTabKeyDown();

            expect(document.activeElement).toBe(document.getElementById('trap'));
        });

        it('should loop focus trap', () => {
            app.createActiveElement();

            app.mount(
                <FocusTrap enableSelfFocus>
                    <div id="trap">
                        <input id="trapped" />
                        <input id="second-trapped" />
                    </div>
                </FocusTrap>
            );

            simulateTabKeyDown();
            expect(document.activeElement).toBe(document.getElementById('trap'));
            simulateTabKeyDown();
            expect(document.activeElement).toBe(document.getElementById('trapped'));
            simulateTabKeyDown();
            expect(document.activeElement).toBe(document.getElementById('second-trapped'));
            simulateTabKeyDown();
            expect(document.activeElement).toBe(document.getElementById('trap'));
        });

        it('should loop focus trap with Shift key', () => {
            app.createActiveElement();

            app.mount(
                <FocusTrap enableSelfFocus>
                    <div id="trap">
                        <input id="trapped" />
                        <input id="second-trapped" />
                    </div>
                </FocusTrap>
            );

            simulateTabKeyDown({shiftKey: true});
            expect(document.activeElement).toBe(document.getElementById('trap'));
            simulateTabKeyDown({shiftKey: true});
            expect(document.activeElement).toBe(document.getElementById('second-trapped'));
            simulateTabKeyDown({shiftKey: true});
            expect(document.activeElement).toBe(document.getElementById('trapped'));
            simulateTabKeyDown({shiftKey: true});
            expect(document.activeElement).toBe(document.getElementById('trap'));
        });
    });

    describe('with focusOnMount property', () => {
        it('should call focus element on mount', () => {
            app.createActiveElement();

            app.mount(
                <FocusTrap focusOnMount>
                    <div id="trap">
                        <input id="trapped" />
                    </div>
                </FocusTrap>
            );

            expect(document.activeElement).toBe(document.getElementById('trapped'));
        });
    });

    describe('should call original onFocus callbacks', () => {
        it('for trap container', () => {
            app.createActiveElement();

            const onFocus = jest.fn();
            app.mount(
                <FocusTrap>
                    <div id="trap" onFocus={onFocus} />
                </FocusTrap>
            );

            simulateTabKeyDown();

            expect(onFocus).toHaveBeenCalled();
        });

        it('for start sentinel', () => {
            app.createActiveElement();

            const onFocus = jest.fn();
            app.mount(
                <FocusTrap startSentinelProps={{onFocus}}>
                    <div id="trap" />
                </FocusTrap>
            );

            simulateTabKeyDown();

            expect(onFocus).toHaveBeenCalled();
        });

        it('for end sentinel', () => {
            app.createActiveElement();

            const onFocus = jest.fn();
            app.mount(
                <FocusTrap endSentinelProps={{onFocus}}>
                    <div id="trap" />
                </FocusTrap>
            );

            simulateTabKeyDown({shiftKey: true});

            expect(onFocus).toHaveBeenCalled();
        });
    });

    it('should respect an original tabIndex prop', () => {
        app.createActiveElement();

        app.mount(
            <FocusTrap>
                <div id="trap" tabIndex={10} />
            </FocusTrap>
        );

        expect(document.getElementById('trap')!.getAttribute('tabIndex')).toBe('10');
    });
});
