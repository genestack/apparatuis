/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';

import {MenuItem} from '../menu';

import {SelectValueType} from './select';
import {useSelectContext} from './select-context';

/** Option props */
export interface Props {
    /** Option value */
    value: SelectValueType;
    /** Option label used for render in SelectWrapper */
    label?: React.ReactNode;
}

/** Option component for Select */
export function Option<AnyProps = {}>({label, ...restProps}: Props & AnyProps) {
    const {native} = useSelectContext();
    const Component = native ? 'option' : MenuItem;

    return <Component {...restProps} />;
}
