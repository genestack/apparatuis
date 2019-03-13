/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {ListItemCell, ListItemCellProps} from '../list';

/** MenuItemCell public properties */
export type Props = ListItemCellProps;

/** Shortcut to ListItemCell */
export const MenuItemCell = (props: Props) => <ListItemCell {...props} />;
