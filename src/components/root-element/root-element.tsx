/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import * as styles from './root-element.module.css';

type TargetProps = React.HTMLAttributes<HTMLElement>;

export interface Props extends TargetProps {
    as?: React.ReactType;
}

export const RootElement = (props: Props) => {
    const {as: Component = 'div', ...rest} = props;

    return <Component {...rest} className={classNames(rest.className, styles.root)} />;
};
