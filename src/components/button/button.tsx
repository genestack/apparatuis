/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react';
import classNames from 'classnames';
import styles from './button.module.css';


export default React.forwardRef((props: ButtonProps, ref: React.RefObject<HTMLButtonElement>) => {
    const {
        kind = 'default',
        className = '',
        isDisabled,
        size = 'medium',
        ...otherProps
    } = props;
    return (
        <button
            ref={ref}
            className={classNames(className, styles.btn, styles[size], {
                [styles.btnPrimary]: kind === 'primary'
            })}
            disabled={isDisabled}
            {...otherProps}
        />
    );
});

type sizeType = 'small' | 'medium';

export type ButtonProps =
    & React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >
    & {
        kind?: 'default' | 'primary',
        size?: sizeType,
        isDisabled?: boolean
    };
