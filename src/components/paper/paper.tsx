/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {DarkContext} from '../../utils/dark-context';

import * as styles from './paper.module.css';

type TargetProps = React.HTMLAttributes<HTMLElement>;

/** Paper public props */
export interface Props extends TargetProps {
    /** You could redefine the target component by passing ReactType */
    as?: React.ElementType;
    /**
     * Changes own background to dark. Will fallback to `DarkContext`'s value if `undefined`.
     *
     * Default: `"false"`
     */
    inverted?: boolean;
    className?: string;
}

/**
 * Paper is a block with background and shadow.
 * Is used for overlay components.
 */
export const Paper = React.forwardRef<HTMLElement, Props>(function Paper(props, ref) {
    const {
        as: Component = 'div',
        className,
        inverted = React.useContext(DarkContext),
        ...rest
    } = props;

    return (
        <Component
            data-qa="paper"
            {...rest}
            ref={ref}
            className={classNames(className, styles.root, {[styles.inverted]: inverted})}
        />
    );
});
