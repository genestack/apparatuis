/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {Menu} from './menu';
import {MenuHandler} from './menu-handler';
import {MenuItem} from './menu-item';
import {SubMenu} from './sub-menu';

jest.useFakeTimers();

const app = createTestApp();
beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<MenuHandler />', () => {
    const setup = () => {
        const subMenu = () => <SubMenu />;

        return app.mount(
            <MenuHandler
                menu={
                    <Menu id="menu">
                        <MenuItem id="item" />
                        <MenuItem id="with-sub-menu" subMenu={subMenu} />
                    </Menu>
                }
            >
                <button id="button" />
            </MenuHandler>
        );
    };

    it('should not show menu at mount', () => {
        setup();
        expect(document.getElementById('menu')).toBeFalsy();
    });

    it('should open menu on child click', () => {
        const wrapper = setup();
        wrapper.find('#button').simulate('click');
        expect(document.getElementById('menu')).toBeTruthy();
    });

    it('should close menu on menu item without sub menu', () => {
        const wrapper = setup();
        wrapper.find('#button').simulate('click');
        wrapper
            .find('#item')
            .hostNodes()
            .simulate('click');

        expect(document.getElementById('menu')).toBeTruthy();

        jest.runAllTimers();

        expect(document.getElementById('menu')).toBeFalsy();
    });

    it('should expose open method', () => {
        expect(setup().instance()).toHaveProperty('open', expect.any(Function));
    });

    it('should expose close method', () => {
        expect(setup().instance()).toHaveProperty('close', expect.any(Function));
    });

    it('should open menu on ArrowDown keypress', () => {
        const wrapper = setup();
        wrapper.find('#button').simulate('keydown', {key: 'ArrowDown'});
        expect(document.getElementById('menu')).toBeTruthy();
    });
});