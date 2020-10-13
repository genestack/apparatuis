/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';

import {OverridableProps, chain} from '../../utils';
import {TabsContext} from '../tabs';

import {TypeMap} from './tab';

/**
 * Hook uses tab context.
 * Modifies props values based on context.
 * If used out of context, the properties remain unchanged
 */
export const useTabProps = (props: OverridableProps<TypeMap>) => {
    const contextValues = React.useContext(TabsContext);

    if (!contextValues) {
        return props;
    }

    const {onClick, value, ...restProps} = props;

    const handleClick = React.useCallback(() => {
        if (contextValues.onValueChange) {
            contextValues.onValueChange(value);
        }
    }, [contextValues.onValueChange, value]);

    return {
        value,
        onClick: chain(handleClick, onClick),
        selected: contextValues.value === value,
        variant: contextValues.variant,
        size: contextValues.size,
        ...restProps
    };
};
