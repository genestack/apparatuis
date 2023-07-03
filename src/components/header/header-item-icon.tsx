/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import * as styles from './header-item-icon.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** HeaderItemIcon public properties */
export interface Props extends TargetProps {
    className?: string;
}

/**
 * Icon that could be placed in header item or button.
 * It has different margins from header item cell or text.
 */
export const HeaderItemIcon = (props: Props) => (
    <div
        data-qa="header-item-icon"
        {...props}
        className={classNames(props.className, styles.root)}
    />
);
