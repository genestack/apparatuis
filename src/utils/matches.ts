/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/** IE11 polyfill for Element.prototype.matches */
export function matches(element: Element, selector: string) {
    // ie 11
    if ((element as any).msMatchesSelector) {
        return (element as any).msMatchesSelector(selector) as boolean;
    }

    return element.matches(selector);
}
