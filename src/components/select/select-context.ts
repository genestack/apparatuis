/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react';

import {EmitterIntent} from './emitter';

/** SelectContext value */
export interface SelectContextValue {
    /** Use native select instead Menu (used for Options) */
    native?: boolean;
    /** Ghost styles for emitter */
    ghost?: boolean;
    /** Intent of emitter */
    intent?: EmitterIntent;
    /** Sets `invalid` styles for emitter */
    invalid?: boolean;
    /** Sets `disabled` styles for emitter */
    disabled?: boolean;
}

/** Select Context */
export const SelectContext = React.createContext<SelectContextValue | null>(null);

/** Select Context hook */
export const useSelectContext = () => {
    const value = React.useContext(SelectContext);

    if (!value) {
        throw new Error('Could not be used outside of SelectContextProvider');
    }

    return value;
};
