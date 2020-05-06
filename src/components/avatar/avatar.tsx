/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {Typography} from '../typography';

import * as styles from './avatar.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** Avatar public properties */
export interface Props extends TargetProps {
    /**
     * Defines the initials displayed.
     * Displays one symbol, if the property consists of one symbol.
     * Displays two first symbols, if the property consists of two or more symbols.
     */
    initials: string;
}

/**
 * Avatar component is the graphical representation of a user
 */
export const Avatar = (props: Props) => {
    const {initials: initialsProp, ...rest} = props;

    const initials = initialsProp ? (
        <>
            {initialsProp[1] ? <div className={styles.letter}>{initialsProp[1]}</div> : null}
            <div className={styles.letter}>{initialsProp[0]}</div>
        </>
    ) : null;

    return (
        <Typography as="div" className={classNames(styles.root, rest.className)} {...rest}>
            {initials}
            {rest.children}
        </Typography>
    );
};
