/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

/** Where is block could be contained */
export type Contained = 'in-page' | 'in-dialog';

/**
 * Context for MarginBox elements.
 * It is used for setting left and right paddings
 * by elements that are contained in certain MarginBoxes.
 */
export const MarginBoxContext = React.createContext<Contained>('in-page');
