/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';
import classNames from 'classnames';
import {ObjectOmit} from 'typelevel-ts'

export default class Checkbox extends React.Component<CheckboxProps> {

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {onChange, onValueChange, name} = this.props;
        const value = event.currentTarget.checked;

        onChange && onChange(
            event,
            typeof name === 'string'
                ? {[name]: value}
                : value,
        );

        onValueChange && onValueChange(value);
    }

    render() {
        const {value, ...props} = this.props;

        return (
            <input
                {...props}
                type="checkbox"
                onChange={this.handleChange}
            />
        );
    }
};

type CheckboxProps =
    &   BaseInputProps
    &   {
            onChange?:  (
                            event: React.ChangeEvent<HTMLInputElement>, 
                            value?: any 
                        ) => any
            onValueChange?: OnValueChangeCallback<boolean>
            checked?: boolean
        };

type BaseInputProps = 
    ObjectOmit<
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >,
        'type'
    >

type OnValueChangeCallback<T> = (value: T) => any;
