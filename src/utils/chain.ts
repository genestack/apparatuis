/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/**
 * Chain all functions in single one.
 */
export function chain<T extends (...args: any[]) => void>(
    ...items: Array<T | undefined>
): T | undefined {
    const funcs = items.filter(Boolean);

    if (!funcs.length) {
        return undefined;
    }

    return funcs.reduce<T>(
        (acc, func) => {
            if (!func) {
                return acc;
            }

            return ((...args) => {
                acc(...args);
                func(...args);
            }) as T;
        },
        // tslint:disable-next-line no-empty
        (() => {}) as T
    );
}
