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
            d="M8.068 8c.15 1.043.542 1.766.935 2.171.134.138.268.24.392.333.34.256.607.457.607 1.21 0 .782-.81 1.118-1.726 1.498-.29.12-.588.244-.876.388-1.023.512-2.047 1.023-2.326 1.907-.083.264.149.493.425.493H16.5c.276 0 .508-.23.425-.493-.28-.884-1.303-1.395-2.326-1.907a13.602 13.602 0 00-.876-.388c-.915-.38-1.726-.716-1.726-1.498 0-.753.268-.954.607-1.21.124-.094.258-.195.391-.333.5-.514.999-1.542.999-3.085C13.995 5.029 12.654 4 11 4c-.35 0-.687.062-1 .176V8H8.068z"
            className="gs-svg-icon-fill"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 3H5v2H3v2h2v2h2V7h2V5H7V3z"
            className="gs-svg-icon-fill"
        />
    </svg>
);
