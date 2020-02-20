/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import * as styles from './header-item-cell.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** HeaderItemCell public properties */
export interface Props extends TargetProps {}

/** Shortcut to ListItemCell */
export const HeaderItemCell = (props: Props) => (
    <div
        data-qa="header-item-cell"
        {...props}
        className={classNames(props.className, styles.root)}
    />
);
