/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createIcon} from '../components/icon';

/** Presents clocks with contraclockwise arrow */
export const TimeReverseIcon = createIcon(
    <svg viewBox="0 0 20 20">
        <path
            className="gs-svg-icon-fill"
            d="M10 3c3.906 0 7 3.125 7 7s-3 7-7 7c-2.992 0-4.707-1.813-4.707-1.813L6 14.5S7.5 16 10 16c3.344 0 6-2.656 6-6s-2.734-6-6-6-6 2.594-6 6h.691a.5.5 0 01.447.724l-1.19 2.382a.5.5 0 01-.895 0l-1.191-2.382A.5.5 0 012.309 10H3c0-3.86 3.094-7 7-7zm-.5 3a.5.5 0 00-.5.5v4.293a.5.5 0 00.146.353l2 2a.5.5 0 00.708 0l.793-.792a.5.5 0 000-.708l-1.5-1.5A.5.5 0 0111 9.793V6.5a.5.5 0 00-.5-.5h-1z"
        />
    </svg>
);
