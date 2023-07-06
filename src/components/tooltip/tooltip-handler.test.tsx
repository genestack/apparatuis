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

import {Tooltip} from './tooltip';
import {TooltipHandler, Props as TooltipHandlerProps} from './tooltip-handler';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
});

describe('<TooltipHandler />', () => {
    const setup = (props?: Partial<TooltipHandlerProps>) =>
        render(
            <TooltipHandler tooltip={<Tooltip id="tooltip" />} {...props}>
                <div id="reference" />
            </TooltipHandler>
        );

    it('should show tooltip when mouse enter on reference element', async () => {
        setup();

        fireEvent.mouseEnter(document.getElementById('reference')!);

        act(() => jest.runAllTimers());

        await waitFor(() => expect(document.getElementById('tooltip')).toBeTruthy());
    });

    it('should not show tooltip immediately', () => {
        setup();

        fireEvent.mouseEnter(document.getElementById('reference')!);

        expect(document.getElementById('tooltip')).toBeFalsy();
    });

    it('should hide tooltip when mouse leave on reference element', () => {
        setup();

        fireEvent.mouseEnter(document.getElementById('reference')!);

        act(() => {
            jest.runAllTimers();
        });

        expect(document.getElementById('tooltip')).toBeTruthy();

        fireEvent.mouseLeave(document.getElementById('reference')!);

        act(() => {
            jest.runAllTimers();
        });

        expect(document.getElementById('tooltip')).toBeFalsy();
    });

    it('should show tooltip when focus on reference element', async () => {
        setup();

        fireEvent.focus(document.getElementById('reference')!);

        act(() => {
            jest.runAllTimers();
        });

        await waitFor(() => expect(document.getElementById('tooltip')).toBeTruthy());
    });

    it('should hide tooltip when blur on reference element', () => {
        setup();

        fireEvent.focus(document.getElementById('reference')!);

        act(() => {
            jest.runAllTimers();
        });

        fireEvent.blur(document.getElementById('reference')!);

        act(() => {
            jest.runAllTimers();
        });

        expect(document.getElementById('tooltip')).toBeFalsy();
    });

    it('should hide tooltip on escape window keydown event', () => {
        setup();

        fireEvent.focus(document.getElementById('reference')!);

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
            setup({disableListeners: true});
            fireEvent.mouseEnter(document.getElementById('reference')!);
            act(() => {
                jest.runAllTimers();
            });
            expect(document.getElementById('tooltip')).toBeFalsy();
        });

        it('should not show tooltip on focus', () => {
            setup({disableListeners: true});
            fireEvent.focus(document.getElementById('reference')!);
            act(() => {
                jest.runAllTimers();
            });
            expect(document.getElementById('tooltip')).toBeFalsy();
        });
    });

    describe('when only focus listener is disabled', () => {
        it('should show tooltip on mouse enter', async () => {
            setup({disableFocusListener: true});
            fireEvent.mouseEnter(document.getElementById('reference')!);
            act(() => jest.runAllTimers());
            await waitFor(() => expect(document.getElementById('tooltip')).toBeTruthy());
        });

        it('should not show tooltip on focus', () => {
            setup({disableFocusListener: true});
            fireEvent.focus(document.getElementById('reference')!);

            act(() => {
                jest.runAllTimers();
            });

            expect(document.getElementById('tooltip')).toBeFalsy();
        });
    });

    describe('when only hover listener is disabled', () => {
        it('should not show tooltip on mouse enter', () => {
            setup({disableHoverListener: true});
            fireEvent.mouseEnter(document.getElementById('reference')!);
            act(() => {
                jest.runAllTimers();
            });
            expect(document.getElementById('tooltip')).toBeFalsy();
        });

        it('should show tooltip on focus', async () => {
            setup({disableHoverListener: true});
            fireEvent.focus(document.getElementById('reference')!);
            act(() => {
                jest.runAllTimers();
            });
            await waitFor(() => expect(document.getElementById('tooltip')).toBeTruthy());
        });
    });

    it('should not update open state after open and unmount', () => {
        jest.spyOn(console, 'error');

        function Test(props: {children?: React.ReactNode}) {
            return <div id="wrapper">{props.children}</div>;
        }

        const screen = render(
            <Test>
                <TooltipHandler tooltip={<Tooltip id="tooltip" />}>
                    <div id="reference" />
                </TooltipHandler>
            </Test>
        );

        fireEvent.mouseEnter(document.getElementById('reference')!);

        act(() => {
            jest.runAllTimers();
        });

        fireEvent.mouseLeave(document.getElementById('reference')!);

        act(() => {
            jest.runAllTimers();
        });

        fireEvent.mouseEnter(document.getElementById('reference')!);

        act(() => {
            jest.runAllTimers();
        });

        screen.rerender(<Test></Test>);

        act(() => {
            window.document.getElementById('wrapper')!.dispatchEvent(
                new MouseEvent('mousemove', {
                    bubbles: true
                })
            );
        });

        // eslint-disable-next-line no-console
        expect(console.error).not.toHaveBeenCalled();
    });

    it('should show tooltip after `openDelay` timeout', async () => {
        setup({openDelay: 1000});

        fireEvent.mouseEnter(document.getElementById('reference')!);

        setTimeout(() => {
            expect(document.getElementById('tooltip')).toBeFalsy();
        }, 600);

        jest.advanceTimersByTime(600);

        act(() => {
            jest.runAllTimers();
        });

        await waitFor(() => expect(document.getElementById('tooltip')).toBeTruthy());
    });
});
