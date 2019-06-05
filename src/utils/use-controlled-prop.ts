/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {useState} from 'react';

/**
 * Use state for uncontrolled properties.
 * @see https://github.com/jquense/uncontrollable
 */
export function useControlledProp<T>(value?: T, onValueChange?: (value: T) => void) {
    const [stateValue, setStateValue] = useState(value);

    const isUncontrolled = value === undefined;

    const handledValue = isUncontrolled ? stateValue : value;

    const handleChange = (updatedValue: T) => {
        if (isUncontrolled) {
            setStateValue(updatedValue);
        } else if (onValueChange) {
            onValueChange(updatedValue);
        }
    };

    return [handledValue, handleChange] as [typeof handledValue, typeof handleChange];
}
