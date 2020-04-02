/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 *
 */
import * as React from 'react';

import {createIcon} from '../components/icon';

/**
 * Just a ring.
 * Looks like unchecked radio button.
 */
export const RadioIcon = createIcon(
    <svg width="20" height="20" fill="none">
        <circle cx="10" cy="10" r="8" className="gs-svg-icon-stroke" strokeWidth="1" />
    </svg>
);
