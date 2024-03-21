/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createIcon} from "../components/icon";

export const CompletedIcon = createIcon(
    <svg fill="none" width="20" height="20" viewBox="0 0 20 20">
        <path stroke="#77AB30" d="M16.945 9.12a7 7 0 11-3.474-5.199" />
        <path
            fill="#77AB30"
            fillRule="evenodd"
            d="M6 8c.586-.585 1.414-.585 2 0l2 2.079L15 5c.586-.585 1.914-1.085 2.5-.5.586.586.086 1.915-.5 2.5l-7 7-4-3.92A1.45 1.45 0 016 8z"
            clipRule="evenodd"
        />
    </svg>
);
