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

export default class extends React.Component<InputProps> {

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {onChange, onValueChange, name} = this.props;
        const {value} = event.currentTarget;

        onChange && onChange(
            event,
            name
                ? {[name]: value}
                : value
        );

        onValueChange && onValueChange(value);
    }

    render() {
        const {className = '', hasError = false, ...props} = this.props;

        return (
            <input
                {...props}
                className={classNames(className, styles.input, {[styles.hasError]: hasError})}
                onChange={this.handleChange}
            />
        );
    }
}

export type InputProps =
    &   ObjectOmit<
            React.DetailedHTMLProps<
                React.InputHTMLAttributes<HTMLInputElement>,
                HTMLInputElement
            >,
            'type'
        >
    &   {
            onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: any) => any
            hasError?: boolean
            onValueChange?: OnValueChanger
        };

type OnValueChanger = (value: string) => any;
