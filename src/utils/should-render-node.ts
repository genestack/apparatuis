/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import * as React from 'react';

/**
 * returns true for all the nodes that is feasible to render (e.g. 0, but not false)
 * based on https://git.io/fjbnj
 */
export function shouldRenderNode(
    node: React.ReactNode
): node is Exclude<React.ReactNode, null | boolean | undefined> {
    const type = typeof node;

    if (type === 'undefined' || type === 'boolean') {
        return false;
    }

    return node !== null && node !== '';
}
