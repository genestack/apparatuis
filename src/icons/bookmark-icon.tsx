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
M7 4.5C6 4.5 5.5 5 5.5 6V14.5C5.5 15.5 5.5 16.5 6.5 16.5C7.5 16.5 9 13.5 10 13.5C11 13.5 12.5 16.5 13.5 16.5C14.5 16.5 14.5 15.5 14.5 14.5V6C14.5 5 14 4.5 13 4.5H7Z
`;

/**
 * Bookmark icon
 */
export const BookmarkIcon = createIcon(
    <svg viewBox="0 0 20 20">
        <path d={bookmarkPath} className="gs-svg-icon-fill" strokeLinecap="round" />
    </svg>
);
