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


export default React.forwardRef((props: InputProps, ref: React.RefObject<HTMLInputElement>) => {
    const {
        className = '',
        hasError = false,
        ...restProps
    } = props;
    const {
        onChange,
        onValueChange,
        name
    } = props;

    return (
        <input
            ref={ref}
            {...restProps}
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


export type InputProps =
    &   ObjectOmit<
            React.DetailedHTMLProps<
                React.InputHTMLAttributes<HTMLInputElement>,
                HTMLInputElement
            >,
            'type'
        >
    &   {
            onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: any) => any,
            hasError?: boolean,
            onValueChange?: OnValueChanger
        };

type OnValueChanger = (value: string) => any;
