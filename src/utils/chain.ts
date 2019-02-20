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
export function chain<T extends (...args: any[]) => void>(...funcs: Array<T | undefined>): T {
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
