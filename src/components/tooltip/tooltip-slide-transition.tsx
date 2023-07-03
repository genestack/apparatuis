/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {SlideProps, Slide} from '../slide';
import {TransitionPopperChildrenProps} from '../transition-popper';

const getSlideDirection = (
    placement: TransitionPopperChildrenProps['placement']
): SlideProps['direction'] => {
    if (placement) {
        if (placement.startsWith('bottom')) {
            return 'bottom';
        }

        if (placement.startsWith('right')) {
            return 'right';
        }

        if (placement.startsWith('left')) {
            return 'left';
        }
    }

    return 'top';
};

/** TooltipSlide public properties */
export interface Props extends SlideProps {
    disableTransition?: boolean;
    placement?: TransitionPopperChildrenProps['placement'];
    open?: boolean;
}

/** Internal TooltipSlide transition for tooltip. */
export const TooltipSlide = (props: Props) => {
    const {
        disableTransition,
        children,
        placement,
        open,
        direction = getSlideDirection(placement),
        fast = true,
        ...rest
    } = props;

    return disableTransition ? (
        children
    ) : (
        <Slide {...rest} in={open} direction={direction} fast={fast}>
            {children}
        </Slide>
    );
};
