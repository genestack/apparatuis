/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {WithClasses, mergeClassesProps} from '../../utils/styles';

import * as styles from './list-item.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;
type ContentProps = React.HTMLAttributes<HTMLDivElement>;

/** ListItem public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** If `true` element has `pressed` style. */
    active?: boolean;
    /** If `true` element has `hover` style. */
    hovered?: boolean;
    /** If `true` element has `focused` style. */
    focused?: boolean;
    /**
     * If `true` element has `disabled` style.
     * This state just remove mouse pointer events and adds opacity to whole item.
     * To fully disable (focus events) inputs or buttons inside item
     * you should pass `disabled` property certain to contained elements.
     */
    disabled?: boolean;
    /** To right vertical aligning this component uses inside wrapper */
    contentProps?: ContentProps;
    as?: React.ReactType;
}

/**
 * Single item of List component
 */
export function ListItem(props: Props) {
    const {
        as: Component = 'div',
        classes,
        active,
        hovered,
        focused,
        disabled,
        tabIndex = 0,
        className,
        contentProps = {},
        children,
        ...rest
    } = mergeClassesProps(props, styles);

    return (
        <Component
            tabIndex={disabled ? -1 : tabIndex}
            {...rest}
            className={classNames(className, classes.root, {
                [classes.active]: active,
                [classes.hovered]: hovered,
                [classes.focused]: focused,
                [classes.disabled]: disabled
            })}
        >
            <div {...contentProps} className={classNames(contentProps.className, classes.content)}>
                {children}
            </div>
        </Component>
    );
}
