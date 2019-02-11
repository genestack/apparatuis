/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import React from 'react';

import {Tooltip, TooltipProps} from '../tooltip';

import styles from './icon-button.module.css';

type TargetProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/** IconButton public properties */
export interface Props extends TargetProps {
    tooltipProps?: TooltipProps;
}

/** Icon Button */
export function IconButton(props: Props) {
    const {className = '', disabled, tooltipProps = null, onClick, ...otherProps} = props;

    const button = (
        <button
            onClick={disabled ? undefined : onClick}
            className={classNames(className, styles.btn, {
                [styles.disabled]: disabled
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
}
