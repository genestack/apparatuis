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

import * as styles from './margin-box-full-width.module.css';

type TargetProps = React.HTMLAttributes<HTMLElement>;

/** MarginBoxFullWidth public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    dense?: boolean;
    as?: React.ReactType;
}

/**
 * Component that remove side paddings from MarginBox.
 * Should not be used directly.
 * If you want to remove margins from some container use specific
 * as `PageFullWidth`, `DialogFullWidth`, `DrawerFullWidth`, etc.
 */
export const MarginBoxFullWidth = (props: Props) => {
    const {as: Component = 'div', dense, classes, ...rest} = mergeClassesProps(props, styles);

    return (
        <Component
            {...rest}
            className={classNames(rest.className, classes.root, {
                [classes.dense]: dense
            })}
        />
    );
};
