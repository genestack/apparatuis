/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react'
import RcTooltip from 'rc-tooltip'
import classNames from 'classnames'
import './tooltip.css'


const Tooltip: React.SFC<TooltipProps> = ({children, isError = false, overlayClassName = '', ...props}) =>
        <RcTooltip
            prefixCls="genestack-ui-tooltip"
            overlayClassName={classNames(overlayClassName, {
                'genestack-ui-tooltip--error': isError
            })}
            {...props}
        >
            {children}
        </RcTooltip>

type TooltipProps =
    & RcTooltip['props']
    & {
        children
        isError? : boolean
        overlayClassName?: string
    }

export default Tooltip
