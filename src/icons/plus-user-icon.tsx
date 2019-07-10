/*
 * Copyright (c) 2011-2019 Genestack Limited
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
            d="M6 2H4v2H2v2h2v2h2V6h2V4H6V2z"
            className="gs-svg-icon-fill"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 4.124c.293-.08.624-.124 1-.124 4 0 3 5 3 5-.253 1.602-1 3-1 3v1l5 2v2H3v-2l5-2v-1s-.747-1.398-1-3V7h2V4.124z"
            className="gs-svg-icon-fill"
        />
    </svg>
);
