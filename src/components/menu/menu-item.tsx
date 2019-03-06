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
import {ListItem, ListItemProps, ListItemCell} from '../list';

import * as styles from './menu-item.module.css';

type TargetProps = Omit<ListItemProps, 'classes' | 'as'>;

/** MenuItem public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    icon?: React.ReactNode;
}

/**
 * Menu item should be a button to support native keyboard shortcuts
 * for clicking (by Enter or Space keys press)
 */
const renderButton = (props: React.HTMLAttributes<HTMLElement>) => (
    <button {...props} type="button" />
);

/** Menu Item */
export const MenuItem = (props: Props) => {
    const {classes, className, children, icon, ...rest} = mergeClassesProps(props, styles);

    return (
        <ListItem
            {...rest}
            as={renderButton}
            className={classNames(className, classes.root)}
            classes={{
                hovered: classes.hovered,
                focused: classes.focused
            }}
        >
            <ListItemCell className={classes.icon}>{icon}</ListItemCell>
            {children}
        </ListItem>
    );
};
