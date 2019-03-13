/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {ListItemText, ListItemTextProps} from '../list';

/** MenuItemText public properties */
export type Props = ListItemTextProps;

/** Shortcut to ListItemText */
export const MenuItemText = (props: Props) => <ListItemText {...props} />;
