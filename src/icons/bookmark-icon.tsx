/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createIcon} from '../components/icon';

const bookmarkPath = `
M7.5 4.5c-1.5 0-2 .5-2 2v8s0 1 1 1S9 13 10 13s2.5 2.5 3.5 2.5 1-1 1-1v-8c0-1.5-.5-2-2-2h-5z
`;

/**
 * Bookmark icon
 */
export const BookmarkIcon = createIcon(
    <svg viewBox="0 0 20 20">
        <path
            d={bookmarkPath}
            className="gs-svg-icon-stroke gs-svg-icon-fill"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
        />
    </svg>
);
