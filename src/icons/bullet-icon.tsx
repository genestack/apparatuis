/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createIcon} from '../components/icon';

/** Just a circle icon */
export const BulletIcon = createIcon(() => (
    <svg viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="3" className="gs-svg-icon-fill" />
    </svg>
));
