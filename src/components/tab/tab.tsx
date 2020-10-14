/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';

import {OverridableComponent, OverridableProps, WithClasses, mergeClassesProps} from '../../utils';

import * as styles from './tab.module.css';

type SpanProps = React.HTMLAttributes<HTMLSpanElement>;

/** Tab props */
export interface Props extends WithClasses<keyof typeof styles> {
    /** Value of tab */
    value?: any;
    /** Style of tab (default: "ghost") */
    variant?: 'ghost' | 'solid';
    /** Size of tab (default: "normal") */
    size?: 'normal' | 'small' | 'tiny';
    /**
     * If `true` element has `hover` style.
     * It is used only for examples. Avoid using this property.
     */
    hovered?: boolean;
    /** Adds styles for selected state */
    selected?: boolean;
    /** Node that is placed before tab label */
    prepend?: React.ReactNode;
    /** Properties for wrapper of prepend element */
    prependProps?: SpanProps;
    /** Node that is placed after tab label */
    append?: React.ReactNode;
    /** Properties for wrapper of append element */
    appendProps?: SpanProps;
    /** Properties for wrapper of label element */
    labelProps?: SpanProps;
}

interface TypeMap {
    props: Props;
    defaultType: 'button';
}

/** Tab control component */
export const Tab: OverridableComponent<TypeMap> = React.forwardRef<
    HTMLButtonElement,
    OverridableProps<TypeMap>
>(function TabComponent(props, ref) {
    const {
        className,
        component: Component = 'button',
        variant = 'ghost',
        size = 'normal',
        hovered,
        selected,
        labelProps = {},
        prepend,
        prependProps = {},
        append,
        appendProps = {},
        classes,
        children,
        ...restProps
    } = mergeClassesProps(props, styles);

    return (
        <Component
            className={classNames(
                styles.root,
                {
                    [classes.hovered]: hovered,
                    [classes.selected]: selected,
                    [classes.empty]: !children,
                    [classes.solid]: variant === 'solid',
                    [classes.normal]: size === 'normal',
                    [classes.small]: size === 'small',
                    [classes.tiny]: size === 'tiny'
                },
                className
            )}
            role="tab"
            aria-selected={selected}
            aria-disabled={restProps.disabled}
            title={typeof children === 'string' ? children : ''}
            {...restProps}
            ref={ref}
        >
            {prepend && (
                <span {...prependProps} className={classes.prepend}>
                    {prepend}
                </span>
            )}
            {children && (
                <span {...labelProps} className={classes.label}>
                    {children}
                </span>
            )}
            {append && (
                <span {...appendProps} className={classes.append}>
                    {append}
                </span>
            )}
        </Component>
    );
});
