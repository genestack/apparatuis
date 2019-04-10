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
import {Divider, DividerProps} from '../divider';

import * as styles from './margin-box.module.css';

const DEFAULT_DIVIDER_GAP = 4;

type TargetProps = React.HTMLAttributes<HTMLElement>;

/** MarginBox public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    dense?: boolean;
    as?: React.ReactType<{className?: string}>;
    startDividerProps?: DividerProps;
    endDividerProps?: DividerProps;
    noStartDivider?: boolean;
    noEndDivider?: boolean;
}

/**
 * Component that adds common margins and paddings to container.
 * Should not be used directly.
 * If you want to add margins to some container use specific
 * as `PageContent`, `DialogBody`, etc.
 */
export const MarginBox = (props: Props) => {
    const {
        as: Component = 'div',
        dense,
        children,
        startDividerProps = {},
        noStartDivider,
        endDividerProps = {},
        noEndDivider,
        classes,
        ...rest
    } = mergeClassesProps(props, styles);

    return (
        <Component
            {...rest}
            className={classNames(rest.className, classes.root, {
                [classes.dense]: dense
            })}
        >
            {!noStartDivider ? (
                <Divider
                    variant="transparent"
                    startGap={0}
                    endGap={DEFAULT_DIVIDER_GAP}
                    {...startDividerProps}
                    className={classNames(startDividerProps.className, classes.divider, {
                        [classes.denseDivider]: dense
                    })}
                />
            ) : null}
            {children}
            {!noEndDivider ? (
                <Divider
                    variant="transparent"
                    startGap={DEFAULT_DIVIDER_GAP}
                    endGap={0}
                    {...endDividerProps}
                    className={classNames(endDividerProps.className, classes.divider, {
                        [classes.denseDivider]: dense
                    })}
                />
            ) : null}
        </Component>
    );
};