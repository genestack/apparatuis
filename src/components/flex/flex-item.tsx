/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {Flex, Props as FlexProps} from './flex';

/** FlexItem public properties */
export interface Props extends Omit<FlexProps, 'children'>, React.HTMLAttributes<HTMLDivElement> {}

/** Helper component to make flex layouts with paddings */
export const FlexItem = React.forwardRef<HTMLDivElement, Props>(function FlexItem(
    props: Props,
    ref
) {
    return (
        <Flex {...props}>
            <div ref={ref}>{props.children}</div>
        </Flex>
    );
});
