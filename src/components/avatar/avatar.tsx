/*
 * Copyright (c) 2011-2023 Genestack Limited
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

/** Avatar public properties */
export interface Props
    extends React.ComponentPropsWithoutRef<'div'>,
        WithClasses<keyof typeof styles> {
    /**
     * Defines the initials displayed.
     * Displays one symbol, if the property consists of one symbol.
     * Displays two first symbols, if the property consists of two or more symbols.
     */
    initials?: string;
    icon?: React.ReactNode;
}

/**
 * Avatar component is the graphical representation of a user
 */
export function Avatar(props: Props) {
    const {initials: initialsProp, classes, icon, ...rest} = mergeClassesProps(props, styles);

    let initials: React.ReactElement | null = null;

    if (initialsProp) {
        const letters = Array.from(initialsProp);
        initials = (
            <React.Fragment>
                {letters[1] ? (
                    <div className={classes.letter} data-qa="avatar-letter">
                        {letters[1].toUpperCase()}
                    </div>
                ) : null}
                <div className={classes.letter} data-qa="avatar-letter">
                    {letters[0].toUpperCase()}
                </div>
            </React.Fragment>
        );
    }

    return (
        <Typography
            data-qa="avatar"
            as="div"
            {...rest}
            className={classNames(classes.root, rest.className)}
        >
            {icon ? (
                icon
            ) : (
                <React.Fragment>
                    {initials}
                    {rest.children}
                </React.Fragment>
            )}
        </Typography>
    );
}
