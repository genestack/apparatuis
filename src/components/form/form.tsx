/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react';
import classNames from 'classnames';
import styles from './form.module.css';

export default (props: React.SFC<FormProps>) =>
    <form {...addClass(props)} />;

const addClass = ({className = '', ...rest}) => ({
    ...rest,
    className: classNames(className, styles.form),
});

export type FormProps =
    React.DetailedHTMLProps<
        React.FormHTMLAttributes<HTMLFormElement>,
        HTMLFormElement
    >;
