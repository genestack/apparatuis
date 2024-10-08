/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Popper, PopperProps, PopperChildrenProps} from 'react-popper';

type TargetProps = Omit<PopperProps<any>, 'referenceElement' | 'children'>;

/** Alias for popper reference */
export type TransitionPopperPlacement = PopperChildrenProps['placement'];

/** TransitionPopperChildrenProps  */
export type TransitionPopperChildrenProps<T = any> = Omit<PopperChildrenProps, 'placement'> & {
    targetProps: T;
    onTransitionExited: () => void;
    placement?: TransitionPopperPlacement;
};

type PopperReferenceElement = PopperProps<any>['referenceElement'] | null;
type ReferenceElement = PopperReferenceElement | (() => PopperReferenceElement);

interface InnerProps<T> extends TargetProps {
    /** If `true` popover is visible */
    open?: boolean;
    /**
     * DOM element, or a function that returns the DOM element
     * (or DOM-like object @see PopperJS.ReferenceObject),
     * that will be used to set the position of the popover.
     * The return value will passed as the reference object of the @popperjs/core
     * instance.
     */
    referenceElement?: ReferenceElement;
    /**
     * Always keep the children in the DOM.
     * This property can be useful in SEO situation or
     * when you want to maximize the responsiveness of the Popper.
     */
    keepMounted?: boolean;
    /** Do not run transition on popover opening and closing */
    disableTransition?: boolean;
    /** Element that will be used for portal if passed */
    portalContainer?: Element;
    children: (props: TransitionPopperChildrenProps<T>) => React.ReactNode;
    positionFixed?: boolean;
}

/** TransitionPopper */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Props<T = any> = T & InnerProps<T>;

interface State {
    exited: boolean;
}

/**
 * It is a wrapper around react-popper
 * with portal support, transitions and unmounting on close.
 *
 * It is generic to handy API. This component omit popper's properties
 * and left target's `T` properties for handy API.
 * @ATTENTION Be careful. Targets properties must not conflict with TransitionPopperProps
 */
export class TransitionPopper<T> extends React.Component<Props<T>, State> {
    public static getDerivedStateFromProps(props: Props, state: State): State {
        if (props.open) {
            return {
                exited: false
            };
        }

        return state;
    }

    private popperScheduleUpdate: (() => void) | null = null;

    public state: State = {
        exited: true
    };

    private handleTransitionExited = () => {
        this.setState({exited: true});
    };

    /**
     * Recalculate position of popper.
     * Call it when any user action changes reference element position.
     */
    public scheduleUpdate() {
        if (this.popperScheduleUpdate) {
            this.popperScheduleUpdate();
        }
    }

    public render() {
        const {
            open,
            referenceElement,
            keepMounted,
            disableTransition,
            portalContainer,
            children,
            innerRef,
            modifiers,
            placement,
            positionFixed,
            // omit all popper's properties
            ...targetProps
        } = this.props as InnerProps<T>;

        const {exited} = this.state;

        if (!keepMounted && !open && (exited || disableTransition)) {
            return null;
        }

        const element =
            (typeof referenceElement === 'function' ? referenceElement() : referenceElement) ||
            undefined;

        const popper = (
            <Popper
                strategy={positionFixed ? 'fixed' : 'absolute'}
                placement={placement}
                referenceElement={element || undefined}
                innerRef={innerRef}
                modifiers={modifiers}
            >
                {(popperChildrenProps) =>
                    children({
                        ...popperChildrenProps,
                        ref: (node) => {
                            if (typeof popperChildrenProps.ref === 'function') {
                                popperChildrenProps.ref(node);
                            }
                            this.popperScheduleUpdate = popperChildrenProps.update;
                        },
                        targetProps: targetProps as T,
                        onTransitionExited: this.handleTransitionExited
                    })
                }
            </Popper>
        );

        return portalContainer ? ReactDOM.createPortal(popper, portalContainer) : popper;
    }
}
