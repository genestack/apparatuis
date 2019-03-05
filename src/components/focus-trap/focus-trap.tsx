/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {chain} from '../../utils/chain';
import {Omit} from '../../utils/omit';

type SentinelProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'tabIndex'>;
type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** FocusTrap public properties */
export interface Props extends TargetProps {
    /** Trap focus when component is mounted */
    focusOnMount?: boolean;
    /** Enable to focus root container */
    enableSelfFocus?: boolean;
    /** Properties of start sentinel */
    startSentinelProps?: SentinelProps;
    /** Properties of end sentinel */
    endSentinelProps?: SentinelProps;
}

function getFocusableElements(element: Element) {
    return element.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
}

function getFirstFocusable(element: HTMLElement) {
    const focusableElements = getFocusableElements(element);

    const firstElement = focusableElements.item(0);

    return firstElement instanceof HTMLElement ? firstElement : null;
}

function getLastFocusable(element: HTMLElement) {
    const focusableElements = getFocusableElements(element);

    const lastElement = focusableElements.item(focusableElements.length - 1);

    return lastElement instanceof HTMLElement ? lastElement : null;
}

function focusElement(element: HTMLElement) {
    if (element !== document.activeElement) {
        element.focus();
    }
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
    private lastActiveElement: Element | null = document.activeElement;
    private focusDirectionInversed: boolean | null = null;

    public componentDidMount() {
        document.addEventListener('keydown', this.handleDocumentKeyDown);

        if (this.props.focusOnMount) {
            this.focus();
        }
    }

    public componentWillUnmount() {
        this.lastActiveElement = null;
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
    }

    private handleDocumentKeyDown = (event: KeyboardEvent) => {
        const trapElement = this.trapRef.current;

        if (event.key !== 'Tab' || !trapElement) {
            return;
        }

        this.lastActiveElement = document.activeElement;
        this.focusDirectionInversed = event.shiftKey;
    };

    private handleSelfFocus: TargetProps['onFocus'] = (event) => {
        if (event.currentTarget !== event.target) {
            return;
        }

        this.focus();
    };

    private handleStartFocus = () => {
        this.focus();
    };

    private handleEndFocus = () => {
        this.focus();
    };

    public focus() {
        const trapElement = this.trapRef.current;

        if (!trapElement) {
            return;
        }

        const {enableSelfFocus} = this.props;
        const {focusDirectionInversed} = this;

        let nextFocusedElement: HTMLElement | null = null;

        // when trap container focused and Shift + Tab pressed
        const focusLooped = this.lastActiveElement === trapElement && focusDirectionInversed;

        if (!enableSelfFocus || focusLooped) {
            nextFocusedElement = focusDirectionInversed
                ? getLastFocusable(trapElement)
                : getFirstFocusable(trapElement);
        }

        focusElement(nextFocusedElement || trapElement);
    }

    /**
     * Focus to the next or previous element in focus trap.
     * Useful when you want to change focus with some keyboard combination
     * like Up or Down keys.
     */
    public focusSibling(direction: 'next' | 'prev') {
        const trapElement = this.trapRef.current;
        const focusedElement = document.activeElement;

        if (!trapElement || !focusedElement) {
            return;
        }

        const focusableElements = Array.from(getFocusableElements(trapElement));

        if (!focusableElements.length) {
            return;
        }

        const currentIndex = focusableElements.indexOf(focusedElement as HTMLElement);

        let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

        if (nextIndex === -1) {
            nextIndex = 0;
        }

        if (nextIndex === focusableElements.length) {
            nextIndex = focusableElements.length - 1;
        }

        const element = focusableElements[nextIndex];

        if (element !== focusedElement) {
            element.focus();
        }
    }

    public render() {
        const {
            tabIndex = -1,
            focusOnMount,
            startSentinelProps = {},
            endSentinelProps = {},
            enableSelfFocus,
            onFocus,
            ...rest
        } = this.props;

        return (
            <React.Fragment>
                <div
                    {...startSentinelProps}
                    tabIndex={0}
                    onFocus={chain(startSentinelProps.onFocus, this.handleStartFocus)}
                />
                <div
                    {...rest}
                    onFocus={chain(onFocus, this.handleSelfFocus)}
                    tabIndex={tabIndex}
                    ref={this.trapRef}
                />
                <div
                    {...endSentinelProps}
                    tabIndex={0}
                    onFocus={chain(endSentinelProps.onFocus, this.handleEndFocus)}
                />
            </React.Fragment>
        );
    }
}
