/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-non-null-assertion
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {Menu} from './menu';
import {MenuItem} from './menu-item';
import {SubMenu} from './sub-menu';

jest.useFakeTimers();

describe('<SubMenu />', () => {
    const app = createTestApp();
    beforeEach(app.beforeEach);
    afterEach(app.afterEach);

    const setup = (getSubMenu?: (() => JSX.Element) | JSX.Element) => {
        const referenceElement = document.createElement('div');
        const onClose = jest.fn();

        const subMenu = getSubMenu || (
            <SubMenu id="sub-menu">
                <MenuItem id="sub-menu-first" />
                <MenuItem id="sub-menu-middle" />
                <MenuItem id="sub-menu-last" />
            </SubMenu>
        );

        const wrapper = app.mount(
            <Menu id="menu" open referenceElement={referenceElement} onClose={onClose}>
                <MenuItem id="first" />
                <MenuItem id="middle" subMenu={subMenu} />
                <MenuItem id="last" />
            </Menu>
        );

        const dispatchMouseEvent = (id: string, type: string) => {
            document.getElementById(id)!.dispatchEvent(new MouseEvent(type, {bubbles: true}));
        };

        const dispatchKeyDownEvent = (id: string, key: string) => {
            document
                .getElementById(id)!
                .dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, key}));
        };

        return {wrapper, dispatchMouseEvent, dispatchKeyDownEvent};
    };

    it('should not render sub menu items if sub menu is not open', () => {
        setup();
        expect(document.getElementById('sub-menu')).toBeFalsy();
    });

    it('should open sub menu when mouse over on menu item', () => {
        const {dispatchMouseEvent} = setup();
        dispatchMouseEvent('middle', 'mouseover');
        jest.runAllTimers();
        expect(document.getElementById('sub-menu')).toBeTruthy();
    });

    it('should close sub menu when mouse over on menu item', () => {
        const {dispatchMouseEvent} = setup();
        dispatchMouseEvent('middle', 'mouseover');
        jest.runAllTimers();
        dispatchMouseEvent('middle', 'mouseout');
        jest.runAllTimers();
        expect(document.getElementById('sub-menu')).toBeFalsy();
    });

    it('should not close sub menu if sub menu item has mouse over in time', () => {
        const {dispatchMouseEvent} = setup();
        dispatchMouseEvent('middle', 'mouseover');
        jest.runAllTimers();
        dispatchMouseEvent('middle', 'mouseout');
        dispatchMouseEvent('sub-menu-first', 'mouseover');
        jest.runAllTimers();
        expect(document.getElementById('sub-menu')).toBeTruthy();
    });

    it('should close sub menu if mouse leaves it', () => {
        const {dispatchMouseEvent} = setup();
        dispatchMouseEvent('middle', 'mouseover');
        jest.runAllTimers();
        dispatchMouseEvent('sub-menu', 'mouseout');
        jest.runAllTimers();
        expect(document.getElementById('sub-menu')).toBeFalsy();
    });

    it('should open sub menu on ArrowRight keydown', () => {
        const {dispatchMouseEvent, dispatchKeyDownEvent} = setup();
        dispatchMouseEvent('middle', 'mouseover');
        jest.runAllTimers();
        dispatchKeyDownEvent('middle', 'ArrowRight');
        expect(document.getElementById('sub-menu')).toBeTruthy();
    });

    it('should focus to first element in sub menu when ArrowRight keydown', () => {
        const {dispatchMouseEvent, dispatchKeyDownEvent} = setup();
        dispatchMouseEvent('middle', 'mouseover');
        jest.runAllTimers();
        dispatchKeyDownEvent('middle', 'ArrowRight');
        expect(document.activeElement).toBe(document.getElementById('sub-menu-first'));
    });

    it('should close sub menu on ArrowLeft keydown when it opens', () => {
        const {dispatchMouseEvent, dispatchKeyDownEvent} = setup();
        dispatchMouseEvent('middle', 'mouseover');
        jest.runAllTimers();
        dispatchKeyDownEvent('middle', 'ArrowRight');
        dispatchKeyDownEvent('sub-menu-first', 'ArrowLeft');
        expect(document.getElementById('sub-menu')).toBeFalsy();
    });

    it('should not call subMenu callback if sub menu closed', () => {
        const subMenu = jest.fn(() => <SubMenu id="sub-menu" />);
        setup(subMenu);
        expect(subMenu).not.toBeCalled();
    });

    it('should call subMenu callback if sub menu opened', () => {
        const subMenu = jest.fn(() => <SubMenu id="sub-menu-callback" />);
        const {dispatchMouseEvent} = setup(subMenu);
        dispatchMouseEvent('middle', 'mouseover');
        jest.runAllTimers();
        expect(subMenu).toHaveBeenCalledTimes(1);
    });

    it('should render element from subMenu callback if sub menu opened', () => {
        const subMenu = jest.fn(() => <SubMenu id="sub-menu-callback" />);
        const {dispatchMouseEvent} = setup(subMenu);
        dispatchMouseEvent('middle', 'mouseover');
        jest.runAllTimers();
        expect(document.getElementById('sub-menu-callback')).toBeTruthy();
    });
});
