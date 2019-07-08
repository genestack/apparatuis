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
import {ListItemProps, ListItem} from '../list';

import * as styles from './menu-caption.module.css';

type TargetProps = Omit<ListItemProps, 'value' | 'interactive'>;

interface Props extends TargetProps {}

/** Caption that is used as menu item */
export const MenuCaption = (props: Props) => (
    <ListItem {...props} className={classNames(props.className, styles.root)} />
);
