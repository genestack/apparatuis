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

import {DarkContext} from '../../utils/dark-context';
import {mergeClassesProps, WithClasses} from '../../utils/styles';

import * as styles from './divider.module.css';

type TargetProps = React.HTMLAttributes<HTMLHRElement>;

type DividerGap = 0 | 1 | 2 | 3 | 4;

/** Public Divider properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** Style of divider */
    variant?: 'stroke' | 'dashed' | 'transparent';
    /**
     * Margins that is added before and after divider.
     *
     * 1 gap = 1 / 2 base unit
     */
    gap?: DividerGap;
    /** Overrides start gap */
    startGap?: DividerGap;
    /** Overrides end gap */
    endGap?: DividerGap;
    /** Inverses colors on dark backgrounds */
    inverted?: boolean;
}

/** A divider is a thin line that groups content in lists and layouts. */
export function Divider(props: Props) {
    return (
        <DarkContext.Consumer>
            {(darkContext) => {
                const {gap = 1} = props;

                const {
                    className,
                    variant = 'stroke',
                    gap: omittedGap,
                    startGap = gap,
                    endGap = gap,
                    classes,
                    inverted = darkContext,
                    ...rest
                } = mergeClassesProps(props, styles);

                return (
                    <hr
                        {...rest}
                        className={classNames(className, classes.root, {
                            [classes.dashed]: variant === 'dashed',
                            [classes.transparent]: variant === 'transparent',
                            [classes.startGap1]: startGap === 1,
                            [classes.startGap2]: startGap === 2,
                            [classes.startGap3]: startGap === 3,
                            [classes.startGap4]: startGap === 4,
                            [classes.endGap1]: endGap === 1,
                            [classes.endGap2]: endGap === 2,
                            [classes.endGap3]: endGap === 3,
                            [classes.endGap4]: endGap === 4,
                            [classes.inverted]: inverted
                        })}
                    />
                );
            }}
        </DarkContext.Consumer>
    );
}
