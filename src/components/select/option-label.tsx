/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';

import * as styles from './select-emitter.module.css';

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
    const {prepend, append, children, ...rest} = props;

    return (
        <span
            title={typeof children === 'string' ? children : undefined}
            {...rest}
            className={classNames(styles.optionLabel, rest.className)}
        >
            {prepend && <span className={styles.info}>{prepend}</span>}
            {children && <span className={styles.value}>{children}</span>}
            {append && <span className={styles.info}>{append}</span>}
        </span>
    );
}
