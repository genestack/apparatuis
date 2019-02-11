/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import React from 'react';

import styles from './button.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** Buttons Group public properties */
export interface Props extends TargetProps {}

/** Buttons Group */
export const ButtonsGroup = (props: Props) => (
    <div {...props} className={classNames(styles.btnGroup, props.className)} />
);
