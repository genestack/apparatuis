/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {DarkContext, mergeClassesProps, WithClasses} from '../../utils';
import {DataAttributes} from '../../utils/slot-props';

import * as styles from './typography.module.css';

interface TargetProps {
    className?: string;
    children?: React.ReactNode;
}

type DefaultTargetProps = React.HTMLAttributes<HTMLElement>;

interface TypographyProps extends WithClasses<keyof typeof styles> {
    /**
     * Corresponds to main role and style of the text block
     * (font-size, font-weight, line-height etc.)
     *
     * Default: `"body"`
     */
    variant?: 'header' | 'title' | 'section' | 'body' | 'caption';

    /**
     * Defines the intention of using the Typography element
     */
    intent?: 'no-intent' | 'quiet' | 'alarm' | 'warning' | 'success';
    /**
     * Makes the font condensed
     */
    condensed?: boolean;
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
     * Adds ellipsis style to element
     */
    ellipsis?: boolean;
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
    as?: React.ElementType;
}

/** Typography public properties */
export type Props<T extends TargetProps = DefaultTargetProps> = T &
    TypographyProps &
    DataAttributes;

/**
 * Component that renders text with specific preset.
 * Its purpose is to reduce amount of custom CSS text styles.
 * It is one of the base components of whole UI Kit.
 * Will be moved to UI Kit.
 */
export function Typography<T extends TargetProps = DefaultTargetProps>(props: Props<T>) {
    return (
        <DarkContext.Consumer>
            {(darkContext) => {
                const mergedProps = mergeClassesProps(props as Props<TargetProps>, styles);
                const {
                    as,
                    variant = 'body',
                    intent = 'no-intent',
                    box = 'block',
                    inverted = darkContext,
                    classes,
                    className,
                    condensed,
                    ellipsis,
                    ...rest
                } = mergedProps;
                let {as: Component} = mergedProps;

                if (!Component) {
                    switch (variant) {
                        case 'body':
                            Component = 'p';
                            break;
                        case 'caption':
                            Component = 'p';
                            break;
                        case 'header':
                            Component = 'h2';
                            break;
                        case 'section':
                            Component = 'h3';
                            break;
                        case 'title':
                            Component = 'h1';
                            break;
                        default:
                            Component = 'div';
                    }
                }

                return (
                    <Component
                        data-qa="typography"
                        {...rest}
                        className={classNames(className, classes.root, {
                            [classes.header]: variant === 'header',
                            [classes.title]: variant === 'title',
                            [classes.section]: variant === 'section',
                            [classes.body]: variant === 'body',
                            [classes.caption]: variant === 'caption',

                            [classes.quiet]: intent === 'quiet',

                            [classes.inverted]: inverted,

                            [classes.inline]: box === 'inline',

                            [classes.paragraph]: box === 'paragraph',

                            [classes.success]: intent === 'success',
                            [classes.warning]: intent === 'warning',
                            [classes.alarm]: intent === 'alarm',

                            [classes.ellipsis]: ellipsis,

                            [classes.condensed]: condensed
                        })}
                    />
                );
            }}
        </DarkContext.Consumer>
    );
}
