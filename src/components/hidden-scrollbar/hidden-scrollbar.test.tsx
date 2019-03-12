/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-non-null-assertion no-magic-numbers
import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';

import {HiddenScrollbar} from './hidden-scrollbar';

jest.useFakeTimers();

function createTestApp() {
    let appElement: HTMLElement | undefined;
    let wrapper: ReactWrapper<any, any> | null = null;
    let rafCallbacks: Array<() => void> = [];

    return {
        beforeEach: () => {
            rafCallbacks = [];
            appElement = document.createElement('div');
            document.body.appendChild(appElement);

            jest.spyOn(window, 'requestAnimationFrame').mockImplementation(
                (callback: () => void) => {
                    rafCallbacks.push(callback);
                }
            );
        },

        afterEach: () => {
            (window.requestAnimationFrame as any).mockRestore();

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
        },

        runRafCallbacks: () => {
            rafCallbacks.forEach((callback) => {
                callback();
            });
        }
    };
}

describe('<HiddenScrollbar />', () => {
    const app = createTestApp();
    beforeEach(app.beforeEach);
    afterEach(app.afterEach);

    const setup = () => {
        app.mount(
            <HiddenScrollbar
                containerProps={{
                    id: 'container'
                }}
                startControlProps={{
                    id: 'start'
                }}
                endControlProps={{
                    id: 'end'
                }}
            >
                <div tabIndex={0} id="first-item" />
                <div tabIndex={0} id="middle-item" />
                <div tabIndex={0} id="last-item" />
            </HiddenScrollbar>
        );

        const container = document.getElementById('container')!;
        const start = document.getElementById('start')!;
        const end = document.getElementById('end')!;

        Object.defineProperty(container, 'scrollHeight', {
            value: 100
        });

        Object.defineProperty(container, 'clientHeight', {
            value: 50
        });

        let scrollTop = 0;
        const scrollTopSetter = jest.fn();
        Object.defineProperty(container, 'scrollTop', {
            set(value: number) {
                scrollTopSetter(value);
                scrollTop = value;
                container.dispatchEvent(new Event('scroll'));
            },

            get() {
                return scrollTop;
            }
        });

        return {app, end, start, container, scrollTopSetter};
    };

    it('start control should be hidden on init', () => {
        const {start} = setup();
        app.runRafCallbacks();
        expect(start.style.display).toBe('none');
    });

    it('end control should be visible on init', () => {
        const {end} = setup();
        app.runRafCallbacks();
        expect(end.style.display).not.toBe('none');
    });

    it('start control should be visible after some scroll', () => {
        const {start, container} = setup();
        app.runRafCallbacks();
        container.scrollTop = 10;
        app.runRafCallbacks();
        expect(start.style.display).not.toBe('none');
    });

    it('end control should be visible after some scroll', () => {
        const {end, container} = setup();
        app.runRafCallbacks();
        container.scrollTop = 10;
        app.runRafCallbacks();
        expect(end.style.display).not.toBe('none');
    });

    it('start control should be visible after scroll to end', () => {
        const {start, container} = setup();
        app.runRafCallbacks();
        container.scrollTop = 50;
        app.runRafCallbacks();
        expect(start.style.display).not.toBe('none');
    });

    it('end control should be hidden after scroll to end', () => {
        const {end, container} = setup();
        app.runRafCallbacks();
        container.scrollTop = 50;
        app.runRafCallbacks();
        expect(end.style.display).toBe('none');
    });

    it('start control should be hidden if focus to the first element', () => {
        const {start, container} = setup();
        app.runRafCallbacks();
        container.scrollTop = 10;
        app.runRafCallbacks();
        document.getElementById('first-item')!.focus();
        app.runRafCallbacks();
        expect(start.style.display).toBe('none');
    });

    it('end control should be hidden if focus to the last element', () => {
        const {end, container} = setup();
        app.runRafCallbacks();
        container.scrollTop = 10;
        app.runRafCallbacks();
        document.getElementById('last-item')!.focus();
        app.runRafCallbacks();
        expect(end.style.display).toBe('none');
    });

    it('both controls should be visible if focus to the middle element', () => {
        const {end, start, container} = setup();
        app.runRafCallbacks();
        container.scrollTop = 10;
        app.runRafCallbacks();
        document.getElementById('middle-item')!.focus();
        app.runRafCallbacks();
        expect(end.style.display).not.toBe('none');
        expect(start.style.display).not.toBe('none');
    });

    it('should increase scrollTop with default scrollStep when mouse over the end control', () => {
        const {end, scrollTopSetter} = setup();
        app.runRafCallbacks();
        scrollTopSetter.mockClear();
        end.dispatchEvent(new MouseEvent('mouseover', {bubbles: true}));
        expect(scrollTopSetter).toHaveBeenCalledTimes(1);
        expect(scrollTopSetter).toBeCalledWith(26);
    });

    it(
        'should decrease scrollTop with default ' + 'scrollStep when mouse over the start control',
        () => {
            const {start, container, scrollTopSetter} = setup();
            app.runRafCallbacks();
            container.scrollTop = 50;
            app.runRafCallbacks();
            scrollTopSetter.mockClear();
            start.dispatchEvent(new MouseEvent('mouseover', {bubbles: true}));
            expect(scrollTopSetter).toHaveBeenCalledTimes(1);
            expect(scrollTopSetter).toBeCalledWith(50 - 26);
        }
    );

    it('should stop change scroll whe mouse leave the end control', () => {
        const {end, scrollTopSetter} = setup();
        app.runRafCallbacks();
        scrollTopSetter.mockClear();
        end.dispatchEvent(new MouseEvent('mouseover', {bubbles: true}));
        jest.runOnlyPendingTimers();
        end.dispatchEvent(new MouseEvent('mouseout', {bubbles: true}));
        jest.runOnlyPendingTimers();
        expect(scrollTopSetter).toHaveBeenCalledTimes(2);
    });

    it('should stop change scroll whe mouse leave the start control', () => {
        const {start, container, scrollTopSetter} = setup();
        app.runRafCallbacks();
        container.scrollTop = 50;
        app.runRafCallbacks();
        scrollTopSetter.mockClear();
        start.dispatchEvent(new MouseEvent('mouseover', {bubbles: true}));
        jest.runOnlyPendingTimers();
        start.dispatchEvent(new MouseEvent('mouseout', {bubbles: true}));
        expect(scrollTopSetter).toHaveBeenCalledTimes(2);
    });
});
