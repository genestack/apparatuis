/*
 * Copyright (c) 2011-2019 Genestack Limited
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

import * as styles from './text-label.module.css';

type RootProps = Omit<TypographyProps, 'classes' | 'ellipsis'>;

/** TextLabel public properties */
export interface Props extends RootProps, WithClasses<keyof typeof styles> {
    /** Node that is added after children */
    caption?: React.ReactNode;
    /** Disables ellipsis */
    wrap?: boolean;
    /** Makes label to grow */
    grow?: boolean;
    /** Properties for children wrapper */
    labelProps?: React.HTMLAttributes<HTMLDivElement>;
    /** Properties for caption wrapper */
    captionProps?: TypographyProps;
}

type TypographyVariant = Exclude<TypographyProps['variant'], undefined>;

const captionVariantsMap: Partial<Record<TypographyVariant, TypographyVariant>> = {
    header: 'title',
    title: 'body'
};

/**
 * Shortcut to pair some text with small caption.
 *
 * It takes in account text overflowing. Caption is never overflowed.
 */
export const TextLabel = (props: Props) => {
    const {
        caption,
        variant = 'body',
        wrap,
        labelProps = {},
        captionProps = {},
        children,
        classes,
        box,
        grow,
        ...rest
    } = mergeClassesProps(props, styles);

    const captionVariant = captionVariantsMap[variant] || 'caption';

    return (
        <Typography
            {...rest}
            variant={variant}
            box={box}
            className={classNames(rest.className, classes.root, {
                [classes.inline]: box === 'inline'
            })}
        >
            <div
                {...labelProps}
                className={classNames(labelProps.className, classes.label, {
                    [classes.wrap]: wrap,
                    [classes.wrap]: grow
                })}
            >
                {children}
            </div>

            {caption ? (
                <Typography
                    as="span"
                    variant={captionVariant}
                    quiet
                    {...captionProps}
                    className={classNames(captionProps.className, classes.caption)}
                >
                    {caption}
                </Typography>
            ) : null}
        </Typography>
    );
};