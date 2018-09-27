import React from 'react';
import classNames from 'classnames';
import Tooltip, {TooltipProps} from './../tooltip/tooltip';
import styles from './icon-button.module.css';

export default function IconButton(props: propTypes) {
    const {
        className = '',
        isDisabled,
        tooltip = null,
        onClick,
        tabIndex = null,
        ...otherProps
    } = props;

    const button = (
        <button
            onClick={isDisabled ? null : onClick}
            className={classNames(className, styles.btn, {
                [styles.disabled]: isDisabled,
            })}
            tabIndex={isDisabled ? -1 : tabIndex}
            aria-disabled={isDisabled}
            {...otherProps}
        />
    );

    if (tooltip) {
        return (
            <Tooltip placement="top" mouseLeaveDelay={0} {...tooltip}>
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
        isDisabled?: boolean,
        tooltip?: TooltipProps
    };
