/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {Flex} from '../flex';
import {Typography, TypographyProps} from '../typography';

type TargetProps = TypographyProps;

/** ListItemText public properties */
export interface Props extends TargetProps {
    noGrow?: boolean;
    noShrink?: boolean;
    wrap?: boolean;
}

/**
 * List item main element.
 */
export const ListItemText = (props: Props) => {
    const {noGrow, noShrink, wrap, ...rest} = props;

    const container = typeof props.children !== 'string';

    return (
        <Flex
            grow={!noGrow}
            shrink={!noShrink}
            ellipsis={!wrap}
            container={container}
            baseline={container}
            gap={1}
        >
            <Typography as="div" {...rest} />
        </Flex>
    );
};
