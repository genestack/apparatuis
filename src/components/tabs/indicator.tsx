/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import React from 'react';

import * as styles from './indicator.module.css';

type TargetProps = React.HTMLAttributes<HTMLSpanElement>;

/** Indicator position */
export type IndicatorPosition = 'top' | 'bottom' | 'left' | 'right';

/** Indicator props */
export interface Props extends TargetProps {
    selected?: boolean;
    position?: IndicatorPosition;
}

/** Indicator component */
export function Indicator({className, position, selected, ...restProps}: Props) {
    return (
        <span
            className={classNames(
                styles.root,
                {
                    [styles.selected]: selected,
                    [styles.bottom]: position === 'bottom',
                    [styles.top]: position === 'top',
                    [styles.left]: position === 'left',
                    [styles.right]: position === 'right'
                },
                className
            )}
            {...restProps}
        />
    );
}
