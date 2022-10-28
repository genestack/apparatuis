/*
 * Copyright (c) 2011-2021 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

/**
 * Returns the type without index signature.
 *
 * @example
 *
 * interface Foo {
 *   bar?: string;
 *   baz: () => void;
 *   [key: string]: any;
 * }
 *
 * type Bar = OmitIndexSignature<Foo>; // type Bar = { bar?: string; baz: () => void }
 */
export type OmitIndexSignature<T extends Record<any, any>> = {
    [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};
