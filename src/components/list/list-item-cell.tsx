/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {Flex} from '../flex';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** ListItemCell public properties */
export interface Props extends TargetProps {
    grow?: boolean;
    shrink?: boolean;
}

/**
 * Single unit of list item. It is needed for harmonic look list item parts.
 */
export const ListItemCell = (props: Props) => {
    const {grow, shrink, ...rest} = props;

    const container = typeof rest.children !== 'string';

    return (
        <Flex cell container={container} grow={grow} shrink={shrink}>
            <div {...rest} />
        </Flex>
    );
};
