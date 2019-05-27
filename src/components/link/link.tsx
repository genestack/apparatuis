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
import {Typography} from '../typography';

import * as styles from './link.module.css';

type TargetProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    variant?: 'common' | 'pseudo' | 'external';
    ellipsis?: boolean;
    active?: boolean;
    disabled?: boolean;
    as?: React.ReactType<TargetProps>;
}

export const Link = (props: Props) => {
    const {
        as: Component = 'a',
        variant = 'common',
        disabled,
        active,
        classes,
        ...rest
    } = mergeClassesProps(props, styles);

    let {tabIndex} = rest;

    if (disabled) {
        tabIndex = -1;
    } else {
        if (tabIndex === undefined && rest.href === undefined) {
            tabIndex = 0;
        }
    }

    return (
        <Typography<TargetProps>
            {...rest}
            tabIndex={tabIndex}
            as={Component}
            box="inline"
            className={classNames(classes.root, {
                [classes.pseudo]: variant === 'pseudo',
                [classes.external]: variant === 'external',
                [classes.disabled]: disabled,
                [classes.active]: active
            })}
        />
    );
};
