/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

// tslint:disable-next-line:match-default-export-name
import RcTooltip from 'rc-tooltip';
import React from 'react';

import './tooltip.css';

type TargetProps = RcTooltip['props'];

/** Tooltip public properties */
export interface Props extends TargetProps {}

/**
 * RcTooltip wrapper
 */
export const Tooltip = (props: Props) => <RcTooltip prefixCls="genestack-ui-tooltip" {...props} />;
