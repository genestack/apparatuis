/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {Grow, GrowProps, GrowTransformOrigin} from '../grow';
import {TransitionPopperChildrenProps, TransitionPopperPlacement} from '../transition-popper';

const transformByPlacement: {[key in TransitionPopperPlacement]?: GrowTransformOrigin} = {
    top: 'bottom center',
    'top-start': 'bottom left',
    'top-end': 'bottom right',
    right: 'center left',
    'right-start': 'top left',
    'right-end': 'bottom left',
    bottom: 'top center',
    'bottom-start': 'top left',
    'bottom-end': 'top right',
    left: 'center right',
    'left-start': 'top right',
    'left-end': 'bottom right'
};

/** PopperGrow public properties */
export interface Props extends GrowProps {
    disableTransition?: boolean;
    placement?: TransitionPopperChildrenProps['placement'];
    children: React.ReactElement;
    open?: boolean;
}

/** Internal Grow transition for popover. */
export const PopoverGrow = React.forwardRef<HTMLElement, Props>(function PopoverGrow(props, ref) {
    const {disableTransition, children, placement, open, ...rest} = props;

    return disableTransition ? (
        children
    ) : (
        <Grow
            {...rest}
            in={open}
            appear
            transformOrigin={
                rest.transformOrigin ||
                (placement && transformByPlacement[placement]) ||
                'center center'
            }
            ref={ref}
        >
            {children}
        </Grow>
    );
});
