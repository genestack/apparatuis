/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';

import * as styles from './option-label.module.css';
import {useSelectContext} from './select-context';

type TargetProps = React.HTMLAttributes<HTMLSpanElement>;

/** SelectLabel props */
export interface Props extends TargetProps {
    /** Element before children */
    prepend?: React.ReactNode;
    /** Element after children */
    append?: React.ReactNode;
}

/** Option label (depends of SelectContext) */
export function OptionLabel(props: Props) {
    const {invalid, intent, ghost, disabled} = useSelectContext();

    const {prepend, append, children, ...rest} = props;
    const notAvailable = disabled || invalid;

    const labelClassName = classNames(styles.label, {
        [styles.quiet]: !notAvailable && (intent !== 'accent' || ghost)
    });

    return (
        <span {...rest}>
            {prepend && <span className={labelClassName}>{prepend}</span>}
            {children && <span className={styles.value}>{children}</span>}
            {append && <span className={labelClassName}>{append}</span>}
        </span>
    );
}
