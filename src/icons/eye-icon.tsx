/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 *
 */
import * as React from 'react';

import {createIcon} from '../components/icon';

const eyePath = `
M3 10c0-1 3.64-5 7-5s7 4 7 5-3.64 5-7 5-7-4-7-5zm10 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-1 0a2 2 
0 1 1-4 0 2 2 0 0 1 4 0z
`;

/**
 * Eye icon
 */
export const EyeIcon = createIcon(
    <svg viewBox="0 0 20 20" fill="none">
        <path className="gs-svg-icon-fill" fillRule="evenodd" clipRule="evenodd" d={eyePath} />
    </svg>
);
