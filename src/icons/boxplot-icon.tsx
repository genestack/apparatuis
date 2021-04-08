/*
 * Copyright (c) 2011-2021 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createIcon} from '../components/icon';

/** Just a circle icon */
export const BoxplotIcon = createIcon(() => (
    <svg viewBox="0 0 20 20">
        <path
            className="gs-svg-icon-fill"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2v3h-2v10h2v3h1v-3h2V5h-2V2h-1zm.5 4h.5v8h-2V6h1.5zm-8-1H6V3h1v2h2v6H7v5H6v-5H4V5h.5zM5 9.5V6h2v4H5v-.5z"
        />
    </svg>
));
