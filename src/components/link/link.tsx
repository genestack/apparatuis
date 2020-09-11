/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {DarkContext} from '../../utils/dark-context';
import {mergeClassesProps, WithClasses} from '../../utils/styles';
import {Typography} from '../typography';

import * as styles from './link.module.css';

type TargetProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

/** Link public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** Defines a resource that anchor is linked */
    variant?: 'internal' | 'pseudo' | 'external';
    /** Adds ellipsis for text overflowing */
    ellipsis?: boolean;
    /** Adds styles for pressed state */
    active?: boolean;
    /** Disables click handlers */
    disabled?: boolean;
    /** Adds styles for focused state */
    focus?: boolean;
    /** Adds styles for dark backgrounds */
    inverted?: boolean;
    /** Node that is placed before link label */
    prepend?: React.ReactNode;
    /** Node that is placed after link label */
    append?: React.ReactNode;
    /** Properties for label wrapper element */
    labelProps?: React.HTMLAttributes<HTMLSpanElement>;
    /** You could redefine the target component by passing ReactType. */
    as?: React.ReactType;
}

/**
 * Link component presents an styled anchor.
 */
export const Link = (props: Props) => {
    const invertedContext = React.useContext(DarkContext);

    const {
        variant = 'internal',
        disabled,
        active,
        classes,
        focus,
        inverted = invertedContext,
        children,
        prepend,
        append,
        labelProps = {},
        ...rest
    } = mergeClassesProps(props, styles);

    let {tabIndex, href, onClick} = rest;

    if (disabled) {
        href = undefined;
        tabIndex = undefined;
        onClick = undefined;
    }

    return (
        <Typography<TargetProps>
            data-qa="link"
            as="a"
            {...rest}
            href={href}
            tabIndex={tabIndex}
            box="inline"
            onClick={onClick}
            className={classNames(classes.root, rest.className, {
                [classes.pseudo]: variant === 'pseudo',
                [classes.external]: variant === 'external',
                [classes.disabled]: disabled,
                [classes.active]: active,
                [classes.focus]: focus,
                [classes.inverted]: inverted
            })}
        >
            {prepend}
            <span {...labelProps} className={classNames(labelProps.className, classes.label)}>
                {children}
            </span>
            {append}
        </Typography>
    );
};
