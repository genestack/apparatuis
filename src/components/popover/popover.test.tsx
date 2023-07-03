/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import * as React from 'react';

import {TransitionPopper} from '../transition-popper';

import {Popover} from './popover';

jest.useFakeTimers();

describe('<Popover />', () => {
    it('should render expected children', () => {
        render(
            <Popover referenceElement={document.createElement('div')} open>
                <div id="test" />
            </Popover>
        );

        expect(document.getElementById('test')).toBeTruthy();
    });

    it('should unmount after close', () => {
        const screen = render(
            <Popover referenceElement={document.createElement('div')} open>
                <div id="test" />
            </Popover>
        );

        screen.rerender(
            <Popover referenceElement={document.createElement('div')}>
                <div id="test" />
            </Popover>
        );
        jest.runAllTimers();

        expect(document.getElementById('test')).toBeFalsy();
    });

    it('should unmount instantly after close when disableTransition = true', () => {
        const screen = render(
            <Popover referenceElement={document.createElement('div')} open disableTransition>
                <div id="test" />
            </Popover>
        );

        expect(document.getElementById('test')).toBeTruthy();

        screen.rerender(
            <Popover referenceElement={document.createElement('div')} disableTransition>
                <div id="test" />
            </Popover>
        );
        expect(document.getElementById('test')).toBeFalsy();
    });

    it('should not unmount after close when keepMounted = true', () => {
        const screen = render(
            <Popover referenceElement={document.createElement('div')} open keepMounted>
                <div id="test" />
            </Popover>
        );

        expect(document.getElementById('test')).toBeTruthy();
        screen.rerender(
            <Popover referenceElement={document.createElement('div')} keepMounted>
                <div id="test" />
            </Popover>
        );

        expect(document.getElementById('test')).toBeTruthy();
    });

    it('should not unmount after close when keepMounted = true disableTransition = true', () => {
        const screen = render(
            <Popover
                referenceElement={document.createElement('div')}
                open
                keepMounted
                disableTransition
            >
                <div id="test" />
            </Popover>
        );

        expect(document.getElementById('test')).toBeTruthy();
        screen.rerender(
            <Popover referenceElement={document.createElement('div')} keepMounted disableTransition>
                <div id="test" />
            </Popover>
        );
        expect(document.getElementById('test')).toBeTruthy();
    });

    it('should accept referenceElement as function', () => {
        const element = document.createElement('div');
        const getReferenceElement = jest.fn(() => element);

        render(
            <Popover referenceElement={getReferenceElement} open>
                <div id="test" />
            </Popover>
        );

        expect(getReferenceElement).toHaveBeenCalled();
    });

    it('should expose scheduleUpdate method', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let instance: TransitionPopper<any> | null = null;

        render(
            <Popover
                referenceElement={document.createElement('div')}
                open
                popperRef={(node) => {
                    instance = node;
                }}
            >
                <div id="test" />
            </Popover>
        );

        expect(instance).toBeTruthy();

        expect(() => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            instance!.scheduleUpdate();
        }).not.toThrow();
    });

    it('should pass Transition props', () => {
        const onEntered = jest.fn();

        render(
            <Popover
                referenceElement={document.createElement('div')}
                open
                transitionProps={{
                    onEntered
                }}
            >
                <div id="test" />
            </Popover>
        );

        jest.runAllTimers();

        expect(onEntered).toHaveBeenCalled();
    });
});
