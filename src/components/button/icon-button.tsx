import React from 'react';
import classNames from 'classnames';
import Tooltip, {TooltipProps} from './../tooltip/tooltip';
import styles from './icon-button.module.css';

export default function IconButton(props: propTypes) {
    const {
        className = '',
        disabled,
        tooltipProps = null,
        onClick,
        ...otherProps
    } = props;

    const button = (
        <button
            onClick={disabled ? null : onClick}
            className={classNames(className, styles.btn, {
                [styles.disabled]: disabled,
            })}
            tabIndex={disabled ? -1 : null}
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

type propTypes =
    & React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >
    & {
        tooltipProps?: TooltipProps
    };
