/*
 * Copyright (c) 2011-2022 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import * as React from 'react';

import {createIcon} from '../components/icon';

/**
 * Arrow Left Thin Icon
 */
export const ArrowLeftThinIcon = createIcon(
    <svg viewBox="0 0 20 20" fill="none">
        <path d="M8.5 6.5L4.5 10.5L8.5 14.5" className="gs-svg-icon-stroke" strokeLinecap="round" />
        <line
            x1="15.5"
            y1="10.5"
            x2="5.5"
            y2="10.5"
            className="gs-svg-icon-stroke"
            strokeLinecap="round"
        />
    </svg>
);
