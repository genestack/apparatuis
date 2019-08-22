/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-non-null-assertion no-magic-numbers
import * as React from 'react';

import {createRafMock} from '../../../test-utils/create-raf-mock';
import {createTestApp} from '../../../test-utils/create-test-app';

import {HiddenScrollbar} from './hidden-scrollbar';

jest.useFakeTimers();

describe('<HiddenScrollbar />', () => {
    const app = createTestApp();
    const rafMock = createRafMock();

    beforeEach(app.beforeEach);
    beforeEach(rafMock.beforeEach);

    afterEach(app.afterEach);
    afterEach(rafMock.afterEach);

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

        jest.spyOn(start, 'getBoundingClientRect').mockImplementation(() => {
            if (start.style.display === 'none') {
                return {
                    height: 0,
                    bottom: 0
                };
            }

            return {
                height: 10,
                bottom: 10
            };
        });

        jest.spyOn(end, 'getBoundingClientRect').mockImplementation(() => {
            if (end.style.display === 'none') {
                return {
                    height: 0,
                    top: 0
                };
            }

            return {
                height: 10,
                top: 40
            };
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
        rafMock.runAll();
        expect(start.style.display).toBe('none');
    });

    it('end control should be visible on init', () => {
        const {end} = setup();
        rafMock.runAll();
        expect(end.style.display).not.toBe('none');
    });

    it('start control should be visible after some scroll', () => {
        const {start, container} = setup();
        rafMock.runAll();
        container.scrollTop = 10;
        rafMock.runAll();
        expect(start.style.display).not.toBe('none');
    });

    it('end control should be visible after some scroll', () => {
        const {end, container} = setup();
        rafMock.runAll();
        container.scrollTop = 10;
        rafMock.runAll();
        expect(end.style.display).not.toBe('none');
    });

    it('start control should be visible after scroll to end', () => {
        const {start, container} = setup();
        rafMock.runAll();
        container.scrollTop = 50;
        rafMock.runAll();
        expect(start.style.display).not.toBe('none');
    });

    it('end control should be hidden after scroll to end', () => {
        const {end, container} = setup();
        rafMock.runAll();
        container.scrollTop = 50;
        rafMock.runAll();
        expect(end.style.display).toBe('none');
    });

    it('start control should be hidden if focus to the first element', () => {
        const {start, container} = setup();
        rafMock.runAll();
        container.scrollTop = 10;
        rafMock.runAll();
        document.getElementById('first-item')!.focus();
        rafMock.runAll();
        expect(start.style.display).toBe('none');
    });

    it('end control should be hidden if focus to the last element', () => {
        const {end, container} = setup();
        rafMock.runAll();
        container.scrollTop = 10;
        rafMock.runAll();
        document.getElementById('last-item')!.focus();
        rafMock.runAll();
        expect(end.style.display).toBe('none');
    });

    it('both controls should be visible if focus to the middle element', () => {
        const {end, start, container} = setup();
        rafMock.runAll();
        container.scrollTop = 10;
        rafMock.runAll();
        const middleItem = document.getElementById('middle-item')!;
        jest.spyOn(middleItem, 'getBoundingClientRect').mockImplementation(() => ({
            top: 10,
            bottom: 20
        }));
        middleItem.focus();
        rafMock.runAll();
        expect(end.style.display).not.toBe('none');
        expect(start.style.display).not.toBe('none');
    });

    it('should increase scrollTop with default scrollStep when mouse over the end control', () => {
        const {end, scrollTopSetter} = setup();
        rafMock.runAll();
        scrollTopSetter.mockClear();
        end.dispatchEvent(new MouseEvent('mouseover', {bubbles: true}));
        expect(scrollTopSetter).toHaveBeenCalledTimes(1);
        expect(scrollTopSetter).toBeCalledWith(32);
    });

    it(
        'should decrease scrollTop with default ' + 'scrollStep when mouse over the start control',
        () => {
            const {start, container, scrollTopSetter} = setup();
            rafMock.runAll();
            container.scrollTop = 50;
            rafMock.runAll();
            scrollTopSetter.mockClear();
            start.dispatchEvent(new MouseEvent('mouseover', {bubbles: true}));
            expect(scrollTopSetter).toHaveBeenCalledTimes(1);
            expect(scrollTopSetter).toBeCalledWith(50 - 32);
        }
    );

    it('should stop change scroll whe mouse leave the end control', () => {
        const {end, scrollTopSetter} = setup();
        rafMock.runAll();
        scrollTopSetter.mockClear();
        end.dispatchEvent(new MouseEvent('mouseover', {bubbles: true}));
        jest.runOnlyPendingTimers();
        end.dispatchEvent(new MouseEvent('mouseout', {bubbles: true}));
        jest.runOnlyPendingTimers();
        expect(scrollTopSetter).toHaveBeenCalledTimes(2);
    });

    it('should stop change scroll whe mouse leave the start control', () => {
        const {start, container, scrollTopSetter} = setup();
        rafMock.runAll();
        container.scrollTop = 50;
        rafMock.runAll();
        scrollTopSetter.mockClear();
        start.dispatchEvent(new MouseEvent('mouseover', {bubbles: true}));
        jest.runOnlyPendingTimers();
        start.dispatchEvent(new MouseEvent('mouseout', {bubbles: true}));
        expect(scrollTopSetter).toHaveBeenCalledTimes(2);
    });
});
