/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react';

import {Props as TabsProps} from './tabs';

/** TabsContext value */
export interface Props extends TabsProps {}

/** Tabs Context */
export const TabsContext = React.createContext<Props | null>(null);

/** Tabs Context hook */
export const useTabsContext = () => {
    const value = React.useContext(TabsContext);

    if (!value) {
        throw new Error('Could not be used outside of TabsContextProvider');
    }

    return value;
};
