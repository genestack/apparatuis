/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './input.module.css';

export default class Input extends PureComponent<InputProps> {
    static defaultProps = {
        name: null,
        className: '',
        hasError: false,
    }

    handleChange(event) {
        const {onChange, name} = this.props
        const {value} = event.currentTarget

        onChange(event, name ? {[name]: value} : value)
    }

    render() {
        const {value, className, hasError, ...props} = this.props

        return (
            <input
                {...props}
                className={classNames(className, styles.input, {[styles.hasError]: hasError})}
                value={value}
                onChange={this.handleChange}
            />
        )
    }
}

type InputProps = {
    value: string | number
    onChange: Function
    name?: string
    className?: string
    hasError?: boolean
}
