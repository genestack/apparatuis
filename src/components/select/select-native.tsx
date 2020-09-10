/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';

import {chain, chainRefs} from '../../utils';
import {useControlInvalidity} from '../../utils/use-constol-invalidity';

import {CommonSelectProps} from './common-select-props';
import {Emitter} from './emitter';
import * as styles from './select-native.module.css';

/** Native Select Props */
export interface Props extends CommonSelectProps {
    /** Use native select instead Menu (default false) */
    native: true;
    /** Select onChange handler */
    onValueChange?: (value: string | number, event: React.ChangeEvent<HTMLSelectElement>) => void;
    /** Other native select props */
    selectProps?: React.ComponentPropsWithRef<'select'>;
}

/** Native select */
export function SelectNative(props: Props) {
    const {selectProps, value, onValueChange, ...rest} = props;

    const selectRef = React.useRef<HTMLSelectElement | null>(null);

    const invalidState = useControlInvalidity(selectRef, rest.invalid);

    const handleValueChange =
        onValueChange &&
        ((e: React.ChangeEvent<HTMLSelectElement>) => {
            onValueChange(e.target.value, e);
        });

    return (
        <Emitter
            {...rest}
            className={classNames(rest.className, styles.root)}
            invalid={invalidState}
        >
            <select
                {...selectProps}
                value={value}
                className={classNames(styles.select, selectProps?.className)}
                ref={chainRefs(selectProps?.ref, selectRef)}
                onChange={chain(selectProps?.onChange, handleValueChange)}
                disabled={rest.disabled}
            >
                {rest.children}
            </select>
        </Emitter>
    );
}
