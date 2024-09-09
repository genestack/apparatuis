/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {shouldRenderNode} from '../../utils/should-render-node';
import {SlotProps} from '../../utils/slot-props';
import {mergeClassesProps, WithClasses} from '../../utils/styles';
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
    labelProps?: SlotProps<'span'>;
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
export const TextLabel = React.forwardRef<HTMLElement, Props>(function TextLabel(props, ref) {
    const {
        caption,
        as: Component = 'div',
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
            data-qa="text-label"
            {...rest}
            as={Component}
            variant={variant}
            box={box}
            className={classNames(rest.className, classes.root, {
                [classes.inline]: box === 'inline'
            })}
            ref={ref}
        >
            <span
                {...labelProps}
                className={classNames(labelProps.className, classes.label, {
                    [classes.wrap]: wrap,
                    [classes.grow]: grow
                })}
            >
                {children}
            </span>

            {shouldRenderNode(caption) ? (
                <Typography
                    as="span"
                    variant={captionVariant}
                    intent="quiet"
                    {...captionProps}
                    className={classNames(captionProps.className, classes.caption)}
                >
                    {caption}
                </Typography>
            ) : null}
        </Typography>
    );
});
