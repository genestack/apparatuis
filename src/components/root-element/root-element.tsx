/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import '../../fonts.css';
import * as styles from './root-element.module.css';

type TargetProps = React.HTMLAttributes<HTMLElement>;

/** RootElement public properties */
export interface Props extends TargetProps {
    /**
     * You could redefine the target component by passing ReactType.
     */
    as?: React.ReactType;
}

/**
 * Element that add base styles for proper components styling.
 * It is enough to wrap your application once at application entry point.
 * Remember that this component creates DOM element.
 */
export const RootElement = (props: Props) => {
    const {as: Component = 'div', ...rest} = props;

    return <Component {...rest} className={classNames(rest.className, styles.root)} />;
};
