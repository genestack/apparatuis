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
 * Trash Icon
 */
export const TrashIcon = createIcon(
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4L16 4V5L4 5V4L8 4ZM10 3C10.5523 3 11 3.44772 11 4L9 4C9 3.44772 9.44771 3 10 3Z"
            className="gs-svg-icon-fill"
        />
        <path d="M8 8H9V14H8V8Z" className="gs-svg-icon-fill" />
        <path d="M12 8H11V14H12V8Z" className="gs-svg-icon-fill" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 6V14.5C5 15.8807 6.11929 17 7.5 17H12.5C13.8807 17 15 15.8807 15 14.5V6H5ZM6 14.5V7L14 7V14.5C14 15.3284 13.3284 16 12.5 16H7.5C6.67157 16 6 15.3284 6 14.5Z"
            className="gs-svg-icon-fill"
        />
    </svg>
);
