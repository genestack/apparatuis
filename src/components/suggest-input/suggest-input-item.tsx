/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {ListItem, ListItemProps} from '../list';

/** SuggestInputItem public properties */
export interface Props extends Omit<ListItemProps, 'interactive'> {
    value?: string;
}

/** Shortcut to `ListItem` with string value property for usage in `SuggestInput` */
export const SuggestInputItem = (props: Props) => {
    const {value, ...rest} = props;

    return <ListItem {...rest} interactive />;
};
