/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {mergeClassesProps, WithClasses} from '../../utils/styles';
import {Typography} from '../typography';

import * as styles from './avatar.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** Avatar public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /**
     * Defines the initials displayed.
     * Displays one symbol, if the property consists of one symbol.
     * Displays two first symbols, if the property consists of two or more symbols.
     */
    initials?: string;
}

/**
 * Avatar component is the graphical representation of a user
 */
export const Avatar = (props: Props) => {
    const {initials: initialsProp, classes, ...rest} = mergeClassesProps(props, styles);

    let initials = null;

    if (initialsProp) {
        const letters = Array.from(initialsProp);
        initials = (
            <>
                {letters[1] ? (
                    <div className={classes.letter}>{letters[1].toUpperCase()}</div>
                ) : null}
                <div className={classes.letter}>{letters[0].toUpperCase()}</div>
            </>
        );
    }

    return (
        <Typography as="div" {...rest} className={classNames(classes.root, rest.className)}>
            {initials}
            {rest.children}
        </Typography>
    );
};
