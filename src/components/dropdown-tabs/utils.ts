/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React, {ReactNode} from 'react';

import {OverridableProps} from '../../utils';
import {TabProps} from '../tab';

interface TabsInfo {
    tabs: React.ReactElement[];
    selectedTabData: OverridableProps<{props: TabProps; defaultType: 'button'}> | null;
}

/** Return valid tabs and selected tab data */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTabsInfo = (selectedValue: any, children: ReactNode): TabsInfo => {
    let tabIndex = 0;

    return React.Children.toArray(children).reduce<TabsInfo>(
        (acc, child) => {
            if (!React.isValidElement(child)) {
                return acc;
            }

            const {value, ...restProps} = child.props;
            const childValue = value ?? tabIndex;
            const isActive = childValue === selectedValue;
            tabIndex += 1;

            return {
                tabs: [...acc.tabs, child],
                selectedTabData: isActive
                    ? {value: childValue, children, ...restProps}
                    : acc.selectedTabData
            };
        },
        {
            tabs: [],
            selectedTabData: null
        }
    );
};
