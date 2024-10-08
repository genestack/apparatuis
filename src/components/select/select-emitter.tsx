/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';

import {ArrowBottomThinIcon} from '../../icons';
import {SlotProps} from '../../utils/slot-props';
import {ButtonBase, ButtonBaseProps} from '../button-base';

import {OptionLabel} from './option-label';
import * as styles from './select-emitter.module.css';

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
    arrowProps?: SlotProps<typeof ArrowBottomThinIcon>;
}

/** Wrapper for select */
export const SelectEmitter = React.forwardRef<HTMLElement, Props>(function EmitterRef(
    props: Props,
    ref
) {
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
            [styles.ghost]: restProps.ghost,
            [styles.invalid]: invalid,
            [styles.disabled]: restProps.disabled,
            [styles.small]: size === 'small'
        },
        className
    );

    const arrowClassName = classNames(
        styles.arrow,
        {
            [styles.small]: size === 'small'
        },
        arrowProps?.className
    );

    const buttonLabel = label ?? placeholder;
    const isInlineLabel = typeof buttonLabel === 'string' || typeof buttonLabel === 'number';

    return (
        <ButtonBase
            data-qa="select"
            {...restProps}
            ref={ref as React.RefObject<HTMLButtonElement>}
            className={controlClassName}
            intent={invalid ? 'alarm' : intent}
            component={isButton ? 'button' : 'div'}
        >
            {isInlineLabel ? <OptionLabel>{buttonLabel}</OptionLabel> : buttonLabel}

            <ArrowBottomThinIcon {...arrowProps} className={arrowClassName} />

            {children}
        </ButtonBase>
    );
});
