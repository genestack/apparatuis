/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import React from 'react';

import styles from './form.module.css';

type TargetProps = React.FormHTMLAttributes<HTMLFormElement>;

/** Form public properties */
export interface Props extends TargetProps {}

/** Form CSS wrapper */
export const Form = (props: Props) => (
    <form {...props} className={classNames(props.className, styles.form)} />
);
