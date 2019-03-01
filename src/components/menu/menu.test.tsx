/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-unbound-method no-non-null-assertion max-file-line-count
// tslint:disable no-unnecessary-type-assertion
import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';

import {FocusTrap} from '../focus-trap';

import {Menu} from './menu';
import {MenuItem} from './menu-item';
import {SubMenu} from './sub-menu';

jest.useFakeTimers();

function createTestApp() {
    let appElement: HTMLElement | undefined;
    let wrapper: ReactWrapper<any, any> | null = null;

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

        mount: <P, S = any>(node: React.ReactElement<P>): ReactWrapper<P, S> => {
            wrapper = mount(node, {attachTo: appElement});

            return wrapper;
        }
    };
}

describe('<Menu />', () => {
    const app = createTestApp();
    beforeEach(app.beforeEach);
    afterEach(app.afterEach);

    it('should render <FocusTrap />', () => {
        const onClose = jest.fn();
        const referenceElement = document.createElement('button');
        referenceElement.focus();
        const wrapper = app.mount(
            <Menu open onClose={onClose} referenceElement={referenceElement} />
        );
        expect(wrapper.find(FocusTrap).exists()).toBe(true);
    });

    it('should focus to menu element on mount', () => {
        const onClose = jest.fn();
        const referenceElement = document.createElement('button');
        referenceElement.focus();
        app.mount(
            <Menu
                popoverProps={{id: 'test'}}
                open
                onClose={onClose}
                referenceElement={referenceElement}
            />
        );
        expect(document.activeElement).toBe(document.getElementById('test'));
    });

    it('should focus to menu element on open', () => {
        const onClose = jest.fn();
        const referenceElement = document.createElement('button');
        referenceElement.focus();
        const wrapper = app.mount(
            <Menu
                popoverProps={{id: 'test'}}
                open={false}
                onClose={onClose}
                referenceElement={referenceElement}
            />
        );

        expect(document.activeElement).toBe(referenceElement);
        wrapper.setProps({open: true});
        expect(document.activeElement).toBe(document.getElementById('test'));
    });

    it('should change focus on arrow up or down key press', () => {
        const onClose = jest.fn();
        const referenceElement = document.createElement('div');
        app.mount(
            <Menu id="test" open onClose={onClose} referenceElement={referenceElement}>
                <MenuItem id="first" />
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

        document.activeElement!.dispatchEvent(down);
        expect(document.activeElement).toBe(document.getElementById('first'));
        document.activeElement!.dispatchEvent(down);
        expect(document.activeElement).toBe(document.getElementById('second'));
        document.activeElement!.dispatchEvent(down);
        expect(document.activeElement).toBe(document.getElementById('second'));
        document.activeElement!.dispatchEvent(up);
        expect(document.activeElement).toBe(document.getElementById('first'));
        document.activeElement!.dispatchEvent(up);
        expect(document.activeElement).toBe(document.getElementById('first'));
    });

    it('should change focus on mouse move over menu item', () => {
        const onClose = jest.fn();
        const referenceElement = document.createElement('div');
        app.mount(
            <Menu id="test" open onClose={onClose} referenceElement={referenceElement}>
                <MenuItem id="first" />
                <MenuItem id="second" />
            </Menu>
        );

        const mouseMoveEvent = new MouseEvent('mousemove', {
            bubbles: true
        });

        document.getElementById('second')!.dispatchEvent(mouseMoveEvent);
        expect(document.activeElement).toBe(document.getElementById('second'));
    });
});

describe('<SubMenu />', () => {
    const app = createTestApp();
    beforeEach(app.beforeEach);
    afterEach(app.afterEach);

    const setup = (subMenu?: (() => JSX.Element) | JSX.Element) => {
        const referenceElement = document.createElement('div');
        const onClose = jest.fn();

        subMenu = subMenu || (
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

    it('should open sub menu when hover on menu item', () => {
        const {dispatchMouseEvent} = setup();
        dispatchMouseEvent('middle', 'mousemove');
        jest.runAllTimers();
        expect(document.getElementById('sub-menu')).toBeTruthy();
    });

    it('should close sub menu when hover on menu item', () => {
        const {dispatchMouseEvent} = setup();
        dispatchMouseEvent('middle', 'mousemove');
        jest.runAllTimers();
        dispatchMouseEvent('middle', 'mouseout');
        jest.runAllTimers();
        expect(document.getElementById('sub-menu')).toBeFalsy();
    });

    it('should not close sub menu if sub menu item has hovered in time', () => {
        const {dispatchMouseEvent} = setup();
        dispatchMouseEvent('middle', 'mousemove');
        jest.runAllTimers();
        dispatchMouseEvent('middle', 'mouseout');
        dispatchMouseEvent('sub-menu-first', 'mousemove');
        jest.runAllTimers();
        expect(document.getElementById('sub-menu')).toBeTruthy();
    });

    it('should open sub menu on ArrowRight keydown', () => {
        const {dispatchMouseEvent, dispatchKeyDownEvent} = setup();
        dispatchMouseEvent('middle', 'mousemove');
        jest.runAllTimers();
        dispatchKeyDownEvent('middle', 'ArrowRight');
        jest.runAllTimers();
        expect(document.getElementById('sub-menu')).toBeTruthy();
    });

    it('should focus to first element in sub menu when ArrowRight keydown', () => {
        const {dispatchMouseEvent, dispatchKeyDownEvent} = setup();
        dispatchMouseEvent('middle', 'mousemove');
        jest.runAllTimers();
        dispatchKeyDownEvent('middle', 'ArrowRight');
        jest.runAllTimers();
        expect(document.activeElement).toBe(document.getElementById('sub-menu-first'));
    });

    it('should close sub menu on ArrowLeft keydown when it opens', () => {
        const {dispatchMouseEvent, dispatchKeyDownEvent} = setup();
        dispatchMouseEvent('middle', 'mousemove');
        jest.runAllTimers();
        dispatchKeyDownEvent('middle', 'ArrowRight');
        jest.runAllTimers();
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
        dispatchMouseEvent('middle', 'mousemove');
        jest.runAllTimers();
        expect(subMenu).toHaveBeenCalledTimes(1);
    });

    it('should render element from subMenu callback if sub menu opened', () => {
        const subMenu = jest.fn(() => <SubMenu id="sub-menu-callback" />);
        const {dispatchMouseEvent} = setup(subMenu);
        dispatchMouseEvent('middle', 'mousemove');
        jest.runAllTimers();
        expect(document.getElementById('sub-menu-callback')).toBeTruthy();
    });
});
