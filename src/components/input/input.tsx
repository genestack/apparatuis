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

export default class extends React.Component<InputProps> {
    render () {
        const {className = '', hasError = false, ref = null, ...props} = this.props;
        
        return (
            <input
                {...props}
                ref={ref}
                className={classNames(className, styles.input, {[styles.hasError]: hasError})}
                onChange={handleChange(props)}
            />
        );
    }
};

const handleChange = ({onChange, name}: InputProps) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
        onChange &&
        onChange(
            event,
            name
                ? {[name]: valueLens(event)}
                : valueLens(event),
        );

const valueLens = event =>
    event.currentTarget.value;

export type InputProps =
    & React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >
    & {
        onChange: (event: React.ChangeEvent<HTMLInputElement>, any) => any
        hasError?: boolean
    };
