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

import * as styles from './controls.module.css';

type TargetProps = React.HTMLAttributes<HTMLElement>;

/** Controls public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /**
     * Defines size of gaps between items.
     * Only containers accepts this property.
     */
    gap?: 0 | 1 | 2 | 6 | 8;
    /**
     * Defines items justifying.
     * Only containers accepts this property.
     */
    justify?: 'start' | 'end' | 'center' | 'space-between';
    /** If `true` element is controls item */
    item?: boolean;
    /** Makes controls item to shrink */
    shrink?: boolean;
    /** Makes controls item to grow */
    grow?: boolean;
    /** Redefines the target element */
    as?: React.ReactType;
}

/**
 * Controls component is used for layout groups of controls.
 * Every sibling controls item has left and right margins
 * that are defined by `gap` property of controls container.
 *
 * By default Controls is container of items.
 * Pass `item` property to make controls be a item.
 */
export const Controls = (props: Props) => {
    const {
        as: Component = 'div',
        item,
        gap = 2,
        justify = 'start',
        shrink,
        grow,
        classes,
        ...rest
    } = mergeClassesProps(props, styles);

    return (
        <Component
            {...rest}
            className={classNames(rest.className, {
                [classes.container]: !item,
                [classes.item]: item,
                [classes.gap1]: !item && gap === 1,
                [classes.gap2]: !item && gap === 2,
                [classes.gap6]: !item && gap === 6,
                [classes.gap8]: !item && gap === 8,
                [classes.shrink]: shrink,
                [classes.grow]: grow,
                [classes.justifyCenter]: justify === 'center',
                [classes.justifyEnd]: justify === 'end',
                [classes.justifyStart]: justify === 'start',
                [classes.justifySpaceBetween]: justify === 'space-between'
            })}
        />
    );
};
