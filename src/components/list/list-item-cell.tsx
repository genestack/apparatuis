/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {FlexItem, FlexItemProps} from '../flex';

/** ListItemCell public properties */
export interface Props extends FlexItemProps {}

/**
 * Single unit of list item. It is needed for harmonic look list item parts.
 */
export const ListItemCell = (props: Props) => {
    const container = typeof props.children !== 'string';

    return <FlexItem container={container} gap={1} {...props} />;
};
