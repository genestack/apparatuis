/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {mergeClassesProps, WithClasses} from '../../utils/styles';

import * as styles from './typography.module.css';

type TargetProps = React.HTMLAttributes<HTMLElement>;

/**
 * Typography Props
 */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /**
     * Corresponds to main role and style of the text block
     * (font-size, font-weight, line-height etc.)
     *
     * Default: `"body"`
     */
    variant?: 'header' | 'title' | 'section' | 'body' | 'caption';
    /**
     * Makes text quiet. It is useful for secondary information
     */
    quiet?: boolean;
    /**
     * Describes how the text is presented in block model.
     *
     * Default: `block`
     *
     * `block` — the text is block by default.
     * `inline` — useful if you want to insert some word in a text;
     * `paragraph` — the text will have margins and paddings according to its `variant`.
     */
    box?: 'block' | 'inline' | 'paragraph';
    /**
     * Inverses the text colors on dark backgrounds
     *
     * Default: `"false"`
     */
    inverted?: boolean;
    /**
     * You could redefine the target component by passing ReactType.
     *
     * Default: `"div"`
     *
     * @example
     * const anchor = <Typography as="a" /> // renders as anchor
     * const button = <Typography as={Button} /> // renders as Button component
     * const routerLink = (
     *   <Typography as={(props) => <RouterLink to="/" {...props} />} />
     * ); // renders as `RouterLink`
     */
    as?: React.ReactType;
}

/**
 * Component that renders text with specific preset.
 * Its purpose is to reduce amount of custom CSS text styles.
 * It is one of the base components of whole UI Kit.
 * Will be moved to UI Kit.
 */
export function Typography(props: Props) {
    const {
        as: Component = 'div',
        variant = 'body',
        quiet,
        box = 'block',
        inverted,
        classes,
        className,
        ...rest
    } = mergeClassesProps(props, styles);

    return (
        <Component
            {...rest}
            className={classNames(className, classes.root, {
                [classes.header]: variant === 'header',
                [classes.title]: variant === 'title',
                [classes.section]: variant === 'section',
                [classes.body]: variant === 'body',
                [classes.caption]: variant === 'caption',

                [classes.quiet]: quiet,

                [classes.inverted]: inverted,

                [classes.inline]: box === 'inline',

                [classes.paragraph]: box === 'paragraph'
            })}
        />
    );
}
