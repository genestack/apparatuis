/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

/**
 * React context that is used for dark backgrounds.
 * All consumers should be inverted.
 */
export const DarkContext = React.createContext<boolean | null>(null);
