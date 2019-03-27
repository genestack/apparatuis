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
import {mergeClassesProps, WithClasses} from '../../utils/styles';

import * as styles from './header-button.module.css';
import {HeaderItem, Props as HeaderItemProps} from './header-item';

type TargetProps = Omit<HeaderItemProps, 'as' | 'classes'>;

/** HeaderButton public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    disabled?: boolean;
    active?: boolean;
    hovered?: boolean;
    focused?: boolean;
}

const renderButton = (props: React.HTMLAttributes<HTMLElement>) => (
    <button {...props} type="button" />
);

/** Header button is a main element of the header */
export const HeaderButton = (props: Props) => {
    const {active, hovered, focused, disabled, classes, ...rest} = mergeClassesProps(props, styles);

    return (
        <HeaderItem
            {...rest}
            as={renderButton}
            className={classNames(rest.className, classes.root, {
                [classes.active]: active,
                [classes.hovered]: hovered,
                [classes.focused]: focused,
                [classes.disabled]: disabled
            })}
        />
    );
};
