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

const warningPath = `
M17 10a7 7 0 11-14 0 7 7 0 0114 0zm-6 4a1 1 0 11-2 0 1 1 0 012 0zM9.18 6a1 1 0 00-.986 1.164l.667 
4a1 1 0 00.986.836h.306a1 1 0 00.986-.836l.667-4A1 1 0 0010.82 6H9.18z
`;

/**
 * Warning (exclamation mark) icon
 */

export const WarningIcon = createIcon(
    <svg viewBox="0 0 20 20" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d={warningPath} className="gs-svg-icon-fill" />
    </svg>
);
