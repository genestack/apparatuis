/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

/**
 * Manually update value of React.Ref.
 */
export function setRef<T>(ref: React.Ref<T>, value: T) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref) {
        // ref.current is readonly, but not for us
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ref as any).current = value;
    }
}

/**
 * Like functions chain but works with React.Refs.
 * It is useful when some component needs child's ref
 * but also should expose it the parent component.
 */
export function chainRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
    return (value: T | null) => {
        refs.forEach((ref) => {
            if (ref) {
                setRef(ref, value);
            }
        });
    };
}
