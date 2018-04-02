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
import styles from './form.module.css';

const Form: React.SFC<any> = ({children, onSubmit, className, ...props}) =>
    <form
        className={classNames(className, styles.form)}
        onSubmit={onSubmit}
        {...props}
    >
        {children}
    </form>

type FormProps = {
    children: React.ReactNode
    onSubmit: Function
    className?: string
}

Form.defaultProps = {
    className: ''
}

export default Form
