/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import React from 'react';

import {TooltipProps, Tooltip} from '../tooltip';

import defaultStyles from './button-default.module.css';
import primaryStyles from './button-primary.module.css';
import styles from './button.module.css';

type TargetProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/** Button public properties */
export interface Props extends TargetProps {
    kind?: 'default' | 'primary';
    size?: 'small' | 'medium';
    tooltipProps?: TooltipProps;
}

/** Button */
export const Button = (props: Props) => {
    const {
        kind = 'default',
        className = '',
        disabled,
        size = 'medium',
        tooltipProps = null,
        onClick,
        ...otherProps
    } = props;

    const button = (
        <button
            onClick={disabled ? undefined : onClick}
            className={classNames(className, styles.btn, styles[size], {
                [styles.disabled]: disabled,
                [primaryStyles.disabled]: disabled,
                [defaultStyles.disabled]: disabled,
                [primaryStyles.btnPrimary]: kind === 'primary',
                [defaultStyles.btnDefault]: kind === 'default'
            })}
            tabIndex={disabled ? -1 : undefined}
            aria-disabled={disabled}
            {...otherProps}
        />
    );

    if (tooltipProps) {
        return (
            <Tooltip placement="top" mouseLeaveDelay={0} {...tooltipProps}>
                {button}
            </Tooltip>
        );
    }

    return button;
};
