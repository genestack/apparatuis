/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

/**
 * Returns that `element` has visible vertical scroll bar.
 * Take in account the `body` element specific.
 */
export function hasVerticalScrollbar(element: HTMLElement) {
    if (element instanceof HTMLBodyElement) {
        const style = window.getComputedStyle(element);
        const marginLeft = parseInt(style.getPropertyValue('margin-left'), 10);
        const marginRight = parseInt(style.getPropertyValue('margin-right'), 10);

        return marginLeft + element.clientWidth + marginRight < window.innerWidth;
    }

    return element.scrollHeight > element.clientHeight;
}
