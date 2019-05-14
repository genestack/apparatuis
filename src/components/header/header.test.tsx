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
import {Button} from '../button';
import {Typography} from '../typography';

import {Header, Props as HeaderProps} from './header';
import {HeaderBlock} from './header-block';
import {HeaderItem} from './header-item';
import {HeaderItemCell} from './header-item-cell';
import {HeaderItemIcon} from './header-item-icon';
import {HeaderItemSecondaryActions} from './header-item-secondary-actions';
import {HeaderItemText} from './header-item-text';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

const setup = (props?: Partial<HeaderProps>) =>
    app.mount(
        <Header {...props}>
            <HeaderBlock>
                <HeaderItemIcon />
                <HeaderItemCell />
                <HeaderItemText />
            </HeaderBlock>
            <HeaderItem id="button" />
            <HeaderItem id="button-2" as="button" />
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

describe('<HeaderItem />', () => {
    it('should render a div by default', () => {
        setup();
        expect(document.getElementById('button')).toBeInstanceOf(HTMLDivElement);
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

    it('should render a Typography if children is a string', () => {
        const wrapper = app.mount(<HeaderItem>string</HeaderItem>);
        expect(wrapper.find(Typography)).toHaveLength(1);
    });

    it('should render anchor element if `href` is passed', () => {
        app.mount(<HeaderItem id="test" href="foo" />);
        expect(document.getElementById('test')).toBeInstanceOf(HTMLAnchorElement);
        expect(document.getElementById('test')).toHaveProperty('href', 'http://localhost/foo');
    });
});

describe('<HeaderBlock />', () => {
    it('should render a Typography if children is a string', () => {
        const wrapper = app.mount(<HeaderBlock>string</HeaderBlock>);
        expect(wrapper.find(Typography)).toHaveLength(1);
    });

    it('should render an additional element if children is string', () => {
        const wrapper = app.mount(<HeaderBlock>string</HeaderBlock>);
        expect(wrapper.find('div')).toHaveLength(2);
    });
});

describe('<HeaderItemSecondaryActions />', () => {
    const clickSetup = () => {
        const onClick = jest.fn();
        const wrapper = app.mount(
            <HeaderItem onClick={onClick}>
                <HeaderItemText id="text">text</HeaderItemText>
                <HeaderItemSecondaryActions>
                    <Button id="button" />
                </HeaderItemSecondaryActions>
            </HeaderItem>
        );

        return {onClick, wrapper};
    };

    it('should not propagate click from inner button to HeaderButton', () => {
        const {wrapper, onClick} = clickSetup();

        wrapper
            .find('#button')
            .hostNodes()
            .simulate('click');
        expect(onClick).not.toBeCalled();
    });

    it('should propagate click from inner text to HeaderButton', () => {
        const {wrapper, onClick} = clickSetup();

        wrapper
            .find('#text')
            .hostNodes()
            .simulate('click');
        expect(onClick).toBeCalled();
    });
});
