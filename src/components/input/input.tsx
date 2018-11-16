/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';
import classNames from 'classnames';
import styles from './input.module.css';
import {ObjectOmit} from 'typelevel-ts';

export default React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        className = '',
        hasError = false,
        onChange,
        onValueChange,
        name,
        ...restProps
    } = props;

    return (
        <input
            ref={ref}
            {...restProps}
            name={name}
            className={classNames(className, styles.input, {[styles.hasError]: hasError})}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const {value} = event.currentTarget;

                onChange && onChange(
                    event,
                    name
                        ? {[name]: value}
                        : value
                );

                onValueChange && onValueChange(value);
            }}
        />
    );
});


export interface InputProps extends ObjectOmit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: any) => void,
    hasError?: boolean,
    onValueChange?: OnValueChanger
}

type OnValueChanger = (value: string) => any;
