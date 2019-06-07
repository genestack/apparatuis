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
 * Search Icon
 */
export const SearchIcon = createIcon(
    <svg viewBox="0 0 20 20">
        <circle
            cx="10"
            cy="10"
            r="6.25"
            className="gs-svg-icon-stroke"
            strokeWidth="1.5"
            fill="none"
        />
        <path className="gs-svg-icon-fill" d="M14 15.414L15.414 14l3.561 3.56-1.414 1.415z" />
    </svg>
);
