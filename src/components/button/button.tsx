/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react'
import classNames from 'classnames'
import styles from './button.module.css'

export default ({kind = 'default', className = '', isDisabled, ...otherProps}: ButtonProps) =>
        <button
            className={classNames(className, styles.btn, {
                [styles.btnPrimary]: kind === 'primary',
            })}
            disabled={isDisabled}
            {...otherProps}
        />

export type ButtonProps =
    & React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >
    & {
        kind?: 'default' | 'primary'
        isDisabled?: boolean
    }
