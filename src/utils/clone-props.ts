/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';

interface Props<P> {
    children: (props: P) => React.ReactElement<P>;
}

/**
 *  Cloning props to children elements
 *
 *  @example
 *  <CloneProps>
 *      {tabProps => (
 *          <Tooltip title="can't change back">
 *              <Tab {...tabProps} />
 *          </Tooltip>
 *      )}
 *  </CloneProps>
 */
export function CloneProps<P extends Props<Omit<P, 'children'>>>({children, ...restProps}: P) {
    return children(restProps);
}
