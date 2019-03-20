/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import * as styles from './icon-button.module.css';

type TargetProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/** IconButton public properties */
export interface Props extends TargetProps {}

/**
 * Button that could contains only icons.
 * It just adds only styles for svg elements.
 */
export const IconButton = (props: Props) => (
    <button type="button" {...props} className={classNames(props.className, styles.root)} />
);
