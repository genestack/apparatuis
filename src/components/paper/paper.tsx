/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import * as styles from './paper.module.css';

type TargetProps = React.HTMLAttributes<HTMLElement>;

/** Paper public props */
export interface Props extends TargetProps {
    /** Reference to root element */
    rootRef?: React.Ref<HTMLElement>;
    /** You could redefine the target component by passing ReactType */
    as?: React.ReactType;
}

/**
 * Paper is a block with background and shadow.
 * Is used for overlay components.
 */
export function Paper(props: Props) {
    const {as: Component = 'div', rootRef, className, ...rest} = props;

    return (
        <Component
            data-qa="paper"
            {...rest}
            ref={rootRef}
            className={classNames(className, styles.root)}
        />
    );
}
