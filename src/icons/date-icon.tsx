/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import * as React from 'react';
import {createIcon} from '../components/icon';

/**
 * Date Icon
 */
export const DateIcon = createIcon(
    <svg viewBox="0 0 20 20" fill="none">
        <path
             d="M3.5 4.5H17.5V16.5L3.5 16.5V4.5Z" 
            className="gs-svg-icon-stroke"
        />
        <path
             d="M6 7.5H9.5V10.5M6 13.5H9.5V10.5M9.5 10.5H7" 
            className="gs-svg-icon-stroke"
        />
        <path
             d="M13.5 13.5V7.5H12M13.5 13.5H11M13.5 13.5H15" 
            className="gs-svg-icon-stroke"
        />
        <rect 
            x="6"
            y="2"
            width="1"
            height="3"
            className="gs-svg-icon-fill"
        />
        <rect 
            x="14"
            y="2"
            width="1"
            height="3"
            className="gs-svg-icon-fill"
        />
    </svg>
);
