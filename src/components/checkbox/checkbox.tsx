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
        const {isChecked, isDisabled, children, ...props} = this.props;

        if (!children) {
            return (
                <div {...props} onClick={this.handleChange}>
                    <CheckboxIcon isChecked={isChecked} isDisabled={isDisabled} />
                </div>
            );
        }

        return (
            <label {...props} className={classNames(styles.container, props.className)} onClick={this.handleChange}>
                <CheckboxIcon
                    isChecked={isChecked}
                    isDisabled={isDisabled}
                />
                <span className={styles.text}>{children}</span>
            </label>
        );
    }
}

type CheckboxProps = {
    onChange?: (
                    event: object,
                    value?: any
                ) => void,
    onValueChange?: OnValueChangeCallback<boolean>,
    name?: string,
    isChecked: boolean,
    isDisabled?: boolean,
    className?: string,
    chidren: any
};

type OnValueChangeCallback<T> = (value: T) => any;
