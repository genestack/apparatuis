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
 * Simple bottom arrow and a line below It
 */
export const ArrowDownloadIcon = createIcon(
    <svg viewBox="0 0 20 20">
        <path
            className="gs-svg-icon-fill"
            d="M7.5 8.5c-.39-.39-1.11-.39-1.5 0-.39.39-.39 1.11 0 1.5l4 4 4-4c.39-.39.39-1.11 0-1.5-.39-.39-1.11-.39-1.5 0L11 10V4a1 1 0 1 0-2 0v6L7.5 8.5z"
        />
        <rect width="10" height="2" x="5" y="15" rx="1" className="gs-svg-icon-fill" />
    </svg>
);
