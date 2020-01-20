/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/**
 * Returns keys union from the type that have certain keys and index signature.
 *
 * @example
 *
 * interface Foo {
 *   bar?: string;
 *   baz: () => void;
 *   [key: string]: any;
 * }
 *
 * type Bar = KnownKeys<Foo>; // type Bar = 'bar' | 'baz'
 */
export type KnownKeys<T> = {
    [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends {[_ in keyof T]: infer U}
    ? U
    : never;

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
export type OmitIndexSignature<T extends Record<any, any>> = Pick<T, KnownKeys<T>>;
