/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';

import {Omit} from '../../utils/omit';

import styles from './input.module.css';

type TargetProps = React.InputHTMLAttributes<HTMLInputElement>;

type OnValueChanger = (value: string | null | undefined) => any;

/** Input public properties */
export interface Props extends Omit<TargetProps, 'onChange'> {
    onChange?(event: React.ChangeEvent<HTMLInputElement>, value: any): void;
    hasError?: boolean;
    onValueChange?: OnValueChanger;
    targetRef?: React.Ref<HTMLInputElement>;
}

/** Input wrapper */
export const Input = (props: Props) => {
    const {
        className = '',
        hasError = false,
        onChange,
        onValueChange,
        name,
        targetRef,
        ...restProps
    } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;

        if (onChange) {
            onChange(event, name ? {[name]: value} : value);
        }

        if (onValueChange) {
            onValueChange(value);
        }
    };

    return (
        <input
            {...restProps}
            ref={targetRef}
            name={name}
            className={classNames(className, styles.input, {[styles.hasError]: hasError})}
            onChange={handleChange}
        />
    );
};
