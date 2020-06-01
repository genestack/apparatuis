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
 * Right arrow pointing to human figure
 */
export const SharedWithUserIcon = createIcon(
    <svg viewBox="0 0 20 20">
        <path d="M6 3l4 4-4 4-1.5-1.5L6 8H2V6h4L4.5 4.5 6 3z" className="gs-svg-icon-fill" />
        <path
            d="M9.364 9.136c.18.454.41.8.64 1.035.133.138.267.24.391.333.34.256.607.457.607 1.21 0 .782-.81 1.118-1.726 1.498-.29.12-.588.244-.876.388-1.023.512-2.047 1.023-2.326 1.907-.083.264.149.493.425.493H17.5c.276 0 .508-.23.425-.493-.28-.884-1.303-1.395-2.326-1.907a13.602 13.602 0 00-.876-.388c-.915-.38-1.726-.716-1.726-1.498 0-.753.268-.954.607-1.21.124-.094.258-.195.391-.333.5-.514.999-1.542.999-3.085C14.995 5.029 13.654 4 12 4c-.947 0-1.791.453-2.34 1.16L11.5 7 9.364 9.136z"
            className="gs-svg-icon-fill"
        />
    </svg>
);
