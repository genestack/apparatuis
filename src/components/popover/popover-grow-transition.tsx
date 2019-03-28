/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {GrowProps, Grow} from '../grow';
import {TransitionPopperChildrenProps} from '../transition-popper';

// tslint:disable-next-line: cyclomatic-complexity
const getGrowTransformOrigin = (
    placement: TransitionPopperChildrenProps['placement']
): GrowProps['transformOrigin'] => {
    if (placement === 'top') {
        return 'bottom center';
    }
    if (placement === 'top-start') {
        return 'bottom left';
    }
    if (placement === 'top-end') {
        return 'bottom right';
    }
    if (placement === 'right') {
        return 'center left';
    }
    if (placement === 'right-start') {
        return 'top left';
    }
    if (placement === 'right-end') {
        return 'bottom left';
    }
    if (placement === 'bottom') {
        return 'top center';
    }
    if (placement === 'bottom-start') {
        return 'top left';
    }
    if (placement === 'bottom-end') {
        return 'top right';
    }
    if (placement === 'left') {
        return 'center right';
    }
    if (placement === 'left-start') {
        return 'top right';
    }
    if (placement === 'left-end') {
        return 'bottom right';
    }

    return 'center center';
};

/** PopperGrow public properties */
export interface Props extends GrowProps {
    disableTransition?: boolean;
    placement?: TransitionPopperChildrenProps['placement'];
    children: JSX.Element;
    open?: boolean;
}

/** Internal Grow transition for popover. */
export const PopoverGrow = (props: Props) => {
    const {disableTransition, children, placement, open, ...rest} = props;

    return disableTransition ? (
        children
    ) : (
        <Grow
            {...rest}
            in={open}
            appear
            transformOrigin={rest.transformOrigin || getGrowTransformOrigin(placement)}
        >
            {children}
        </Grow>
    );
};
