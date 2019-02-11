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

import {CheckboxIcon} from './checkbox-icon';
import styles from './checkbox.module.css';

type TargetProps = React.InputHTMLAttributes<HTMLInputElement>;

/** Checkbox public properties */
export interface Props extends Omit<TargetProps, 'type'> {
    onValueChange?: OnValueChangeCallback<boolean>;
    className?: string;
}

type OnValueChangeCallback<T> = (value: T) => any;

/** Checkbox */
export class Checkbox extends React.Component<Props> {
    private handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const {onChange, onValueChange} = this.props;
        if (onChange) {
            onChange(event);
        }
        if (onValueChange) {
            onValueChange(event.target.checked);
        }
    };

    public render() {
        const {
            className,
            children, // extract as React-specific properties
            checked,
            disabled, // valid HTML attributes, but should be extracted to construct a className
            onChange,
            onValueChange, // because of "handleChange" method

            // "restProps" is used to pass props down to native input-element
            ...restProps
        } = this.props;

        const labelClassName = classNames(styles.container, className, {
            [styles.containerDisabled]: disabled
        });

        return (
            <label className={labelClassName}>
                <input
                    className={styles.input}
                    checked={checked}
                    disabled={disabled}
                    onChange={this.handleChange}
                    {...restProps}
                    type="checkbox"
                />
                <span
                    className={classNames(styles.iconBorder, {
                        [styles.iconBorderDisabled]: disabled,
                        [styles.iconBorderChecked]: checked
                    })}
                >
                    {checked && <CheckboxIcon disabled={disabled} />}
                </span>
                {children && <span className={styles.text}>{children}</span>}
            </label>
        );
    }
}
