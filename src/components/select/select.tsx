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

const WITHOUT_VALUE = 'WITHOUT_VALUE';

export default class Select extends PureComponent<SelectProps> {
    public static defaultProps: Partial<SelectProps> = {
        placeholder: 'Select a value...',
        isDisabled: false,
        hasError: false,
        width: 200
    };

    state = {
        isFocused: false
    };

    handleFocus = () => this.setState({isFocused: true});
    handleBlur = () => this.setState({isFocused: false});

    handleChange = (event) => {
        // event.target.value is always a string, but option.value may be a number
        // tslint:disable-next-line: triple-equals
        const selectedOption = this.props.options.find((option) => option.value == event.target.value) || null;
        this.props.onChange(event, selectedOption);
    }

    render() {
        const {value, placeholder, isDisabled, hasError, width} = this.props;
        const options = [{value: WITHOUT_VALUE, label: placeholder}, ...this.props.options];

        return (
            <div
                className={classNames(styles.container, {
                    [styles.isFocused]: this.state.isFocused,
                    [styles.isDisabled]: isDisabled,
                    [styles.hasError]: hasError,
                    [styles.withValue]: !!value,
                    [styles.withoutValue]: !value
                })}
                style={{width}}
            >
                <select
                    className={styles.select}
                    value={value ? value.value : WITHOUT_VALUE}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    disabled={isDisabled}
                    onChange={this.handleChange}
                >
                    {options.map((option) => (
                        <option
                            value={option.value}
                            key={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

export type SelectProps = {
    options: Array<option>,
    value: option,
    placeholder?: string,
    isDisabled?: boolean,
    hasError?: boolean,
    width?: string | number,
    onChange: (event: object, value: option) => any
};

type option = {
    label: string | number,
    value: string | number,
};
