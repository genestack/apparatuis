/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {fireEvent, render} from '@testing-library/react';
import * as React from 'react';

import {Menu} from './menu';
import {MenuHandler, Props as MenuHandlerProps, MenuHandlerApi} from './menu-handler';
import {MenuItem} from './menu-item';
import {SubMenu} from './sub-menu';

jest.useFakeTimers();

describe('<MenuHandler />', () => {
    const setup = (props?: Partial<MenuHandlerProps>) => {
        const subMenu = () => <SubMenu />;
        const ref = React.createRef<MenuHandlerApi>();

        const screen = render(
            // https://git.io/JecSk
            <React.Fragment>
                <MenuHandler
                    ref={ref}
                    menu={
                        <Menu id="menu">
                            <MenuItem id="item" />
                            <MenuItem id="with-sub-menu" subMenu={subMenu} />
                        </Menu>
                    }
                    {...props}
                >
                    <button id="button" />
                </MenuHandler>
            </React.Fragment>
        );

        return {screen, ref};
    };

    it('should not show menu at mount', () => {
        setup();
        expect(document.getElementById('menu')).toBeFalsy();
    });

    it('should open menu on child click', () => {
        setup();
        fireEvent.click(document.getElementById('button')!);
        expect(document.getElementById('menu')).toBeTruthy();
    });

    it('should open menu on child click', () => {
        setup({disableListeners: true});
        fireEvent.click(document.getElementById('button')!);
        expect(document.getElementById('menu')).toBeFalsy();
    });

    it('should close menu on menu item without sub menu', () => {
        setup();
        fireEvent.click(document.getElementById('button')!);
        fireEvent.click(document.getElementById('item')!);

        expect(document.getElementById('menu')).toBeTruthy();

        jest.runAllTimers();

        expect(document.getElementById('menu')).toBeFalsy();
    });

    it('should expose open method', () => {
        expect(setup().ref.current).toHaveProperty('open', expect.any(Function));
    });

    it('should expose close method', () => {
        expect(setup().ref.current).toHaveProperty('close', expect.any(Function));
    });

    it('should open menu on ArrowDown keypress', () => {
        setup();
        fireEvent.keyDown(document.getElementById('button')!, {key: 'ArrowDown'});
        expect(document.getElementById('menu')).toBeTruthy();
    });

    it('should not open menu on ArrowDown keypress if `disabledListeners` is passed', () => {
        setup({disableListeners: true});
        fireEvent.keyDown(document.getElementById('button')!, {key: 'ArrowDown'});
        expect(document.getElementById('menu')).toBeFalsy();
    });
});
