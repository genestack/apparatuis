/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';

import {KeyboardArrowBottomIcon} from '../../icons';
import {ButtonBase, ButtonBaseProps} from '../button-base';

import * as styles from './emitter.module.css';
import {OptionLabel} from './option-label';

type TargetProps = Omit<
    React.HTMLAttributes<HTMLButtonElement | HTMLDivElement>,
    'onClick' | 'placeholder'
>;
type ButtonProps = Omit<ButtonBaseProps, 'intent'>;

/** Available emitter intent types */
export type EmitterIntent = 'no-intent' | 'accent';

/** Emitter props */
export interface Props extends TargetProps, ButtonProps {
    /** SelectWrapper label (gets from Option property) */
    label?: React.ReactNode;
    /** Used to render button component or div */
    isButton?: boolean;
    /** Select placeholder */
    placeholder?: React.ReactNode;
    /** Intent of button */
    intent?: EmitterIntent;
    /** Size of select (default - normal) */
    size?: 'normal' | 'small';
    /** Sets `invalid` styles for select */
    invalid?: boolean;
    /** Disable button */
    disabled?: boolean;
    arrowProps?: React.ComponentPropsWithRef<typeof KeyboardArrowBottomIcon>;
}

/** Wrapper for select */
export const Emitter = React.forwardRef<HTMLElement, Props>(function EmitterRef(props: Props, ref) {
    const {
        className,
        label,
        isButton,
        placeholder,
        intent,
        size,
        invalid,
        children,
        arrowProps,
        ...restProps
    } = props;

    const controlClassName = classNames(
        styles.root,
        {
            [styles.accent]: intent === 'accent',
            [styles.invalid]: invalid,
            [styles.small]: size === 'small'
        },
        className
    );

    const buttonLabel = label ?? placeholder;
    // tslint:disable-next-line:strict-type-predicates
    const isInlineLabel = typeof buttonLabel === 'string' || typeof buttonLabel === 'number';

    return (
        <ButtonBase
            {...restProps}
            ref={ref as React.RefObject<HTMLButtonElement>}
            className={controlClassName}
            intent={invalid ? 'alarm' : intent}
            component={isButton ? 'button' : 'div'}
        >
            {isInlineLabel ? <OptionLabel>{buttonLabel}</OptionLabel> : buttonLabel}

            <KeyboardArrowBottomIcon
                {...arrowProps}
                className={classNames(styles.arrow, arrowProps?.className)}
            />

            {children}
        </ButtonBase>
    );
});
