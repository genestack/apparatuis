/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './input.module.css'
import {lensPath} from 'ramda'

export default ({className = '', hasError = false, ...props}: InputProps) =>
    <input
        {...props}
        className={classNames(className, styles.input, {[styles.hasError]: hasError})}
        onChange={handleChange(props)}
    />

const handleChange = ({onChange, name}: InputProps) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
        onChange(
            event,
            name
                ? {[name]: valueLens(event)}
                : valueLens(event),
        )

const valueLens = lensPath(['currentTarget', 'value'])

export type InputProps =
    & React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >
    & {
        onChange: (event: React.ChangeEvent<HTMLInputElement>, any) => any
        hasError?: boolean
    }
