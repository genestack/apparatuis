/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {fireEvent, render} from '@testing-library/react';
import * as React from 'react';

import {Button} from '../button';

import {Header, Props as HeaderProps} from './header';
import {HeaderBlock} from './header-block';
import {HeaderItem} from './header-item';
import {HeaderItemCell} from './header-item-cell';
import {HeaderItemIcon} from './header-item-icon';
import {HeaderItemSecondaryActions} from './header-item-secondary-actions';
import {HeaderItemText} from './header-item-text';

const setup = (props?: Partial<HeaderProps>) =>
    render(
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
        setup();
        const button = document.getElementById('button')!;
        button.focus();
        fireEvent.keyDown(button, {key: 'ArrowRight'});
        expect(document.getElementById('button-2')).toBe(document.activeElement);
    });

    it('should not change focus if there are no focusable elements after active element', () => {
        setup();
        const button = document.getElementById('button-2')!;
        button.focus();
        fireEvent.keyDown(button, {key: 'ArrowRight'});
        expect(document.getElementById('button-2')).toBe(document.activeElement);
    });

    it('should focus to the previous button on ArrowLeft keydown', () => {
        setup();
        const button = document.getElementById('button-2')!;
        button.focus();
        fireEvent.keyDown(button, {key: 'ArrowLeft'});
        expect(document.getElementById('button')).toBe(document.activeElement);
    });

    it('should not change focus if there are no focusable elements before active element', () => {
        setup();
        const button = document.getElementById('button')!;
        button.focus();
        fireEvent.keyDown(button, {key: 'ArrowLeft'});
        expect(document.getElementById('button')).toBe(document.activeElement);
    });

    it('should render a Typography if children is a string', () => {
        const screen = render(
            <HeaderItem headerItemTextProps={{'data-testid': 'test'}}>string</HeaderItem>
        );
        expect(screen.queryByTestId('test')).toBeInstanceOf(HTMLDivElement);
    });

    it('should render anchor element if `href` is passed', () => {
        render(<HeaderItem id="test" href="foo" />);
        expect(document.getElementById('test')).toBeInstanceOf(HTMLAnchorElement);
        expect(document.getElementById('test')).toHaveProperty('href', 'http://localhost/foo');
    });
});

describe('<HeaderBlock />', () => {
    it('should render a Typography if children is a string', () => {
        const screen = render(
            <HeaderBlock headerItemTextProps={{'data-testid': 'test'}}>string</HeaderBlock>
        );
        expect(screen.queryByTestId('test')).toBeInstanceOf(HTMLDivElement);
    });
});

describe('<HeaderItemSecondaryActions />', () => {
    const clickSetup = () => {
        const onClick = jest.fn();
        const screen = render(
            <HeaderItem onClick={onClick}>
                <HeaderItemText id="text">text</HeaderItemText>
                <HeaderItemSecondaryActions>
                    <Button id="button" />
                </HeaderItemSecondaryActions>
            </HeaderItem>
        );

        return {onClick, screen};
    };

    it('should not propagate click from inner button to HeaderButton', () => {
        const {onClick} = clickSetup();

        fireEvent.click(document.getElementById('button')!);
        expect(onClick).not.toHaveBeenCalled();
    });

    it('should propagate click from inner text to HeaderButton', () => {
        const {onClick} = clickSetup();

        fireEvent.click(document.getElementById('text')!);
        expect(onClick).toHaveBeenCalled();
    });
});
