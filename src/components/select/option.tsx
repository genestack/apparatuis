/*
 * Copyright (c) 2011-2021 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React, {OptionHTMLAttributes} from 'react';

import {MenuItem, MenuItemProps} from '../menu';

import * as styles from './option.module.css';
import {useSelectContext} from './select-context';

type NativeOptionProps = OptionHTMLAttributes<HTMLOptionElement>;

interface MenuOptionProps extends Omit<MenuItemProps, 'value'> {
    /** Select value */
    value?: string | number;
    /** Option label used for render in SelectWrapper */
    label?: React.ReactNode;
}

/** Option props */
export type Props = MenuOptionProps | NativeOptionProps;

/** Option component for Select */
export function Option({label, ...restProps}: Props) {
    const {native} = useSelectContext();

    if (native) {
        const optionLabel = typeof label === 'string' ? label : undefined;

        return (
            <option
                value={restProps.value}
                label={optionLabel}
                {...restProps}
                className={classNames(styles.root, restProps.className)}
            >
                {restProps.children}
            </option>
        );
    }

    return <MenuItem {...restProps} />;
}
