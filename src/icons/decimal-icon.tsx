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
 * Decimal Icon
 */
export const DecimalIcon = createIcon(
    <svg viewBox="0 0 20 20" fill="none">
        <path d="M4.5 7.5H7.5V13.5H4.5V7.5Z" className="gs-svg-icon-stroke" />
        <path d="M16 7.5H12.5V10.5H15.5V13.5H12" className="gs-svg-icon-stroke" />
        <rect x="9" y="12" width="2" height="2" className="gs-svg-icon-fill" />
    </svg>
);
