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
 * The same as the Cross icon, but smaller
 */
export const CrossSmallIcon = createIcon(
    <svg viewBox="0 0 20 20">
        <path
            className="gs-svg-icon-stroke"
            strokeWidth="1.5"
            strokeLinecap="round"
            d="M7 7l6 6M7 13l6-6"
        />
    </svg>
);
