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

import * as styles from './paper.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** Paper public props */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {}

/**
 * Paper is a block with background and shadow.
 * Is used for overlay components.
 */
export function Paper(props: Props) {
    const {className, classes, ...rest} = mergeClassesProps(props, styles);

    return <div {...rest} className={classNames(className, classes.root)} />;
}
