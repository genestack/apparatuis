/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {Omit} from '../../utils/omit';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {Typography, TypographyProps} from '../typography';

import * as styles from './badge.module.css';

type RootProps = Omit<TypographyProps, 'classes'>;

/** TextLabel public properties */
export interface Props extends RootProps, WithClasses<keyof typeof styles> {
    /** Light badge variant with border and without background */
    ghost?: boolean;
    /** Enable uppercase text with bigger letter-spacing */
    uppercase?: boolean;
    /** Properties for content element */
    contentProps?: React.HTMLAttributes<HTMLDivElement>;
}

/**
 * Text which plays the role of an icon
 */
export const Badge = (props: Props) => {
    const {
        as: Component = 'div',
        variant = 'body',
        ghost,
        children,
        classes,
        contentProps = {},
        uppercase = true,
        ...rest
    } = mergeClassesProps(props, styles);

    return (
        <Typography
            data-qa="badge"
            {...rest}
            as={Component}
            variant={variant}
            className={classNames(rest.className, classes.root)}
        >
            <div
                className={classNames(contentProps.className, classes.content, {
                    [classes.ghost]: ghost,
                    [classes.uppercase]: uppercase
                })}
            >
                {children}
            </div>
        </Typography>
    );
};
