/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';
import {Grow} from '../grow';

import {Popover, Props as PopoverProps} from './popover';
import {TransitionPopper} from '../transition-popper';

jest.useFakeTimers();

describe('<Popover />', () => {
    const app = createTestApp();

    beforeEach(app.beforeEach);
    afterEach(app.afterEach);

    it('should render expected children', () => {
        app.mount(
            <Popover referenceElement={document.createElement('div')} open>
                <div id="test" />
            </Popover>
        );

        expect(document.getElementById('test')).toBeTruthy();
    });

    it('should unmount after close', () => {
        const wrapper = app.mount(
            <Popover referenceElement={document.createElement('div')} open>
                <div id="test" />
            </Popover>
        );

        wrapper.setProps({open: false});
        jest.runAllTimers();

        expect(document.getElementById('test')).toBeFalsy();
    });

    it('should unmount instantly after close when disableTransition = true', () => {
        const wrapper = app.mount(
            <Popover referenceElement={document.createElement('div')} open disableTransition>
                <div id="test" />
            </Popover>
        );

        expect(document.getElementById('test')).toBeTruthy();
        wrapper.setProps({open: false});
        expect(document.getElementById('test')).toBeFalsy();
    });

    it('should not unmount after close when keepMounted = true', () => {
        const wrapper = app.mount(
            <Popover referenceElement={document.createElement('div')} open keepMounted>
                <div id="test" />
            </Popover>
        );

        expect(document.getElementById('test')).toBeTruthy();
        wrapper.setProps({open: false});
        expect(document.getElementById('test')).toBeTruthy();
    });

    it('should not unmount after close when keepMounted = true disableTransition = true', () => {
        const wrapper = app.mount(
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
        wrapper.setProps({open: false});
        expect(document.getElementById('test')).toBeTruthy();
    });

    it('should render transition component', () => {
        const wrapper = app.mount(
            <Popover referenceElement={document.createElement('div')} open>
                <div id="test" />
            </Popover>
        );

        expect(wrapper.find(Grow)).toHaveLength(1);
    });

    it('should not render transition component when disableTransition = true', () => {
        const wrapper = app.mount(
            <Popover referenceElement={document.createElement('div')} open disableTransition>
                <div id="test" />
            </Popover>
        );

        expect(wrapper.find(Grow)).toHaveLength(0);
    });

    it('should accept referenceElement as function', () => {
        const element = document.createElement('div');
        const getReferenceElement = jest.fn(() => element);

        app.mount(
            <Popover referenceElement={getReferenceElement} open>
                <div id="test" />
            </Popover>
        );

        expect(getReferenceElement).toBeCalled();
    });

    it('should expose scheduleUpdate method', () => {
        let instance: TransitionPopper<any> | null = null;

        app.mount(
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
            instance!.scheduleUpdate();
        }).not.toThrow();
    });

    it('should pass Transition props', () => {
        const onEntered = jest.fn();

        app.mount(
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

        expect(onEntered).toBeCalled();
    });
});
