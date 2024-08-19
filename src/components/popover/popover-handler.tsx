/*
 * Copyright (c) 2011-2021 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import * as React from 'react';

import {Popover, Props as PopoverProps} from './popover';
import {usePopoverHandler} from './use-popover-handler';

interface ChildProps {
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
}

/** PopoverHandler public properties */
export interface Props extends Omit<PopoverProps, 'open' | 'referenceElement' | 'children'> {
    children: React.ReactNode;
    popoverContent: React.ReactNode;
    openDelay?: number;
    closeDelay?: number;
}

/**
 * Popover handler.
 * It listens hover on the reference element and shows/hide content with customizable delay.
 */
export const PopoverHandler = React.forwardRef<HTMLElement, Props>(function PopoverHandler(
    props,
    ref
) {
    const {openDelay, closeDelay, children, popoverContent, ...rest} = props;
    const childRef = React.useRef<HTMLElement>(null);

    const popoverHandler = usePopoverHandler({
        referenceElement: childRef.current,
        openDelay,
        closeDelay
    });

    const renderChild = () => {
        const child = children as React.ReactElement<ChildProps>;

        return React.cloneElement(child, popoverHandler.getReferenceProps(child.props));
    };

    const renderContent = () => {
        const content = popoverContent as React.ReactElement;

        return React.cloneElement(content, popoverHandler.getPopoverContentProps(content.props));
    };

    return (
        <React.Fragment>
            {renderChild()}
            <Popover
                open={popoverHandler.isOpen}
                referenceElement={popoverHandler.referenceElement}
                placement="left"
                positionFixed
                portalContainer={document.body}
                modifiers={[
                    {
                        name: 'preventOverflow',
                        options: {
                            altAxis: true
                        }
                    }
                ]}
                roundCorners
                withArrow
                {...rest}
                ref={ref}
            >
                {renderContent()}
            </Popover>
        </React.Fragment>
    );
});
