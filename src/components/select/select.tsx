/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React, {PureComponent} from 'react';
import classNames from 'classnames';
import styles from './select.module.css';


const emptyValue = '';

export default class Select extends PureComponent<SelectProps> {
    static defaultProps: Partial<SelectProps> = {
        placeholder: 'Select a value...',
        hasError: false
    };

    handleChange = (event) => {
        const {onChange, onValueChange, options} = this.props;
        const option = options[parseInt(event.target.value, 10)];

        if (onChange) {
            // original event has option index as its value,
            // however in standard event it would be a stringified option.value
            const eventValue = option ? String(option.value) : emptyValue;
            onChange({
                ...event,
                target: {
                    ...event.target,
                    value: eventValue
                }
            });
        }

        if (onValueChange) {
            const value = option ?
                option.value :
                emptyValue;
            onValueChange(value);
        }
    }

    render() {
        // "onChange" and "onValueChange" extracted here
        // just to not allow them to be in the "rest" variable.
        // "rest" is used to pass props down to native select-element
        const {
            value,
            placeholder,
            hasError,
            required,
            className,
            options,
            onChange, onValueChange, ...rest
        } = this.props;

        const isEmptyValue =
            value === emptyValue ||
            value === undefined ||
            value === null;

        const selectHasError = hasError || (required && isEmptyValue);

        const selectValue = isEmptyValue ?
            emptyValue :
            options.findIndex((option) => option.value === value);

        const selectClassName = classNames(
            className,
            styles.select,
            {
                [styles.emptyValue]: isEmptyValue,
                [styles.hasError]: selectHasError
            }
        );

        return (
            <select
                className={selectClassName}
                value={selectValue}
                onChange={this.handleChange}
                required={required}
                {...rest}
            >
                {required && !isEmptyValue ?
                    null :
                    <option value={emptyValue}>
                        {placeholder}
                    </option>}
                {options.map((option, index) => {
                    // we use index as a value to be able to use actual option.value in "onValueChage"
                    // (not its stringified copy)
                    return (
                        <option
                            value={index}
                            key={option.value}
                        >
                            {option.label}
                        </option>
                    );
                })}
            </select>
        );
    }
}

export type SelectProps =
    & React.DetailedHTMLProps<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
    >
    & {
        options: Array<option>,
        value: any,
        placeholder?: string,
        hasError?: boolean,
        onValueChange: (value: any) => any
    };

type option = {
    value: any,
    label: string
};
