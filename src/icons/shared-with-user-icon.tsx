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
        <path
            d="M9.66667 12.8846C8.63018 13.4108 8.11988 13.336 8.01891 14.4994C7.99503 14.7745 8.22265 15 8.4988 15L13 15H17.5C17.7761 15 18.005 14.7745 17.9811 14.4994C17.8801 13.336 17.3698 13.4108 16.3333 12.8846C15.1667 12.2923 13.8333 11.6154 13.8333 10.7692C13.8333 9.92308 14.4558 9.75384 14.9411 9.24615C15.4263 8.73846 15.5 8.48462 15.5 6.96154C15.5 4.84615 14.25 4 13 4C11.75 4 10.5 4.84615 10.5 6.96154C10.5 8.48462 10.5736 8.73846 11.0589 9.24615C11.5442 9.75384 12.1667 9.92308 12.1667 10.7692C12.1667 11.6154 10.8333 12.2923 9.66667 12.8846Z"
            className="gs-svg-icon-fill"
        />
        <path
            d="M2 10H8.25M8.25 10L5 6.5M8.25 10L5 13.5"
            className="gs-svg-icon-stroke"
            strokeWidth="2"
        />
    </svg>
);
