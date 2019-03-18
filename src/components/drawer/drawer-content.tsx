/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import * as styles from './drawer-content.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** DrawerContent public properties */
export interface Props extends TargetProps {}

/** Content of Drawer that adds paddings. */
export const DrawerContent = (props: Props) => (
    <div {...props} className={classNames(props.className, styles.root)} />
);
