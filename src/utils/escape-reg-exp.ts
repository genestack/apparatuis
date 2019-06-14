/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
const matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;

/** Escape string for use in Javascript regex */
export const escapeRegExp = (value: string) => value.replace(matchOperatorsRegex, '\\$&');
