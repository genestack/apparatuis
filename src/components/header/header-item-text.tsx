/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {Typography, TypographyProps} from '../typography';

import * as styles from './header-item-text.module.css';

/** HeaderItemText public properties */
export type Props = TypographyProps;

/** Shortcut to ListItemText */
export const HeaderItemText = (props: Props) => (
    <Typography {...props} className={classNames(props.className, styles.root)} />
);
