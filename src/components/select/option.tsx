/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';

import {MenuItem, MenuItemProps} from '../menu';

import * as styles from './option.module.css';
import {useSelectContext} from './select-context';

/** Option props */
export interface Props extends Omit<MenuItemProps, 'value'> {
    /** Select value */
    value?: string | number;
    /** Option label used for render in SelectWrapper */
    label?: React.ReactNode;
}

/** Option component for Select */
export function Option({label, ...restProps}: Props) {
    const {native} = useSelectContext();

    if (native) {
        const optionLabel = typeof label === 'string' ? label : undefined;

        return (
            <option className={styles.root} value={restProps.value} label={optionLabel}>
                {restProps.children}
            </option>
        );
    }

    return <MenuItem {...restProps} />;
}
