/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {WithClasses, mergeClassesProps} from '../../utils/styles';

import * as styles from './list-item-cell.module.css';

type TargetProps = React.HTMLAttributes<HTMLElement>;

/** ListItemCell public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    as?: React.ReactType;
}

/**
 * Single unit of list item. It is needed for harmonic look list item parts.
 */
export function ListItemCell(props: Props) {
    const {as: Component = 'div', classes, className, ...rest} = mergeClassesProps(props, styles);

    return <Component {...rest} className={classNames(className, classes.root)} />;
}
