/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import * as styles from './controls.module.css';

type TargetProps = React.HTMLAttributes<HTMLElement>;

/** Controls public properties */
export interface Props extends TargetProps {
    /** Defines size of gaps between items */
    gap?: 0 | 1 | 2 | 4 | 8;
    /** Defines items justifying */
    justify?: 'start' | 'end' | 'center' | 'space-between';
    /** Redefines the target element */
    as?: React.ElementType;
    /** Vertical align */
    align?: 'center' | 'baseline';
    /** Flex wrap */
    flexWrap?: 'wrap' | 'nowrap';
}

/**
 * Controls component is used for layout groups of controls.
 * Every sibling controls item has left and right margins
 * that are defined by `gap` property of controls container.
 */
export const Controls = (props: Props) => {
    const {
        as: Component = 'div',
        gap = 2,
        justify = 'start',
        align = 'center',
        flexWrap = 'nowrap',
        ...rest
    } = props;

    return (
        <Component
            data-qa="controls"
            {...rest}
            className={classNames(rest.className, styles.container, {
                [styles.gap1]: gap === 1,
                [styles.gap2]: gap === 2,
                [styles.gap4]: gap === 4,
                [styles.gap8]: gap === 8,
                [styles.justifyCenter]: justify === 'center',
                [styles.justifyEnd]: justify === 'end',
                [styles.justifyStart]: justify === 'start',
                [styles.justifySpaceBetween]: justify === 'space-between',
                [styles.alignCenter]: align === 'center',
                [styles.alignBaseline]: align === 'baseline',
                [styles.noWrap]: flexWrap === 'nowrap',
                [styles.wrap]: flexWrap === 'wrap'
            })}
        />
    );
};
