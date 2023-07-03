/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import * as React from 'react';

import {createIcon} from '../components/icon';

/**
 * Thin bottom arrow and a line below it
 */
export const ArrowDownloadThinIcon = createIcon(
    <svg viewBox="0 0 20 20">
        <path
            d="M10.5 3.5V13.5M10.5 13.5L14.5 9.5M10.5 13.5L6.5 9.5"
            className="gs-svg-icon-stroke"
            strokeLinecap="round"
        />
        <rect x="5" y="16" width="11" height="1" rx="0.5" className="gs-svg-icon-fill" />
    </svg>
);
