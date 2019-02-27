/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createIcon} from '../components/icon';

// tslint:disable max-line-length

/**
 * Download icon indicates that the bound action could initialize
 * some download process.
 */
export const DownloadIcon = createIcon(
    <svg viewBox="0 0 20 20">
        <path
            d="M4.5 8h1.722V7a4 4 0 0 1 4-4C12.01 3 14 4 14 6h.5C16 6 17 7.195 17 8.5c0 1-1 1.5-1 1.5l1 .5s1-.5 1-2a3.5 3.5 0 0 0-3.188-3.486C14.5 3 12.278 2 10.222 2a5 5 0 0 0-5 5H4.5a2.5 2.5 0 0 0 0 5H5l1-1H4.5a1.5 1.5 0 0 1 0-3z"
            fill="#828282"
        />
        <path d="M8.5 11.5L7 13l5 5 5-5-1.5-1.5-2.517 2.5V8H11v6l-2.5-2.5z" fill="#828282" />
    </svg>
);
