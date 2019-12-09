/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/* tslint:disable no-unbound-method no-magic-numbers max-file-line-count */
import * as React from 'react';
import {act} from 'react-dom/test-utils';

import {createTestApp} from '../../../test-utils/create-test-app';

import {Tooltip} from './tooltip';
import {TooltipHandler, Props as TooltipHandlerProps} from './tooltip-handler';

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

describe('<TooltipHandler />', () => {
    const setup = (props?: Partial<TooltipHandlerProps>) =>
        app.mount(
            <TooltipHandler tooltip={<Tooltip id="tooltip" />} {...props}>
                <div id="reference" />
            </TooltipHandler>
        );

    it('should show tooltip when mouse enter on reference element', async () => {
        const wrapper = setup();
        act(() => {
            wrapper.find('#reference').simulate('mouseenter');
        });

        act(() => {
            jest.runAllTimers();
        });

        expect(document.getElementById('tooltip')).toBeTruthy();
    });

    it('should not show tooltip immediately', () => {
        const wrapper = setup();

        act(() => {
            wrapper.find('#reference').simulate('mouseenter');
        });

        expect(document.getElementById('tooltip')).toBeFalsy();

        act(() => {
            jest.runAllTimers();
        });
    });

    it('should close tooltip when mouse leave on reference element', () => {
        const wrapper = setup();

        act(() => {
            wrapper.find('#reference').simulate('mouseenter');
        });

        act(() => {
            jest.runAllTimers();
        });

        expect(document.getElementById('tooltip')).toBeTruthy();

        act(() => {
            wrapper.find('#reference').simulate('mouseleave');
        });

        act(() => {
            jest.runAllTimers();
        });

        expect(document.getElementById('tooltip')).toBeFalsy();
    });

    it('should show tooltip when focus on reference element', () => {
        const wrapper = setup();

        act(() => {
            wrapper.find('#reference').simulate('focus');
        });

        act(() => {
            jest.runAllTimers();
        });

        expect(document.getElementById('tooltip')).toBeTruthy();
    });

    it('should close tooltip when blur on reference element', () => {
        const wrapper = setup();

        act(() => {
            wrapper.find('#reference').simulate('focus');
        });

        act(() => {
            jest.runAllTimers();
        });

        act(() => {
            wrapper.find('#reference').simulate('blur');
        });

        act(() => {
            jest.runAllTimers();
        });

        expect(document.getElementById('tooltip')).toBeFalsy();
    });

    it('should close tooltip on escape window keydown event', () => {
        const wrapper = setup();

        act(() => {
            wrapper.find('#reference').simulate('focus');
        });

        act(() => {
            jest.runAllTimers();
        });

        act(() => {
            window.dispatchEvent(
                new KeyboardEvent('keydown', {
                    bubbles: true,
                    key: 'Escape'
                })
            );
        });

        act(() => {
            jest.runAllTimers();
        });

        expect(document.getElementById('tooltip')).toBeFalsy();
    });

    describe('when all listeners are disabled', () => {
        it('should not show tooltip on mouse enter', () => {
            const wrapper = setup({disableListeners: true});
            act(() => {
                wrapper.find('#reference').simulate('mouseenter');
            });
            act(() => {
                jest.runAllTimers();
            });
            expect(document.getElementById('tooltip')).toBeFalsy();
        });

        it('should not show tooltip on focus', () => {
            const wrapper = setup({disableListeners: true});
            act(() => {
                wrapper.find('#reference').simulate('focus');
            });
            act(() => {
                jest.runAllTimers();
            });
            expect(document.getElementById('tooltip')).toBeFalsy();
        });
    });

    describe('when only focus listener is disabled', () => {
        it('should show tooltip on mouse enter', () => {
            const wrapper = setup({disableFocusListener: true});
            act(() => {
                wrapper.find('#reference').simulate('mouseenter');
            });
            act(() => {
                jest.runAllTimers();
            });
            expect(document.getElementById('tooltip')).toBeTruthy();
        });

        it('should not show tooltip on focus', () => {
            const wrapper = setup({disableFocusListener: true});
            act(() => {
                wrapper.find('#reference').simulate('focus');
            });

            act(() => {
                jest.runAllTimers();
            });

            expect(document.getElementById('tooltip')).toBeFalsy();
        });
    });

    describe('when only hover listener is disabled', () => {
        it('should not show tooltip on mouse enter', () => {
            const wrapper = setup({disableHoverListener: true});
            act(() => {
                wrapper.find('#reference').simulate('mouseenter');
            });
            act(() => {
                jest.runAllTimers();
            });
            expect(document.getElementById('tooltip')).toBeFalsy();
        });

        it('should show tooltip on focus', () => {
            const wrapper = setup({disableHoverListener: true});
            act(() => {
                wrapper.find('#reference').simulate('focus');
            });
            act(() => {
                jest.runAllTimers();
            });
            expect(document.getElementById('tooltip')).toBeTruthy();
        });
    });

    it('should not update open state after open and unmount', () => {
        jest.spyOn(console, 'error');

        function Test(props: {children?: React.ReactNode}) {
            return <div id="wrapper">{props.children}</div>;
        }

        const wrapper = app.mount(
            <Test>
                <TooltipHandler tooltip={<Tooltip id="tooltip" />}>
                    <div id="reference" />
                </TooltipHandler>
            </Test>
        );

        act(() => {
            wrapper.find('#reference').simulate('mouseenter');
        });

        act(() => {
            jest.runAllTimers();
        });

        act(() => {
            wrapper.find('#reference').simulate('mouseleave');
        });

        act(() => {
            jest.runAllTimers();
        });

        act(() => {
            wrapper.find('#reference').simulate('mouseenter');
        });

        act(() => {
            jest.runAllTimers();
        });

        wrapper.setProps({
            children: null
        });

        act(() => {
            // tslint:disable-next-line: no-non-null-assertion
            window.document.getElementById('wrapper')!.dispatchEvent(
                new MouseEvent('mousemove', {
                    bubbles: true
                })
            );
        });

        expect(console.error).not.toBeCalled();
    });

    it('should show tooltip after `openDelay` timeout', async () => {
        const wrapper = setup({openDelay: 1000});

        act(() => {
            wrapper.find('#reference').simulate('mouseenter');
        });

        setTimeout(() => {
            expect(document.getElementById('tooltip')).toBeFalsy();
        }, 600);

        jest.runTimersToTime(600);

        act(() => {
            jest.runAllTimers();
        });

        expect(document.getElementById('tooltip')).toBeTruthy();
    });
});
