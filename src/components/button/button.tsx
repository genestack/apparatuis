/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react';
import classNames from 'classnames';
import Tooltip from './../tooltip/tooltip';
import styles from './button.module.css';
import primaryStyles from './button-primary.module.css';
import defaultStyles from './button-default.module.css';

export default React.forwardRef((props: ButtonProps, ref: React.RefObject<HTMLButtonElement>) => {
    const {
        kind = 'default',
        className = '',
        isDisabled,
        size = 'medium',
        tooltip = null,
        tooltipPlacement = 'top',
        onClick,
        ...otherProps
    } = props;

    const button =
        <button
            onClick={isDisabled ? null : onClick}
            ref={ref}
            className={classNames(className, styles.btn, styles[size], {
                [styles.disabled]: isDisabled,
                [primaryStyles.disabled]: isDisabled,
                [defaultStyles.disabled]: isDisabled,
                [primaryStyles.btnPrimary]: kind === 'primary',
                [defaultStyles.btnDefault]: kind === 'default'
            })}
            tabIndex={isDisabled ? -1 : null}
            {...otherProps}
        />
    ;

    if (tooltip) {
        return (
            <Tooltip overlay={tooltip} placement={tooltipPlacement} mouseLeaveDelay={0}>
                {button}
            </Tooltip>
        );
    }
    return button;
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
        isDisabled?: boolean,
        tooltip?: string,
        tooltipPlacement?: string
    };
