/*
 * Copyright (c) 2011-2021 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import * as React from 'react';

import {createIcon} from '../components/icon';

/**
 * Simple file icon
 */
export const SimpleFileIcon = createIcon(
    <svg viewBox="0 0 20 20" fill="none">
        <mask id="a" maskUnits="userSpaceOnUse" x="3" y="1" width="14" height="18">
            <path
                d="M3 3v14a2 2 0 002 2h10a2 2 0 002-2V6.702a2 2 0 00-.438-1.25L13.6 1.751A2 2 0 0012.04 1H5a2 2 0 00-2 2z"
                fill="#B0B5BF"
            />
        </mask>
        <g mask="url(#a)">
            <path
                d="M3 3v14a2 2 0 002 2h10a2 2 0 002-2V6.702a2 2 0 00-.438-1.25L13.6 1.751A2 2 0 0012.04 1H5a2 2 0 00-2 2z"
                fill="#B0B5BF"
            />
            <path d="M12 5V1h.52a1 1 0 01.78.375L17 6h-4a1 1 0 01-1-1z" fill="#798091" />
        </g>
    </svg>
);
