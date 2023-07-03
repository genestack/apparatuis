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
 * Two human figures, one of which is bigger
 */
export const UserGroupIcon = createIcon(
    <svg viewBox="0 0 20 20">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 16c0-1.2 1.2-1.8 2.4-2.4.287-.144.587-.268.875-.388.916-.38 1.727-.716 1.727-1.498 0-.753-.268-.954-.607-1.21a3.196 3.196 0 01-.392-.333c-.499-.514-.998-1.542-.998-3.085C4.005 5.382 5.345 4 7 4c1.654 0 2.995 1.029 2.995 3.086 0 1.543-.5 2.571-.999 3.085a3.195 3.195 0 01-.391.333c-.34.256-.607.457-.607 1.21 0 .782.81 1.118 1.726 1.498.289.12.588.244.876.388.242.121.484.242.716.368l.14-.059c.687-.285 1.295-.537 1.295-1.123 0-.565-.2-.716-.455-.908a2.4 2.4 0 01-.294-.25c-.374-.385-.748-1.157-.748-2.314C11.254 8.036 12.259 7 13.5 7c1.24 0 2.246.771 2.246 2.314 0 1.157-.374 1.929-.749 2.315a2.4 2.4 0 01-.293.249c-.255.192-.456.343-.456.908 0 .586.608.838 1.295 1.123.217.09.441.183.657.291.9.45 1.8.9 1.8 1.8H1z"
            className="gs-svg-icon-fill"
        />
    </svg>
);
