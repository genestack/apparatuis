/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';

import {WithClasses, OverridableProps, OverridableComponent, mergeClassesProps} from '../../utils';

import * as styles from './select-emitter.module.css';

type SpanProps = React.HTMLAttributes<HTMLSpanElement>;

/** SelectLabel props */
export interface Props extends WithClasses<keyof typeof styles> {
    /** Element before children */
    prepend?: React.ReactNode;
    prependProps?: SpanProps;
    /** Element after children */
    append?: React.ReactNode;
    appendProps?: SpanProps;
    /** Label props */
    labelProps?: SpanProps;
}

interface TypeMap {
    props: Props;
    defaultType: 'span';
}

/** Option label (depends of SelectContext) */
export const OptionLabel: OverridableComponent<TypeMap> = React.forwardRef<
    HTMLSpanElement,
    OverridableProps<TypeMap>
>(function OptionLabelComponent(props, ref) {
    const {
        component: Component = 'span',
        className,
        prepend,
        prependProps = {},
        append,
        appendProps = {},
        labelProps = {},
        classes,
        children,
        ...rest
    } = mergeClassesProps(props, styles);

    return (
        <Component
            className={classNames(classes.optionLabel, className)}
            title={typeof children === 'string' ? children : undefined}
            {...rest}
            ref={ref}
        >
            {prepend && (
                <span
                    {...prependProps}
                    className={classNames(classes.info, prependProps.className)}
                >
                    {prepend}
                </span>
            )}
            {children && (
                <span {...labelProps} className={classNames(classes.label, labelProps.className)}>
                    {children}
                </span>
            )}
            {append && (
                <span {...appendProps} className={classNames(classes.info, appendProps.className)}>
                    {append}
                </span>
            )}
        </Component>
    );
});
