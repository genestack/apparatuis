/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';

import {SelectContext, Props} from './select-context';
import {SelectMenu} from './select-menu';
import {SelectNative} from './select-native';
import {getSelectLabel} from './utils';

/** All props for select */
export {Props};

/** Select wrapper */
export function Select(props: Props) {
    const label = getSelectLabel(props.children, props.value);

    return (
        <SelectContext.Provider value={props}>
            {props.native ? (
                <SelectNative label={label} {...props} />
            ) : (
                <SelectMenu label={label} {...props} />
            )}
        </SelectContext.Provider>
    );
}
