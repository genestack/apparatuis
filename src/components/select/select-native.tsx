/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';

import {useControlInvalidity} from '../../utils/use-constol-invalidity';

import {SelectProps} from './';
import {Emitter} from './emitter';
import * as styles from './select-native.module.css';
import {getSelectLabel} from './utils';

type TargetProps = React.SelectHTMLAttributes<HTMLSelectElement>;
type Props = TargetProps & SelectProps;

/** Native select */
export function SelectNative(props: Props) {
    const {
        className,
        placeholder,
        value,
        onValueChange,
        children,
        emitterProps = {},
        disabled,
        ...restProps
    } = props;

    const selectRef = React.useRef<HTMLSelectElement>(null);

    const invalidState = useControlInvalidity(selectRef, emitterProps?.invalid);
    const label = getSelectLabel(children, value);

    const handleChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
        (e) => {
            onValueChange(e.target.value, e);
        },
        [onValueChange]
    );

    return (
        <Emitter
            label={label}
            {...emitterProps}
            className={classNames(emitterProps?.className, styles.root)}
            invalid={invalidState}
            disabled={disabled}
        >
            <select
                data-qa="select"
                className={styles.select}
                value={value}
                onChange={handleChange}
                ref={selectRef}
                {...restProps}
            >
                {children}
            </select>
        </Emitter>
    );
}
