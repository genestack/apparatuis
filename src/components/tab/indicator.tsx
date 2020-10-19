/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import React from 'react';

import {OverridableComponent, OverridableProps, mergeClassesProps} from '../../utils';

import * as styles from './indicator.module.css';

/** Indicator position */
export type IndicatorPosition = 'top' | 'bottom' | 'left' | 'right';

/** Indicator props */
export interface Props {
    /** Adds styles for selected state */
    selected?: boolean;
    /** Adds styles for full width state */
    fullWidth?: boolean;
    /** Indicator position */
    position?: IndicatorPosition;
}

interface TypeMap {
    props: Props;
    defaultType: 'span';
}

/** Indicator component */
export const Indicator: OverridableComponent<TypeMap> = React.forwardRef<
    HTMLSpanElement,
    OverridableProps<TypeMap>
>(function IndicatorComponent(props, ref) {
    const {
        className,
        classes,
        component: Component = 'span',
        position,
        fullWidth,
        selected,
        ...restProps
    } = mergeClassesProps(props, styles);

    return (
        <Component
            className={classNames(
                classes.root,
                {
                    [classes.selected]: selected,
                    [classes.fullWidth]: fullWidth,
                    [classes.bottom]: position === 'bottom',
                    [classes.top]: position === 'top',
                    [classes.left]: position === 'left',
                    [classes.right]: position === 'right'
                },
                className
            )}
            {...restProps}
            ref={ref}
        />
    );
});
