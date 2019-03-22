/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {MenuItem} from './menu-item';

/** MenuContext value */
export interface MenuContextValue {
    onItemSelect: (instance: MenuItem, event: React.SyntheticEvent) => void;
}

/** Menu Context */
export const MenuContext = React.createContext<MenuContextValue | null>(null);
