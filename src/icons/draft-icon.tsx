/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createIcon} from '../components/icon';

/** Icon with blank list and pencil */
export const DraftIcon = createIcon(() => (
    <svg viewBox="0 0 20 20">
        <path
            className="gs-svg-icon-fill"
            d="M4 7.407a1 1 0 01.293-.7l3.414-3.414A1 1 0 018.414 3H13.5a.5.5 0 110 1H9v3a1 1 0 01-1 1H5v7.5a.51.51 0 00.166.334A.51.51 0 005.5 16h9a.51.51 0 00.334-.166A.51.51 0 0015 15.5v-6a.5.5 0 011 0v6c0 .413-.201.783-.459 1.041-.258.258-.628.459-1.041.459h-9c-.413 0-.783-.201-1.041-.459C4.201 16.283 4 15.913 4 15.5V7.407zM5.414 7L8 4.414V7H5.414z"
        />
        <path className="gs-svg-icon-fill" d="M15 4s1-1 2 0 0 2 0 2l-6 6-3 1 1-3 6-6z" />
    </svg>
));
