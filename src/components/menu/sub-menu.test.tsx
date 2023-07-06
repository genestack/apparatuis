/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {act, render, waitFor} from '@testing-library/react';
import * as React from 'react';

import {Menu} from './menu';
import {MenuItem} from './menu-item';
import {SubMenu} from './sub-menu';

jest.useFakeTimers();

describe('<SubMenu />', () => {
    const setup = (getSubMenu?: (() => React.ReactElement) | React.ReactElement) => {
        const referenceElement = document.createElement('div');
        const onClose = jest.fn();

        const subMenu = getSubMenu || (
            <SubMenu id="sub-menu">
                <MenuItem id="sub-menu-first" />
                <MenuItem id="sub-menu-middle" />
                <MenuItem id="sub-menu-last" />
            </SubMenu>
        );

        const screen = render(
            <Menu id="menu" open referenceElement={referenceElement} onClose={onClose}>
                <MenuItem id="first" />
                <MenuItem id="middle" subMenu={subMenu} />
                <MenuItem id="last" />
            </Menu>
        );

        const dispatchMouseEvent = (id: string, type: string) => {
            act(() => {
                document.getElementById(id)!.dispatchEvent(new MouseEvent(type, {bubbles: true}));
            });
        };

        const dispatchKeyDownEvent = (id: string, key: string) => {
            act(() => {
                document
                    .getElementById(id)!
                    .dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, key}));
            });
        };

        return {screen, dispatchMouseEvent, dispatchKeyDownEvent};
    };

    it('should not render sub menu items if sub menu is not open', async () => {
        setup();
        await waitFor(() => {
            expect(document.getElementById('sub-menu')).toBeFalsy();
        });
    });

    it('should open sub menu when mouse over on menu item', async () => {
        const {dispatchMouseEvent} = setup();
        dispatchMouseEvent('middle', 'mouseover');
        act(() => jest.runAllTimers());
        await waitFor(() => {
            expect(document.getElementById('sub-menu')).toBeTruthy();
        });
    });

    it('should close sub menu when mouse over on menu item', async () => {
        const {dispatchMouseEvent} = setup();
        dispatchMouseEvent('middle', 'mouseover');
        act(() => jest.runAllTimers());
        dispatchMouseEvent('middle', 'mouseout');
        act(() => jest.runAllTimers());
        await waitFor(() => {
            expect(document.getElementById('sub-menu')).toBeFalsy();
        });
    });

    it('should not close sub menu if sub menu item has mouse over in time', async () => {
        const {dispatchMouseEvent} = setup();
        dispatchMouseEvent('middle', 'mouseover');
        act(() => jest.runAllTimers());
        dispatchMouseEvent('middle', 'mouseout');
        dispatchMouseEvent('sub-menu-first', 'mouseover');
        act(() => jest.runAllTimers());
        await waitFor(() => {
            expect(document.getElementById('sub-menu')).toBeTruthy();
        });
    });

    it('should close sub menu if mouse leaves it', async () => {
        const {dispatchMouseEvent} = setup();
        dispatchMouseEvent('middle', 'mouseover');
        act(() => jest.runAllTimers());
        dispatchMouseEvent('sub-menu', 'mouseout');
        act(() => jest.runAllTimers());
        await waitFor(() => {
            expect(document.getElementById('sub-menu')).toBeFalsy();
        });
    });

    it('should open sub menu on ArrowRight keydown', async () => {
        const {dispatchMouseEvent, dispatchKeyDownEvent} = setup();
        dispatchMouseEvent('middle', 'mouseover');
        act(() => jest.runAllTimers());
        dispatchKeyDownEvent('middle', 'ArrowRight');
        await waitFor(() => {
            expect(document.getElementById('sub-menu')).toBeTruthy();
        });
    });

    it('should focus to first element in sub menu when ArrowRight keydown', async () => {
        const {dispatchMouseEvent, dispatchKeyDownEvent} = setup();
        dispatchMouseEvent('middle', 'mouseover');
        act(() => jest.runAllTimers());
        dispatchKeyDownEvent('middle', 'ArrowRight');
        await waitFor(() =>
            expect(document.activeElement).toBe(document.getElementById('sub-menu-first'))
        );
    });

    it('should close sub menu on ArrowLeft keydown when it opens', async () => {
        const {dispatchMouseEvent, dispatchKeyDownEvent} = setup();
        dispatchMouseEvent('middle', 'mouseover');
        act(() => jest.runAllTimers());
        dispatchKeyDownEvent('middle', 'ArrowRight');
        dispatchKeyDownEvent('sub-menu-first', 'ArrowLeft');
        await waitFor(() => expect(document.getElementById('sub-menu')).toBeFalsy());
    });

    it('should not call subMenu callback if sub menu closed', async () => {
        const subMenu = jest.fn(() => <SubMenu id="sub-menu" />);
        setup(subMenu);
        await waitFor(() => expect(subMenu).not.toHaveBeenCalled());
    });

    it('should call subMenu callback if sub menu opened', async () => {
        const subMenu = jest.fn(() => <SubMenu id="sub-menu-callback" />);
        const {dispatchMouseEvent} = setup(subMenu);
        dispatchMouseEvent('middle', 'mouseover');
        act(() => jest.runAllTimers());
        await waitFor(() => expect(subMenu).toHaveBeenCalledTimes(1));
    });

    it('should render element from subMenu callback if sub menu opened', async () => {
        const subMenu = jest.fn(() => <SubMenu id="sub-menu-callback" />);
        const {dispatchMouseEvent} = setup(subMenu);
        dispatchMouseEvent('middle', 'mouseover');
        act(() => jest.runAllTimers());
        await waitFor(() => expect(document.getElementById('sub-menu-callback')).toBeTruthy());
    });
});
