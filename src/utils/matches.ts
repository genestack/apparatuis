/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
/** IE11 polyfill for Element.prototype.matches */
export function matches(element: Element, selector: string) {
    // ie 11
    if ((element as any).msMatchesSelector) {
        return (element as any).msMatchesSelector(selector) as boolean;
    }

    return element.matches(selector);
}
