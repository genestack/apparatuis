/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';

import {Typography, TypographyProps} from '../typography';

import * as styles from './select-emitter.module.css';

type TargetProps = React.HTMLAttributes<HTMLSpanElement>;

/** SelectLabel props */
export interface Props extends TargetProps {
    /** Element before children */
    prepend?: React.ReactNode;
    prependProps?: TypographyProps;
    /** Element after children */
    append?: React.ReactNode;
    appendProps?: TypographyProps;
    /** Value props */
    valueProps?: TargetProps;
}

/** Option label (depends of SelectContext) */
export function OptionLabel(props: Props) {
    const {
        prepend,
        prependProps = {},
        append,
        appendProps = {},
        valueProps = {},
        children,
        ...rest
    } = props;

    return (
        <span
            title={typeof children === 'string' ? children : undefined}
            {...rest}
            className={classNames(styles.optionLabel, rest.className)}
        >
            {prepend && (
                <Typography
                    intent="quiet"
                    as="span"
                    variant="caption"
                    {...prependProps}
                    className={classNames(styles.info, prependProps.className)}
                >
                    {prepend}
                </Typography>
            )}
            {children && (
                <span {...valueProps} className={classNames(styles.value, valueProps.className)}>
                    {children}
                </span>
            )}
            {append && (
                <Typography
                    intent="quiet"
                    as="span"
                    variant="caption"
                    {...appendProps}
                    className={classNames(styles.info, appendProps.className)}
                >
                    {append}
                </Typography>
            )}
        </span>
    );
}
