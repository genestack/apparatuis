/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';

import {OverridableComponent, OverridableProps} from '../../utils';

import * as styles from './tab.module.css';

type SpanProps = React.HTMLAttributes<HTMLSpanElement>;

/** Tab props */
export interface Props {
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
        children,
        ...restProps
    } = props;

    const infoClasses = classNames(styles.info, {
        [styles.selected]: selected,
        [styles.solid]: variant === 'solid'
    });

    return (
        <Component
            className={classNames(
                styles.root,
                {
                    [styles.hovered]: hovered,
                    [styles.selected]: selected,
                    [styles.solid]: variant === 'solid',
                    [styles.normal]: size === 'normal',
                    [styles.small]: size === 'small',
                    [styles.tiny]: size === 'tiny'
                },
                className
            )}
            aria-selected={selected}
            aria-disabled={restProps.disabled}
            title={typeof children === 'string' ? children : undefined}
            {...restProps}
            ref={ref}
        >
            {prepend && (
                <span {...prependProps} className={classNames(infoClasses, prependProps.className)}>
                    {prepend}
                </span>
            )}
            {children && (
                <span {...labelProps} className={classNames(styles.label, labelProps.className)}>
                    {children}
                </span>
            )}
            {append && (
                <span {...appendProps} className={classNames(infoClasses, appendProps.className)}>
                    {append}
                </span>
            )}
        </Component>
    );
});
