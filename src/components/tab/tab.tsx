/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';

import {
    OverridableComponent,
    OverridableProps,
    WithClasses,
    mergeClassesProps,
    shouldRenderNode
} from '../../utils';
import {SlotProps} from '../../utils/slot-props';

import {Indicator, IndicatorPlacement, Props as IndicatorProps} from './indicator';
import * as styles from './tab.module.css';

/** Tab props */
export interface Props extends WithClasses<keyof typeof styles> {
    /** Value of tab */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    /** Properties for body of tab */
    bodyProps?: SlotProps<'span'>;
    /** Properties for wrapper of label element */
    labelProps?: SlotProps<'span'>;
    /** Node that is placed before tab label */
    prepend?: React.ReactNode;
    /** Properties for wrapper of prepend element */
    prependProps?: SlotProps<'span'>;
    /** Node that is placed after tab label */
    append?: React.ReactNode;
    /** Properties for wrapper of append element */
    appendProps?: SlotProps<'span'>;

    /** Indicator placement of tab (default: "bottom") */
    indicatorPlacement?: IndicatorPlacement;
    /** Props of tab indicator */
    indicatorProps?: IndicatorProps;
    /**
     * If `true`, the component is disabled but allows cursor interactions such as mouse hover (for tooltips) and focus.
     * @default false
     */
    inclusiveDisabled?: boolean;
}

interface TypeMap {
    props: Props;
    defaultType: 'button';
}

/**
 *  Tab control component
 * @example ./tab-combinations.md
 *
 */
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
        bodyProps = {},
        labelProps = {},
        prepend,
        prependProps = {},
        append,
        appendProps = {},

        indicatorPlacement = 'bottom',
        indicatorProps = {},

        classes,
        disabled,
        inclusiveDisabled = false,
        children,
        ...restProps
    } = mergeClassesProps(props, styles);

    const anyDisabled = disabled || inclusiveDisabled;

    return (
        <>
            <Component
                data-qa="tab"
                className={classNames(
                    classes.root,
                    {
                        [classes.hovered]: hovered,
                        [classes.selected]: selected,
                        [classes.disabled]: anyDisabled,
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
                aria-disabled={anyDisabled}
                title={typeof children === 'string' ? children : ''}
                {...restProps}
                onClick={!anyDisabled ? restProps.onClick : undefined}
                ref={ref}
            >
                <span {...bodyProps} className={classes.body}>
                    {shouldRenderNode(prepend) && (
                        <span {...prependProps} className={classes.prepend}>
                            {prepend}
                        </span>
                    )}
                    {shouldRenderNode(children) && (
                        <span {...labelProps} className={classes.label}>
                            {children}
                        </span>
                    )}
                    {shouldRenderNode(append) && (
                        <span {...appendProps} className={classes.append}>
                            {append}
                        </span>
                    )}
                </span>

                {!anyDisabled && (
                    <Indicator
                        fullWidth={variant === 'solid'}
                        active={selected}
                        placement={indicatorPlacement}
                        {...indicatorProps}
                        className={classNames(classes.indicator, {
                            [classes.selected]: selected || indicatorProps.active
                        })}
                    />
                )}
            </Component>
        </>
    );
});
