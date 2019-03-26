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
import {Flex} from '../flex';
import {Typography, TypographyProps} from '../typography';

import * as styles from './list-item.module.css';

type TargetProps = Omit<TypographyProps, 'classes'>;

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
}

/**
 * Single item of List component
 */
export function ListItem(props: Props) {
    const {
        classes,
        active,
        hovered,
        focused,
        disabled,
        tabIndex = 0,
        className,
        ...rest
    } = mergeClassesProps(props, styles);

    const children =
        typeof props.children === 'string' ? (
            <Flex grow shrink ellipsis>
                <div>{props.children}</div>
            </Flex>
        ) : (
            props.children
        );

    return (
        <Flex ellipsis container>
            <Typography
                tabIndex={disabled ? -1 : tabIndex}
                {...rest}
                className={classNames(className, classes.root, {
                    [classes.active]: active,
                    [classes.hovered]: hovered,
                    [classes.focused]: focused,
                    [classes.disabled]: disabled
                })}
            >
                {children}
            </Typography>
        </Flex>
    );
}
