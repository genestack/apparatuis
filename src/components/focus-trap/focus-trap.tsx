/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {chain} from '../../utils/chain';
import {
    isElementFocusable,
    getFocusDirection,
    getSiblingElement,
    isElementReachable,
    getReachableElements,
    getFocusableElements,
    getFirstReachableElement,
    getLastReachableElement
} from '../../utils/focusable-elements';
import {Omit} from '../../utils/omit';
import {Ref} from '../../utils/set-ref';
import {RootRef} from '../root-ref';

type SentinelProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'tabIndex'>;

/** FocusTrap public properties */
export interface Props {
    /** Trap focus when component is mounted */
    focusOnMount?: boolean;
    /** Properties of start sentinel */
    startSentinelProps?: SentinelProps;
    /** Start sentinel React.Ref */
    startSentinelRef?: Ref<HTMLDivElement>;
    /** Properties of end sentinel */
    endSentinelProps?: SentinelProps;
    /** End sentinel React.Ref */
    endSentinelRef?: Ref<HTMLDivElement>;
    children: JSX.Element;
}

function focusElement(element: HTMLElement | null) {
    if (element && element !== document.activeElement) {
        element.focus();
    }
}

function getReachableElementOrSelfInContainer(container: HTMLElement, direction: 'next' | 'prev') {
    let element =
        direction === 'next'
            ? getFirstReachableElement(container)
            : getLastReachableElement(container);

    if (!element && isElementFocusable(container)) {
        element = container;
    }

    return element;
}

function getSiblingReachableElement(element: HTMLElement, direction: 'next' | 'prev') {
    if (!element.parentElement) {
        return null;
    }

    return getSiblingElement(
        Array.from(getReachableElements(element.parentElement)),
        element,
        direction
    );
}

/**
 * Component that trap focus in `children`.
 * When user focuses in some element inside children
 * he could not focus element outside this trap by `Tab` key.
 * It is useful when modal overlay has shown to disable
 * all page content under the overlay for focusing.
 *
 * Uses two "sentinel" elements with `tabIndex = 0`
 * before and after root container to prevent
 * browser blur out the trap. This practice is used in W3C dialog example.
 *
 * @see https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html
 */
export class FocusTrap extends React.Component<Props> {
    private trapRef = React.createRef<HTMLDivElement>();
    private activeElementOnMount: HTMLElement | null = null;

    public componentDidMount() {
        const trapElement = this.trapRef.current;

        if (this.props.focusOnMount && trapElement) {
            if (document.activeElement instanceof HTMLElement) {
                this.activeElementOnMount = document.activeElement;
            }

            if (isElementFocusable(trapElement)) {
                focusElement(trapElement);
            } else {
                const focusableElements = getFocusableElements(trapElement);
                focusElement(focusableElements.item(0));
            }
        }
    }

    public componentWillUnmount() {
        const {activeElementOnMount} = this;

        if (activeElementOnMount && document.contains(activeElementOnMount)) {
            activeElementOnMount.focus();

            if (
                activeElementOnMount instanceof HTMLBodyElement &&
                document.activeElement instanceof HTMLElement
            ) {
                document.activeElement.blur();
            } else {
                activeElementOnMount.focus();
            }
        }
    }

    private handleStartFocus: SentinelProps['onFocus'] = (event) => {
        const trapElement = this.trapRef.current;

        if (!trapElement) {
            return;
        }

        if (isElementReachable(trapElement) && trapElement !== event.relatedTarget) {
            focusElement(trapElement);

            return;
        }

        const direction = getFocusDirection(event) || 'next';

        focusElement(
            getReachableElementOrSelfInContainer(trapElement, direction) ||
                getSiblingReachableElement(event.currentTarget, direction)
        );
    };

    private handleEndFocus: SentinelProps['onFocus'] = (event) => {
        const trapElement = this.trapRef.current;

        if (!trapElement) {
            return;
        }

        if (isElementReachable(trapElement)) {
            focusElement(trapElement);

            return;
        }

        const direction = getFocusDirection(event) || 'prev';

        focusElement(
            getReachableElementOrSelfInContainer(trapElement, direction) ||
                getSiblingReachableElement(event.currentTarget, direction)
        );
    };

    public render() {
        const {
            startSentinelProps = {},
            startSentinelRef,
            endSentinelProps = {},
            endSentinelRef,
            children
        } = this.props;

        return (
            <React.Fragment>
                <div
                    {...startSentinelProps}
                    ref={startSentinelRef}
                    tabIndex={0}
                    onFocus={chain(startSentinelProps.onFocus, this.handleStartFocus)}
                />
                <RootRef rootRef={this.trapRef}>{children}</RootRef>
                <div
                    {...endSentinelProps}
                    ref={endSentinelRef}
                    tabIndex={0}
                    onFocus={chain(endSentinelProps.onFocus, this.handleEndFocus)}
                />
            </React.Fragment>
        );
    }
}
