/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import * as styles from './controls-item.module.css';

type TargetProps = React.HTMLAttributes<HTMLElement>;

/** ControlsItem public properties */
export interface Props extends TargetProps {
    /** Makes controls item to shrink */
    shrink?: boolean;
    /** Makes controls item to grow */
    grow?: boolean;
    /** Redefines the target element */
    as?: React.ElementType;
}

/** Single item of controls container */
export const ControlsItem = (props: Props) => {
    const {as: Component = 'div', shrink, grow, ...rest} = props;

    return (
        <Component
            {...rest}
            className={classNames(rest.className, styles.root, {
                [styles.shrink]: shrink,
                [styles.grow]: grow
            })}
        />
    );
};
