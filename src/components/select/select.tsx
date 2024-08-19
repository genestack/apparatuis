/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';

import {Props, SelectContext} from './select-context';
import {SelectMenu} from './select-menu';
import {SelectNative} from './select-native';
import {getSelectLabel} from './utils';

/** All props for select */
export {Props};

/** Select wrapper */
export const Select = React.forwardRef<HTMLElement, Props>(function Select(props, ref) {
    const label = getSelectLabel(props.children, props.value);

    return (
        <SelectContext.Provider value={props}>
            {props.native ? (
                <SelectNative label={label} {...props} ref={ref} />
            ) : (
                <SelectMenu label={label} {...props} ref={ref} />
            )}
        </SelectContext.Provider>
    );
});
