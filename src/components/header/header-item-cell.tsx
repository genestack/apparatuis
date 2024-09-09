/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import * as styles from './header-item-cell.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** HeaderItemCell public properties */
export interface Props extends TargetProps {
    /** If `true` flex item will grow */
    grow?: boolean;
    /** If `true` flex item will shrink */
    shrink?: boolean;
}

/** Shortcut to ListItemCell */
export const HeaderItemCell = React.forwardRef<HTMLDivElement, Props>(function HeaderItemCell(
    props,
    ref
) {
    const {grow, shrink, ...rest} = props;

    return (
        <div
            data-qa="header-item-cell"
            {...rest}
            className={classNames(rest.className, styles.root, {
                [styles.grow]: grow,
                [styles.shrink]: shrink
            })}
            ref={ref}
        />
    );
});
