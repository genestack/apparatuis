/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react';
import classNames from 'classnames';
import Tooltip, {TooltipProps} from './../tooltip/tooltip';
import styles from './button.module.css';
import primaryStyles from './button-primary.module.css';
import defaultStyles from './button-default.module.css';

export default React.forwardRef((props: ButtonProps, ref: React.RefObject<HTMLButtonElement>) => {
    const {
        kind = 'default',
        className = '',
        disabled,
        size = 'medium',
        tooltipProps = null,
        onClick,
        ...otherProps
    } = props;

    const button =
        <button
            onClick={disabled ? null : onClick}
            ref={ref}
            className={classNames(className, styles.btn, styles[size], {
                [styles.disabled]: disabled,
                [primaryStyles.disabled]: disabled,
                [defaultStyles.disabled]: disabled,
                [primaryStyles.btnPrimary]: kind === 'primary',
                [defaultStyles.btnDefault]: kind === 'default'
            })}
            tabIndex={disabled ? -1 : null}
            aria-disabled={disabled}
            {...otherProps}
        />
    ;

    if (tooltipProps) {
        return (
            <Tooltip placement="top" mouseLeaveDelay={0} {...tooltipProps}>
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
        tooltipProps?: TooltipProps
    };
