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

type TargetProps = React.HTMLAttributes<HTMLButtonElement | HTMLDivElement>;
type ButtonProps = Omit<ButtonBaseProps, 'intent'>;

/** Available emitter intent types */
export type EmitterIntent = 'no-intent' | 'accent';

interface EmitterProps {
    /** SelectWrapper label (gets from Option property) */
    label: React.ReactNode;
    /** Used to render button component or div */
    isButton?: boolean;
    /** Select placeholder */
    placeholder?: string;
    /** Intent of button */
    intent?: EmitterIntent;
    /** Size of select (default - normal) */
    size?: 'normal' | 'small';
    /** Sets `invalid` styles for select */
    invalid?: boolean;
    /** Disable button */
    disabled?: boolean;
}

/** Emitter props */
export type Props = ButtonProps & TargetProps & EmitterProps;

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

    return (
        <ButtonBase
            className={controlClassName}
            intent={invalid ? 'alarm' : intent}
            ref={ref as React.RefObject<HTMLButtonElement>}
            {...restProps}
            component={isButton ? 'button' : 'div'}
            disableFocus={!isButton}
        >
            {label || <OptionLabel>{placeholder}</OptionLabel>}
            <KeyboardArrowBottomIcon className={styles.arrow} />

            {children}
        </ButtonBase>
    );
});
