/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import * as styles from './flex-expander.module.css';

/** Flex Expander public properties */
export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Helper component that lets to expand two near flex element.
 * Useful when you want to push flex element to the right of container.
 */
export const FlexExpander = (props: Props) => (
    <div {...props} className={classNames(props.className, styles.root)} />
);