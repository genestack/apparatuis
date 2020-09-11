/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {Typography, TypographyProps} from '../typography';

import * as styles from './badge.module.css';

type RootProps = Omit<TypographyProps, 'classes' | 'intent'>;

/** Badge public properties */
export interface Props extends RootProps, WithClasses<keyof typeof styles> {
    /** Light badge variant with border and without background */
    ghost?: boolean;
    /** Intent of badge */
    intent?: 'default' | 'warning';
    /**
     * It `true`, removes `uppercase` text-transform and bigger letter-spacing,
     * which Badge sets by default
     */
    disableTextTransform?: boolean;
    /** Properties for content element */
    contentProps?: React.HTMLAttributes<HTMLDivElement>;
}

/**
 * Text which plays the role of an icon
 */
export const Badge = React.forwardRef((props: Props, ref) => {
    const {
        as: Component = 'div',
        variant = 'body',
        intent = 'default',
        ghost,
        children,
        classes,
        contentProps = {},
        disableTextTransform,
        ...rest
    } = mergeClassesProps(props, styles);

    return (
        <Typography
            data-qa="badge"
            {...rest}
            as={Component}
            variant={variant}
            className={classNames(rest.className, classes.root)}
            ref={ref}
        >
            <div
                className={classNames(contentProps.className, classes.content, {
                    [classes.intentDefault]: intent === 'default',
                    [classes.warning]: intent === 'warning',
                    [classes.ghost]: ghost,
                    [classes.disableTextTransform]: disableTextTransform
                })}
            >
                {children}
            </div>
        </Typography>
    );
});
