/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import * as styles from './list.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** List public properties */
export interface Props extends TargetProps {
    as?: React.ElementType;
}

/**
 * Lists are a continuous group of text.
 * They are composed of items containing primary text and supplemental cells
 * which are represented by icons, radios, checkboxes or other text.
 */
export const List = (props: Props) => {
    const {as: Component = 'ul', className, ...rest} = props;

    return <Component data-qa="list" {...rest} className={classNames(className, styles.root)} />;
};
