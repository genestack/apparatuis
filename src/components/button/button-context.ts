/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {Props} from './button';

/** ButtonContext value */
export type ButtonContextValue = Pick<Props, 'className' | 'ghost' | 'intent' | 'size'>;

/** Internal Button context */
export const ButtonContext = React.createContext<ButtonContextValue>({});
