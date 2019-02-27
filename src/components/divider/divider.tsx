/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {mergeClassesProps, WithClasses} from '../../utils/styles';

import * as styles from './divider.module.css';

type TargetProps = React.HTMLAttributes<HTMLHRElement>;

/** Public Divider properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    dashed?: boolean;
}

/** A divider is a thin line that groups content in lists and layouts. */
export function Divider(props: Props) {
    const {className, dashed, classes, ...rest} = mergeClassesProps(props, styles);

    return (
        <hr
            {...rest}
            className={classNames(className, classes.root, {
                [classes.dashed]: dashed
            })}
        />
    );
}
