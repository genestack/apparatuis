/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-unbound-method no-non-null-assertion
// tslint:disable no-unnecessary-type-assertion
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';
import {FocusTrap} from '../focus-trap';

import {Menu} from './menu';
import {MenuCaption} from './menu-caption';
import {MenuItem} from './menu-item';

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

    it('should focus item on window mousemove in keyboard mode', () => {
        const referenceElement = document.createElement('div');

        app.mount(
            <Menu id="test" open referenceElement={referenceElement}>
                <MenuItem id="first" />
                <MenuItem id="second" />
            </Menu>
        );

        const down = new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            bubbles: true
        });

        document.getElementById('first')!.focus();
        document.activeElement!.dispatchEvent(down);
        document.getElementById('first')!.dispatchEvent(
            new MouseEvent('mousemove', {
                bubbles: true
            })
        );
        expect(document.activeElement).toBe(document.getElementById('first'));
    });

    it('should change focus on mouse over menu item', () => {
        const referenceElement = document.createElement('div');
        app.mount(
            <Menu id="test" open referenceElement={referenceElement}>
                <MenuItem id="first" />
                <MenuItem id="second" />
            </Menu>
        );

        const mouseMoveEvent = new MouseEvent('mouseover', {
            bubbles: true
        });

        document.getElementById('second')!.dispatchEvent(mouseMoveEvent);
        expect(document.activeElement).toBe(document.getElementById('second'));
    });

    describe('onValueSelect method', () => {
        const setup = () => {
            const referenceElement = document.createElement('div');
            const onValueSelect = jest.fn();
            const wrapper = app.mount(
                <Menu open referenceElement={referenceElement} onValueSelect={onValueSelect}>
                    <MenuItem id="first" value="first">
                        First
                    </MenuItem>
                </Menu>
            );

            return {onValueSelect, wrapper};
        };

        it('should be called once on item click', () => {
            const {onValueSelect, wrapper} = setup();

            wrapper
                .find('#first')
                .hostNodes()
                .simulate('click');

            expect(onValueSelect).toHaveBeenCalledTimes(1);
        });

        it('should called with valid value on item click', () => {
            const {onValueSelect, wrapper} = setup();

            wrapper
                .find('#first')
                .hostNodes()
                .simulate('click');

            expect(onValueSelect).toHaveBeenCalledWith(
                'first',
                expect.anything(),
                expect.anything()
            );
        });
    });

    it('MenuItem should render anchor element if href property is passed', () => {
        app.mount(<MenuItem id="test" href="foo" />);
        expect(document.getElementById('test')).toBeInstanceOf(HTMLAnchorElement);
        expect(document.getElementById('test')).toHaveProperty('href', 'http://localhost/foo');
    });

    describe('keepMounted', () => {
        it("shouldn't render children", () => {
            const onClose = jest.fn();
            const referenceElement = document.createElement('div');

            const wrapper = app.mount(
                <Menu
                    open={false}
                    keepMounted={false}
                    onClose={onClose}
                    referenceElement={referenceElement}
                >
                    <MenuItem />
                </Menu>
            );

            expect(wrapper.find(MenuItem).length).toBe(0);
        });

        it('should render children', () => {
            const onClose = jest.fn();
            const referenceElement = document.createElement('div');

            const wrapper = app.mount(
                <Menu
                    open={false}
                    keepMounted
                    onClose={onClose}
                    referenceElement={referenceElement}
                >
                    <MenuItem />
                </Menu>
            );

            expect(wrapper.find(MenuItem).length).toBe(1);
        });
    });
});
