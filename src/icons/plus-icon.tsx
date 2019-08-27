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

const plusPath = `
M10 4a1 1 0 0 0-1 1v4H5a1 1 0 0 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4V5a1 1 0 0 0-1-1z
`;

/**
 * Plus icon
 */
export const PlusIcon = createIcon(
    <svg viewBox="0 0 20 20" fill="none">
        <path className="gs-svg-icon-fill" fillRule="evenodd" clipRule="evenodd" d={plusPath} />
    </svg>
);
