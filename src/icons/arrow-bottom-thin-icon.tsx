/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createIcon} from '../components/icon';

/**
 * Keyboard arrow key icon shows user possible transformation direction
 * after some interaction has applied.
 */
export const ArrowBottomThinIcon = createIcon(
    <svg viewBox="0 0 20 20">
        <path
            d="M7 8l3 3 3-3c1-1 2 0 1 1l-4 4-4-4C5 8 6 7 7 8z"
            className="gs-svg-icon-fill"
            fillOpacity="0.6"
        />
    </svg>
);
