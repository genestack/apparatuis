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
export const KeyboardArrowBottomIcon = createIcon(
    <svg viewBox="0 0 20 20">
        <path
            d="M10.354 11.354L13 8.707l.293.293L10 12.293 6.707 9 7 8.707l2.646 2.647.354.353.354-.353z"
            fill="none"
            className="gs-svg-icon-stroke"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
);
