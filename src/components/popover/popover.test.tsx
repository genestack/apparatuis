/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';

import {Grow} from '../grow';

import {Popover} from './popover';

jest.useFakeTimers();

function createTestApp() {
    let appElement: HTMLElement | undefined;
    let wrapper: ReactWrapper<any, any> | null = null;

    const mountToBody = <P, S = any>(node: React.ReactElement<P>): ReactWrapper<P, S> => {
        wrapper = mount(node, {attachTo: appElement});

        return wrapper;
    };

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

        mount: mountToBody
    };
}

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
        const wrapper = app.mount(
            <Popover referenceElement={document.createElement('div')} open>
                <div id="test" />
            </Popover>
        );

        const instance = wrapper.instance() as Popover;

        expect(() => {
            instance.scheduleUpdate();
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
