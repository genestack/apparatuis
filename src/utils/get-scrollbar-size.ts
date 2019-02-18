/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

interface Options {
    force?: boolean;
}

let memoizeSize: number | null = null;

/**
 * Returns browser scrollbar width.
 */
export function getScrollbarSize(options: Options = {}) {
    const {force} = options;

    if (memoizeSize === null || force) {
        const scrollDiv = window.document.createElement('div');

        scrollDiv.style.position = 'absolute';
        scrollDiv.style.top = '-9999px';
        scrollDiv.style.width = '50px';
        scrollDiv.style.height = '50px';
        scrollDiv.style.overflow = 'scroll';

        window.document.body.appendChild(scrollDiv);
        memoizeSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
    }

    return memoizeSize;
}
