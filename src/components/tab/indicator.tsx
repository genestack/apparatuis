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

/** Indicator placement */
export type IndicatorPlacement = 'top' | 'bottom' | 'left' | 'right';

/** Indicator props */
export interface Props {
    /** Adds styles for active state */
    active?: boolean;
    /** Adds styles for full width state */
    fullWidth?: boolean;
    /** Indicator placement */
    placement?: IndicatorPlacement;
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
        placement,
        fullWidth,
        active,
        ...restProps
    } = mergeClassesProps(props, styles);

    return (
        <Component
            className={classNames(
                classes.root,
                {
                    [classes.active]: active,
                    [classes.fullWidth]: fullWidth,
                    [classes.bottom]: placement === 'bottom',
                    [classes.top]: placement === 'top',
                    [classes.left]: placement === 'left',
                    [classes.right]: placement === 'right'
                },
                className
            )}
            {...restProps}
            ref={ref}
        />
    );
});
