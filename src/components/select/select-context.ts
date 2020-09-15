/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react';

import {Props as SelectMenuProps} from './select-menu';
import {Props as SelectNativeProps} from './select-native';

/** SelectContext value */
export type Props = SelectNativeProps | SelectMenuProps;

/** Select Context */
export const SelectContext = React.createContext<Props | null>(null);

/** Select Context hook */
export const useSelectContext = () => {
    const value = React.useContext(SelectContext);

    if (!value) {
        throw new Error('Could not be used outside of SelectContextProvider');
    }

    return value;
};
