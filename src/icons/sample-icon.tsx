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
 * Sample Icon
 */
export const SampleIcon = createIcon(
    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 4H7v11c0 2 1 3 3 3s3-1 3-3V4z" fill="#D2DFEF" />
        <path d="M13 15V7s-1 1.5-3 1-3 1-3 1v6c0 2 1 3 3 3s3-1 3-3z" fill="#6290C8" />
        <circle cx="9" cy="10" r="1" fill="#D2DFEF" />
        <path fill="#6290C8" d="M7 3h6v2H7z" />
        <path fill="#D2DFEF" d="M10 12h1v1h-1z" />
    </svg>
);
