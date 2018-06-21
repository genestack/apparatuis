/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react';
import classNames from 'classnames';
import {ObjectOmit} from 'typelevel-ts';
import CheckboxIcon from './checkboxIcon';
import styles from './checkbox.module.css';

export default class Checkbox extends React.Component<CheckboxProps> {
    static defaultProps: Partial<CheckboxProps> = {
        name: null,
        className: '',
        isDisabled: false
    };

    handleChange = (event) => {
        const {onChange, onValueChange, name, isChecked} = this.props;

        onChange && onChange(
            event,
            typeof name === 'string'
                ? {[name]: !isChecked}
                : !isChecked,
        );

        onValueChange && onValueChange(!isChecked);
    }

    render() {
        const {isChecked, isDisabled, children, onChange, onValueChange, name, ...props} = this.props;

        return (
            <label
                {...props}
                className={classNames(styles.container, props.className, {[styles.containerDisabled]: isDisabled})}
            >
                <input
                    type="checkbox"
                    className={styles.input}
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={this.handleChange}
                />
                <div
                    className={classNames(styles.iconBorder, {
                        [styles.iconBorderDisabled]: isDisabled,
                        [styles.iconBorderChecked]: isChecked
                    })}
                >
                    {isChecked && (
                        <CheckboxIcon isDisabled={isDisabled} />
                    )}
                </div>
                {children && (
                    <div className={styles.text}>{children}</div>
                )}
            </label>
        );
    }
}

type BaseCheckboxProps =
    ObjectOmit<
        React.HTMLAttributes<HTMLLabelElement>,
        'onChange'
    >;

type CheckboxProps = BaseCheckboxProps & {
    onChange?: (
                    event: object,
                    value?: any
                ) => void,
    onValueChange?: OnValueChangeCallback<boolean>,
    name?: string,
    isChecked: boolean,
    isDisabled?: boolean,
    className?: string
};

type OnValueChangeCallback<T> = (value: T) => any;
