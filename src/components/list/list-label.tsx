/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {Flex} from '../flex';

import {ListItemText} from './list-item-text';
import * as styles from './list-label.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** ListLabel public properties */
export interface Props extends TargetProps {}

/**
 * List item as interactive label
 */
export function ListLabel(props: Props) {
    const {className, ...rest} = props;

    const children =
        typeof props.children === 'string' ? (
            <ListItemText>{props.children}</ListItemText>
        ) : (
            props.children
        );

    return (
        <Flex ellipsis container gap={0}>
            <div {...rest} className={classNames(className, styles.root)}>
                {children}
            </div>
        </Flex>
    );
}
