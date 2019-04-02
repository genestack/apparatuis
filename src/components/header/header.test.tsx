/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable: no-non-null-assertion
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';
import {Typography} from '../typography';

import {Header, Props as HeaderProps} from './header';
import {HeaderButton} from './header-button';
import {HeaderItem} from './header-item';
import {HeaderItemCell} from './header-item-cell';
import {HeaderItemText} from './header-item-text';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

const setup = (props?: Partial<HeaderProps>) =>
    app.mount(
        <Header {...props}>
            <HeaderItem>
                <HeaderItemCell />
                <HeaderItemText />
            </HeaderItem>
            <HeaderButton id="button" />
            <HeaderButton id="button-2" />
        </Header>
    );

describe('<Header />', () => {
    it('should render additional div when disablePositionFixed is missed', () => {
        setup({disablePositionFixed: true, staticSpacerProps: {id: 'spacer'}});
        expect(document.getElementById('spacer')).toBeFalsy();
    });

    it('should render additional div when header has fixed position', () => {
        setup({staticSpacerProps: {id: 'spacer'}});
        expect(document.getElementById('spacer')).toBeTruthy();
    });
});

describe('<HeaderButton />', () => {
    it('should render a button', () => {
        setup();
        expect(document.getElementById('button')!.tagName).toBe('BUTTON');
    });

    it('should focus to the next button on ArrowRight keydown', () => {
        const wrapper = setup();
        const button = document.getElementById('button')!;
        button.focus();
        wrapper
            .find('#button')
            .hostNodes()
            .simulate('keydown', {key: 'ArrowRight'});
        expect(document.getElementById('button-2')).toBe(document.activeElement);
    });

    it('should not change focus if there are no focusable elements after active element', () => {
        const wrapper = setup();
        const button = document.getElementById('button-2')!;
        button.focus();
        wrapper
            .find('#button-2')
            .hostNodes()
            .simulate('keydown', {key: 'ArrowRight'});
        expect(document.getElementById('button-2')).toBe(document.activeElement);
    });

    it('should focus to the previous button on ArrowLeft keydown', () => {
        const wrapper = setup();
        const button = document.getElementById('button-2')!;
        button.focus();
        wrapper
            .find('#button-2')
            .hostNodes()
            .simulate('keydown', {key: 'ArrowLeft'});
        expect(document.getElementById('button')).toBe(document.activeElement);
    });

    it('should not change focus if there are no focusable elements before active element', () => {
        const wrapper = setup();
        const button = document.getElementById('button')!;
        button.focus();
        wrapper
            .find('#button')
            .hostNodes()
            .simulate('keydown', {key: 'ArrowLeft'});
        expect(document.getElementById('button')).toBe(document.activeElement);
    });
});

describe('<HeaderItem />', () => {
    it('should render a Typography', () => {
        const wrapper = app.mount(<HeaderItem />);
        expect(wrapper.find(Typography)).toHaveLength(1);
    });

    it('should render an additional element if children is string', () => {
        const wrapper = app.mount(<HeaderItem>string</HeaderItem>);
        expect(wrapper.find('div')).toHaveLength(2);
    });
});
