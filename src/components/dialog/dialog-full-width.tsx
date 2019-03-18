/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import * as styles from './dialog-full-width.module.css';

/** DialogFullWidth public properties */
export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Use this element to remove side paddings from Dialog elements.
 * It add negative margins to compensate dialog side paddings.
 */
export const DialogFullWidth = (props: Props) => (
    <div {...props} className={classNames(props.className, styles.root)} />
);
