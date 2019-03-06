/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

/**
 * React.Ref without deprecated string value.
 * TODO: Remove after react update.
 */
export type Ref<T> = Exclude<React.Ref<T>, string>;

/**
 * Manually update value of React.Ref.
 */
export function setRef<T>(ref: Ref<T>, value: T) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref) {
        // ref.current is readonly, but not for us
        (ref as any).current = value;
    }
}

/**
 * Like functions chain but works with React.Refs.
 * It is useful when some component needs child's ref
 * but also should expose it the parent component.
 */
export function chainRefs<T>(...refs: Array<Ref<T> | undefined>) {
    return (value: T) => {
        refs.forEach((ref) => {
            if (ref) {
                setRef(ref, value);
            }
        });
    };
}
