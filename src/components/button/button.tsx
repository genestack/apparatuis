/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {WithClasses, mergeClassesProps} from '../../utils/styles';
// import icon's css first for right styles cascading
import '../icon';
import {Typography} from '../typography';

import {ButtonContext} from './button-context';
import * as styles from './button.module.css';

type TargetProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/** Button public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** Style variant of the button */
    variant?: 'primary' | 'outlined' | 'ghost';
    /** Component that is inserted in the left side of the button. */
    icon?: React.ReactNode;
    /** If `true` text in the button is wrapped */
    wrap?: boolean;
    /** Small version of the button */
    tiny?: boolean;
    /** If `true` element has `pressed` style. */
    active?: boolean;
    /** If `true` element has `hover` style. */
    iconProps?: React.HTMLAttributes<HTMLDivElement>;
    /** Properties that is be spread to the button children container */
    contentProps?: React.HTMLAttributes<HTMLDivElement>;
}

/** Button component */
export const Button = (props: Props) => {
    return (
        <ButtonContext.Consumer>
            {(context) => {
                const {
                    variant = context.variant,
                    active,
                    icon,
                    tiny,
                    wrap,
                    disabled,
                    classes,
                    children,
                    tabIndex = 0,
                    iconProps = {},
                    contentProps = {},
                    ...rest
                } = mergeClassesProps(props, styles);

                const iconElement = icon ? (
                    <div {...iconProps} className={classNames(iconProps.className, classes.icon)}>
                        {icon}
                    </div>
                ) : null;

                const childElement = children ? (
                    <div
                        {...contentProps}
                        className={classNames(contentProps.className, classes.content, {
                            [classes.ellipsis]: !wrap
                        })}
                    >
                        {children}
                    </div>
                ) : null;

                return (
                    <Typography<TargetProps>
                        type="button"
                        {...rest}
                        as="button"
                        tabIndex={disabled ? -1 : tabIndex}
                        disabled={disabled}
                        className={classNames(rest.className, classes.root, context.className, {
                            [classes.defaultSize]: !tiny,
                            [classes.tiny]: tiny,
                            [classes.withIcon]: !!icon && !children,
                            [classes.withText]: !icon && !!children,
                            [classes.withIconAndText]: !!icon && !!children,
                            [classes.defaultVariant]: !variant,
                            [classes.primary]: variant === 'primary',
                            [classes.outlined]: variant === 'outlined',
                            [classes.ghost]: variant === 'ghost',
                            [classes.active]: active,
                            [classes.disabled]: disabled
                        })}
                    >
                        {iconElement}
                        {childElement}
                    </Typography>
                );
            }}
        </ButtonContext.Consumer>
    );
};
