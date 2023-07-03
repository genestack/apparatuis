/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react';

export type DataAttributes = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [P in keyof any as `data-${string}`]: string;
};

export type SlotProps<T extends React.ElementType> = React.ComponentPropsWithRef<T> &
    DataAttributes;
