/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';
import {Tab, Indicator} from '../tab';

import {Tabs} from './tabs';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

// tslint:disable no-magic-numbers
describe('<Tabs />', () => {
    it('should set initial props for tab', () => {
        const wrapper = app.mount(
            <Tabs value={1}>
                <Tab />
            </Tabs>
        );

        expect(wrapper.find(Tab).props()).toEqual({
            className: 'tab',
            onClick: expect.anything(),
            value: 0,
            selected: false,
            size: 'normal',
            variant: 'ghost',
            indicatorPosition: 'bottom',
            indicatorProps: {
                selected: false
            },
            classes: {
                indicator: 'indicator'
            }
        });
    });

    it('should set values for size and variant from tabs to children', () => {
        const wrapper = app.mount(
            <Tabs value={1} size="small" variant="solid">
                <Tab />
            </Tabs>
        );

        expect(wrapper.find(Tab).prop('size')).toBe('small');
        expect(wrapper.find(Tab).prop('variant')).toBe('solid');
    });

    it('should render <Indicator>', () => {
        const wrapper = app.mount(<Tabs value={1} />);

        expect(wrapper.find(Indicator)).toBeTruthy();
    });

    it('should set selected value for tab', () => {
        const wrapper = app.mount(
            <Tabs value={1} size="small" variant="solid">
                <Tab />
            </Tabs>
        );

        expect(wrapper.find(Tab).prop('selected')).toBe(false);

        wrapper.setProps({
            value: 0
        });

        expect(wrapper.find(Tab).prop('selected')).toBe(true);
    });

    it('should execute onValueChange with tabIndex', () => {
        const onValueChange = jest.fn();

        const wrapper = app.mount(
            <Tabs value={0} onValueChange={onValueChange}>
                <Tab />
                <Tab />
                <Tab />
            </Tabs>
        );

        expect(onValueChange).toHaveBeenCalledTimes(0);

        wrapper
            .find(Tab)
            .at(2)
            .simulate('click');

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toBeCalledWith(2);
    });

    it('should execute onValueChange with 30', () => {
        const onValueChange = jest.fn();

        const wrapper = app.mount(
            <Tabs value={20} onValueChange={onValueChange}>
                <Tab value={10} />
                <Tab value={20} />
                <Tab value={30} />
            </Tabs>
        );

        expect(onValueChange).toHaveBeenCalledTimes(0);

        wrapper
            .find(Tab)
            .at(2)
            .simulate('click');

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toBeCalledWith(30);
    });
});
