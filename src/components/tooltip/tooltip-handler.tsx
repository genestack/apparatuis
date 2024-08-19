/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {Props as TooltipProps} from './tooltip';
import {useTooltipHandler} from './use-tooltip-handler';

interface ChildProps {
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    onFocus?: React.FocusEventHandler;
    onBlur?: React.FocusEventHandler;
    ref?: React.Ref<unknown>;
}

type TooltipElement = React.ReactElement<TooltipProps> | null | undefined;
type TooltipProp = TooltipElement | (() => TooltipElement);

type ChildrenRenderProp =
    | ((state: {open: boolean}) => React.ReactElement<ChildProps>)
    | React.ReactElement<ChildProps>;

/** TooltipHandler public properties */
export interface Props {
    /** Tooltip React element that will be shown on tooltip open */
    tooltip?: TooltipProp;
    /** Tooltip will be shown near reference element passed as children */
    children: ChildrenRenderProp;
    /** Disable all listeners that could open a tooltip */
    disableListeners?: boolean;
    /** Disable focus listener */
    disableFocusListener?: boolean;
    /** Disable mouse events listener */
    disableHoverListener?: boolean;
    /**
     * Delay before tooltip will be shown (default 500ms).
     * This property could not be updated without remounting component.
     */
    openDelay?: number;
}

/** Imperative TooltipHandler API */
export interface TooltipHandlerApi {
    open: () => void;
    close: () => void;
}

/**
 * Common tooltip handler.
 * It listens hover and focus on the reference element.
 */
export const TooltipHandler = React.forwardRef<TooltipHandlerApi, Props>(function TooltipHandlerRef(
    props,
    ref
) {
    const childRef = React.useRef<HTMLElement>(null);

    const tooltipHandler = useTooltipHandler({
        disableFocusListener: props.disableFocusListener,
        disableHoverListener: props.disableHoverListener,
        disableListeners: props.disableListeners,
        referenceElement: childRef.current,
        openDelay: props.openDelay
    });

    React.useImperativeHandle(
        ref,
        () => ({
            close: tooltipHandler.close,
            open: tooltipHandler.open
        }),
        []
    );

    const renderChild = () => {
        const child = (
            typeof props.children === 'function'
                ? props.children({open: tooltipHandler.isOpen})
                : props.children
        ) as React.ReactElement<ChildProps>;

        return React.cloneElement(child, {
            ...tooltipHandler.getReferenceProps(child.props),
            ref: childRef
        });
    };

    const renderTooltip = () => {
        const tooltip = tooltipHandler.isOpen
            ? typeof props.tooltip === 'function'
                ? props.tooltip()
                : props.tooltip
            : null;

        return tooltip && tooltipHandler.isOpen
            ? React.cloneElement(tooltip, tooltipHandler.getTooltipProps(tooltip.props))
            : null;
    };

    return (
        <React.Fragment>
            {renderChild()}
            {renderTooltip()}
        </React.Fragment>
    );
});
