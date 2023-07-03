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
 * Cross icon indicates that the bound action close or cancel something
 */
export const CrossIcon = createIcon(
    <svg viewBox="0 0 20 20">
        <path
            className="gs-svg-icon-stroke"
            strokeWidth="1.5"
            strokeLinecap="round"
            d="M6 13.939L13.939 6M6.061 6L14 13.939"
        />
    </svg>
);
