/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

/**
 * Removes some keys from target type
 *
 * @example
 *
 * type Foo = { foo: string; bar: number; baz: boolean };
 * type WithoutFoo = Omit<Foo, 'foo'>; // type WithoutFoo = { bar: number; baz: boolean }
 * type OnlyFoo = Omit<Foo, 'bar' | 'baz'>; // type OnlyFoo = { foo: string }
 */
export type Omit<T, K extends keyof T> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;
