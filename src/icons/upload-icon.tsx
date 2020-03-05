/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createIcon} from '../components/icon';

/** Icon to indicate that user could upload some file */
export const UploadIcon = createIcon(
    <svg viewBox="0 0 20 20">
        <path
            className="gs-svg-icon-fill"
            d="M9 3a3.5 3.5 0 00-3.246 4.812l.279.688H4.5a1.5 1.5 0 00-.5 2.915v1.035a2.5 2.5 0 01.5-4.95h.112a4.5 4.5 0 018.655-2.433A4 4 0 0117.465 11h-1.229a3 3 0 00-3.167-4.853l-.53.173-.114-.545A3.502 3.502 0 009 3z"
        />
        <path
            className="gs-svg-icon-fill"
            d="M16 14c-.39.39-1.11.39-1.5 0L12 11.5V18a1 1 0 11-2 0v-6.5L7.5 14c-.39.39-1.11.39-1.5 0-.39-.39-.39-1.11 0-1.5L11 8l5 4.5c.39.39.39 1.11 0 1.5z"
        />
    </svg>
);
