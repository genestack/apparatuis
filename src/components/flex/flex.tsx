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

import * as styles from './flex.module.css';

/** Flex public properties */
export interface Props extends WithClasses<keyof typeof styles> {
    /** Element that will be cloned */
    children: React.ReactElement<{className?: string}>;
    /** Makes element flex display */
    container?: boolean;
    /** Makes items baseline aligned */
    baseline?: boolean;
    /** Makes element flex item */
    cell?: boolean;
    /** Makes element to shrink */
    shrink?: boolean;
    /** Makes element to grow */
    grow?: boolean;
    /** Removes default flex item left margin */
    noGap?: boolean;
    /** Makes item to overflow its content with ellipsis */
    ellipsis?: boolean;
}

/**
 * Internal helper component to build flex layouts.
 */
export const Flex = (props: Props) => {
    const {
        container,
        cell,
        shrink,
        grow,
        noGap,
        ellipsis,
        children,
        baseline,
        className,
        classes
    } = mergeClassesProps(props, styles);

    const child = React.Children.only(children) as React.ReactElement<{className?: string}>;

    return React.cloneElement(child, {
        className: classNames(className, child.props.className, classes.root, {
            [classes.container]: container,
            [classes.baseline]: baseline,
            [classes.cell]: cell,
            [classes.shrink]: shrink,
            [classes.grow]: grow,
            [classes.gap]: cell && !noGap,
            [classes.ellipsis]: ellipsis
        })
    });
};
