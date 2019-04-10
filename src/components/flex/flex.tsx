/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-magic-numbers
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
    /** Makes element to shrink */
    shrink?: boolean;
    /** Makes element to grow */
    grow?: boolean;
    gap?: 0 | 1 | 2 | 3 | 4;
    /** Makes item to overflow its content with ellipsis */
    ellipsis?: boolean;
}

/**
 * Internal helper component to build flex layouts.
 */
export const Flex = (props: Props) => {
    const {
        container,
        shrink,
        grow,
        gap = 2,
        ellipsis,
        children,
        baseline,
        className,
        classes,
        ...rest
    } = mergeClassesProps(props, styles);

    const child = React.Children.only(children) as React.ReactElement<{className?: string}>;

    return React.cloneElement(child, {
        ...rest,
        className: classNames(className, child.props.className, classes.root, {
            [classes.container]: container,
            [classes.baseline]: baseline,
            [classes.shrink]: shrink,
            [classes.grow]: grow,
            [classes.gap1]: gap === 1,
            [classes.gap2]: gap === 2,
            [classes.gap3]: gap === 3,
            [classes.gap4]: gap === 4,
            [classes.ellipsis]: ellipsis
        })
    });
};
