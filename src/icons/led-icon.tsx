/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 *
 */
import * as React from 'react';

import {createIcon} from '../components/icon';

/**
 * LED (circle with a fat border) icon
 */
export const LedIcon = createIcon(
    <svg viewBox="0 0 20 20" fill="none">
        <circle
            r="4"
            cx="10"
            cy="10"
            strokeWidth="6"
            className="gs-svg-icon-fill gs-svg-icon-stroke"
        />
    </svg>
);
