/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {shallow} from 'enzyme';
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';
import {Tab} from '../tab';

import {Tabs} from './tabs';
import {TabsContext} from './tabs-context';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

// tslint:disable no-magic-numbers
describe('<Tabs />', () => {
    it('should set default values for orientation, size and variant', () => {
        const wrapper = shallow(<Tabs />);

        expect(wrapper.find(TabsContext.Provider).prop('value')).toEqual({
            orientation: 'horizontal',
            size: 'normal',
            variant: 'ghost'
        });
    });

    it('should execute onValueChange with 30', () => {
        const onValueChange = jest.fn();

        const wrapper = app.mount(
            <Tabs value="20" onValueChange={onValueChange}>
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
