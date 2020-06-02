/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import * as React from 'react';

import {createIcon} from '../components/icon';

// tslint:disable max-line-length

/**
 * User icon and plus sign at the left top corner
 */
export const PlusUserIcon = createIcon(
    <svg viewBox="0 0 20 20">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.4 13.6C7.2 14.2 6 14.8 6 16h12c0-1.2-1.2-1.8-2.4-2.4-1.2-.6-2.602-.857-2.602-1.886 0-1.028.5-1.028.998-1.543.5-.514.999-1.542.999-3.085C14.995 5.029 13.654 4 12 4c-1.654 0-2.995 1.382-2.995 3.086 0 1.543.5 2.571.998 3.085.5.515.999.515.999 1.543C11.002 12.743 9.6 13 8.4 13.6z"
            className="gs-svg-icon-fill"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 7H4v2H2v2h2v2h2v-2h2V9H6V7z"
            className="gs-svg-icon-fill"
        />
    </svg>
);
