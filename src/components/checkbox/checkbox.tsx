/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';
import classNames from 'classnames';
import styles from './checkbox.module.css';

export default class extends React.Component<CheckboxProps> {

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {onChange, onValueChange, name} = this.props;
        const value = event.currentTarget.checked;

        onChange && onChange(
            event,
            name
                ? {[name]: value}
                : value,
        );

        onValueChange && onValueChange(value);
    }

    render() {
        const {className = '', ref = null, value, ...props} = this.props;

        return (
            <input
                {...props}
                type="checkbox"
                ref={ref}
                className={classNames(className)}
                onChange={this.handleChange}
            />
        );
    }
};

export type CheckboxProps =
    & React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >
    & {
        onChange: (event: React.ChangeEvent<HTMLInputElement>, any) => any
        onValueChange?: OnValueChanger
        checked?: boolean
    };

type OnValueChanger = (value: boolean) => any;
