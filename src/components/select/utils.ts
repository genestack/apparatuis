/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';

import {Option, OptionProps} from './';

// FIXME use selectContext instead this after fixing Menu (Menu must support the "keepMounted" property)
/** finds Option, skips fragments and other react elements */
function findSelectedOption(
    value: number | string,
    children: React.ReactNode
): React.ReactElement<OptionProps> | null {
    let selectedChild = null;

    for (const child of React.Children.toArray(children)) {
        if (selectedChild) {
            return selectedChild;
        }

        if (!React.isValidElement(child)) {
            return null;
        }

        if ((child.type === Option || child.type === 'option') && child.props.value === value) {
            return child as React.ReactElement<OptionProps>;
        }

        selectedChild = findSelectedOption(value, child.props.children);
    }

    return selectedChild;
}

/** Get select label from Options */
export const getSelectLabel = (children: React.ReactNode, selectValue?: number | string) => {
    if (!selectValue) {
        return null;
    }

    const selectedOption = findSelectedOption(selectValue, children);
    if (!selectedOption) {
        return null;
    }

    const {label, value} = selectedOption.props;

    return label ?? value ?? null;
};
