/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './button.css';

export default function Button(props) {
    const {type, kind, children, className, isDisabled, onClick, ...otherProps} = props;

    return (
        <button
            type={type}
            className={classNames(className, styles.btn, {
                [styles.btnPrimary]: kind === 'primary'
            })}
            onClick={onClick}
            disabled={isDisabled}
            {...otherProps}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    kind: PropTypes.oneOf(['default', 'primary']),
    type: PropTypes.oneOf(['button', 'submit']),
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    value: PropTypes.any
};

Button.defaultProps = {
    kind: 'default',
    type: 'button',
    className: '',
    isDisabled: false,
    value: null,
    onClick: null
};
