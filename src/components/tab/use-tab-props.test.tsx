/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';
import {TabsContext, TabsContextValue} from '../tabs';

import {Props} from './tab';
import {useTabProps} from './use-tab-props';

type TabProps = Props & React.ButtonHTMLAttributes<HTMLButtonElement>;
const app = createTestApp();

const Component = function(props: Props) {
    const buttonProps = useTabProps(props);

    return <button {...buttonProps} />;
};

const setup = (props: TabProps, contextValue: TabsContextValue) => {
    return app.mount(
        <TabsContext.Provider value={contextValue}>
            <Component {...props} />
        </TabsContext.Provider>
    );
};

describe('useTabProps', () => {
    it('should return initial props', () => {
        const INITIAL_BUTTON_PROPS: TabProps = {
            value: 'test',
            variant: 'ghost'
        };

        const wrapper = app.mount(<Component {...INITIAL_BUTTON_PROPS} />);

        expect(wrapper.find('button').props()).toEqual(INITIAL_BUTTON_PROPS);
    });

    it('should return props with contextProps', () => {
        const wrapper = setup(
            {
                value: 'test',
                variant: 'solid'
            },
            {
                size: 'normal'
            }
        );

        expect(wrapper.find('button').props()).toEqual({
            onClick: expect.anything(),
            selected: false,
            size: 'normal',
            value: 'test',
            variant: 'solid'
        });
    });

    it('should set selected property to true', () => {
        const wrapper = setup(
            {
                value: 'test',
                variant: 'solid'
            },
            {
                size: 'normal',
                value: 'test'
            }
        );

        expect(wrapper.find('button').props()).toEqual({
            onClick: expect.anything(),
            selected: true,
            size: 'normal',
            value: 'test',
            variant: 'solid'
        });
    });

    it('should set variant property to solid', () => {
        const wrapper = setup(
            {
                value: 'test',
                variant: 'solid'
            },
            {
                variant: 'ghost'
            }
        );

        expect(wrapper.find('button').props()).toEqual({
            onClick: expect.anything(),
            selected: false,
            size: undefined,
            value: 'test',
            variant: 'solid'
        });
    });

    it('should execute onValueChange with test value', () => {
        const onValueChange = jest.fn();
        const wrapper = setup(
            {value: 'test'},
            {
                onValueChange
            }
        );

        expect(onValueChange).toHaveBeenCalledTimes(0);
        wrapper.find('button').simulate('click');
        expect(onValueChange).toBeCalledWith('test');
    });
});
