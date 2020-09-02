/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';

import {MenuItem} from '../menu';

import {Props as EmitterProps} from './emitter';
import {SelectContext} from './select-context';
import {SelectMenu} from './select-menu';
import {SelectNative} from './select-native';

type TargetProps = React.SelectHTMLAttributes<HTMLSelectElement | HTMLDivElement>;

/** Select value type */
export type SelectValueType = string | number;

/** Select change handler */
export type OnChangeSelectHandler = (
    value: SelectValueType,
    event: React.ChangeEvent<HTMLSelectElement> | React.SyntheticEvent,
    ref?: MenuItem
) => void;

/** All props for select */
interface SelectWrapperProps {
    /** Use native select instead Menu (default false) */
    native?: boolean;
    /** Select value */
    value: SelectValueType;
    /**
     * Select onChange handler
     * if native select is used, has arguments - value: string, React.ChangeEvent<HTMLSelectElement>
     * if Menu is used, has arguments - value: string | number, React.SyntheticEvent, ref: MenuItem
     */
    onValueChange: OnChangeSelectHandler;
    /**
     * Select Emitter props
     */
    emitterProps?: Partial<EmitterProps>;
    /** Sets `invalid` styles for select */
    invalid?: boolean;
}

/** Select public properties */
export type Props = SelectWrapperProps;

/** Select wrapper */
export function Select({native, emitterProps = {}, ...restProps}: Props & TargetProps) {
    const Component = native ? SelectNative : SelectMenu;
    const {invalid, intent, ghost} = emitterProps;

    return (
        <SelectContext.Provider
            value={{
                native,
                ghost,
                intent,
                invalid,
                disabled: restProps.disabled
            }}
        >
            <Component emitterProps={emitterProps} {...restProps} />
        </SelectContext.Provider>
    );
}
