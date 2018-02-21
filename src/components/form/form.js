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
import styles from './form.css';

export default function Form({children, onSubmit, className, ...props}) {
    return (
        <form
            className={classNames(className, styles.form)}
            onSubmit={onSubmit}
            {...props}
        >
            {children}
        </form>
    );
}

Form.propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
    className: PropTypes.string
};

Form.defaultProps = {
    className: ''
};
