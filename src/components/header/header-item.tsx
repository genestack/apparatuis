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
import {TypographyProps, Typography} from '../typography';

import * as styles from './header-item.module.css';

type TargetProps = TypographyProps;

/** HeaderItem public properties */
export interface Props extends TargetProps {
    grow?: boolean;
    shrink?: boolean;
}

/**
 * Use HeaderItem if you want to show some non-interactive information
 * in the Header.
 */
export const HeaderItem = (props: Props) => {
    const {grow, shrink, ...rest} = props;

    const children =
        typeof props.children === 'string' ? (
            <Flex grow shrink ellipsis>
                <div>{props.children}</div>
            </Flex>
        ) : (
            props.children
        );

    return (
        <Flex ellipsis cell container noGap grow={grow} shrink={shrink}>
            <Typography {...rest} className={classNames(rest.className, styles.root)}>
                {children}
            </Typography>
        </Flex>
    );
};
