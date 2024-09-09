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

import {Menu} from './menu';
import {MenuCaption} from './menu-caption';
import {MenuItem} from './menu-item';

describe('<Menu />', () => {
    it('should focus to menu element on mount', async () => {
        const onClose = jest.fn();
        const referenceElement = document.createElement('button');
        referenceElement.focus();
        render(
            <Menu
                popoverProps={{id: 'test'}}
                open
                onClose={onClose}
                referenceElement={referenceElement}
            />
        );
        await waitFor(() => {
            expect(document.activeElement).toBe(document.getElementById('test'));
        });
    });

    it('should focus to menu element on open', async () => {
        const onClose = jest.fn();
        const referenceElement = document.createElement('button');

        const screen = render(
            <Menu
                popoverProps={{id: 'test'}}
                open={false}
                onClose={onClose}
                referenceElement={referenceElement}
            />
        );

        screen.rerender(
            <Menu
                popoverProps={{id: 'test'}}
                open={true}
                onClose={onClose}
                referenceElement={referenceElement}
            />
        );

        await waitFor(() => {
            expect(document.activeElement).toBe(document.getElementById('test'));
        });
    });

    it('should change focus on arrow up or down key press', async () => {
        const onClose = jest.fn();
        const referenceElement = document.createElement('div');
        render(
            <Menu id="test" open onClose={onClose} referenceElement={referenceElement}>
                <MenuItem id="first" />
                <MenuCaption />
                <MenuItem id="second" />
            </Menu>
        );

        const down = new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            bubbles: true
        });

        const up = new KeyboardEvent('keydown', {
            key: 'ArrowUp',
            bubbles: true
        });

        act(() => {
            document.activeElement!.dispatchEvent(down);
        });
        await waitFor(() => {
            expect(document.activeElement).toBe(document.getElementById('first'));
        });
        act(() => {
            document.activeElement!.dispatchEvent(down);
        });
        await waitFor(() => {
            expect(document.activeElement).toBe(document.getElementById('second'));
        });
        act(() => {
            document.activeElement!.dispatchEvent(down);
        });
        await waitFor(() => {
            expect(document.activeElement).toBe(document.getElementById('second'));
        });
        act(() => {
            document.activeElement!.dispatchEvent(up);
        });
        await waitFor(() => {
            expect(document.activeElement).toBe(document.getElementById('first'));
        });
        act(() => {
            document.activeElement!.dispatchEvent(up);
        });
        await waitFor(() => {
            expect(document.activeElement).toBe(document.getElementById('first'));
        });
    });

    it('should focus item on window mousemove in keyboard mode', async () => {
        const referenceElement = document.createElement('div');

        render(
            <Menu id="test" open referenceElement={referenceElement}>
                <MenuItem id="first" />
                <MenuItem id="second" />
            </Menu>
        );

        const down = new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            bubbles: true
        });

        act(() => {
            document.getElementById('first')!.focus();
            document.activeElement!.dispatchEvent(down);
        });

        act(() => {
            document.getElementById('first')!.dispatchEvent(
                new MouseEvent('mousemove', {
                    bubbles: true
                })
            );
        });

        await waitFor(() => {
            expect(document.activeElement).toBe(document.getElementById('first'));
        });
    });

    it('should change focus on mouse over menu item', async () => {
        const referenceElement = document.createElement('div');
        render(
            <Menu id="test" open referenceElement={referenceElement}>
                <MenuItem id="first" />
                <MenuItem id="second" />
            </Menu>
        );

        const mouseMoveEvent = new MouseEvent('mouseover', {
            bubbles: true
        });

        act(() => {
            document.getElementById('second')!.dispatchEvent(mouseMoveEvent);
        });
        await waitFor(() => {
            expect(document.activeElement).toBe(document.getElementById('second'));
        });
    });

    describe('onValueSelect method', () => {
        const setup = () => {
            const referenceElement = document.createElement('div');
            const onValueSelect = jest.fn();
            const screen = render(
                <Menu open referenceElement={referenceElement} onValueSelect={onValueSelect}>
                    <MenuItem id="first" value="first">
                        First
                    </MenuItem>
                </Menu>
            );

            return {onValueSelect, screen};
        };

        it('should be called once on item click', async () => {
            const {onValueSelect} = setup();

            fireEvent.click(document.getElementById('first')!);

            await waitFor(() => {
                expect(onValueSelect).toHaveBeenCalledTimes(1);
            });
        });

        it('should called with valid value on item click', async () => {
            const {onValueSelect} = setup();

            fireEvent.click(document.getElementById('first')!);

            await waitFor(() => {
                expect(onValueSelect).toHaveBeenCalledWith('first', {
                    value: 'first',
                    hasSubMenu: false
                });
            });
        });
    });

    it('MenuItem should render anchor element if href property is passed', () => {
        render(<MenuItem id="test" href="foo" />);
        expect(document.getElementById('test')).toBeInstanceOf(HTMLAnchorElement);
        expect(document.getElementById('test')).toHaveProperty('href', 'http://localhost/foo');
    });

    describe('keepMounted', () => {
        it("shouldn't render children", () => {
            const onClose = jest.fn();
            const referenceElement = document.createElement('div');

            const screen = render(
                <Menu
                    open={false}
                    keepMounted={false}
                    onClose={onClose}
                    referenceElement={referenceElement}
                >
                    <MenuItem data-testid="test" />
                </Menu>
            );

            expect(screen.queryByTestId('test')).toBeFalsy();
        });

        it('should render children', async () => {
            const onClose = jest.fn();
            const referenceElement = document.createElement('div');

            const screen = render(
                <Menu
                    open={false}
                    keepMounted
                    onClose={onClose}
                    referenceElement={referenceElement}
                >
                    <MenuItem data-testid="test" />
                </Menu>
            );

            await waitFor(() => {
                expect(screen.queryByTestId('test')).toBeTruthy();
            });
        });
    });
});
