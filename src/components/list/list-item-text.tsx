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
import {Typography, TypographyProps} from '../typography';

import {ListItemCell} from './list-item-cell';
import * as styles from './list-item-text.module.css';

type TargetProps = Omit<TypographyProps, 'classes'>;

/** ListItemText public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** Disable ellipsis text */
    wrap?: boolean;
}

/**
 * List item main element.
 * It is ellipsis by default, so it should have `title` value.
 * If no `title` is passed it tries to use `children` as `string`,
 */
export function ListItemText(props: Props) {
    const {wrap, classes, className, ...rest} = mergeClassesProps(props, styles);

    const title = rest.title || (typeof rest.children === 'string' ? rest.children : undefined);

    return (
        <ListItemCell
            {...rest}
            as={Typography}
            title={title}
            className={classNames(className, classes.root, {
                [classes.nowrap]: !wrap
            })}
        />
    );
}
