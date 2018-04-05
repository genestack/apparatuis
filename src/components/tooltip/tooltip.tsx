/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';
import RcTooltip from 'rc-tooltip';
import classNames from 'classnames';
import './tooltip.css';

export default ({isError = false, overlayClassName = '', ...props}: TooltipProps) =>
        <RcTooltip
            prefixCls='genestack-ui-tooltip'
            overlayClassName={
                classNames(overlayClassName, {
                    'genestack-ui-tooltip--error': isError
                })
            }
            {...props}
        />;

export type TooltipProps =
    & RcTooltip['props']
    & {
        isError?: boolean
        overlayClassName?: string
    };
