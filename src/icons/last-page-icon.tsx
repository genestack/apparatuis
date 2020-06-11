/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import * as React from 'react';

import {createIcon} from '../components/icon';

/** Right-pointing double chevrons */
export const LastPageIcon = createIcon(
    <svg viewBox="0 0 20 20" fill="none">
        <path
            d="M6 14l4-4-4-4M11 14l4-4-4-4"
            className="gs-svg-icon-stroke"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
);
