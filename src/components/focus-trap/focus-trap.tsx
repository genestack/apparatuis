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
    focusOnMount?: boolean;
    enableSelfFocus?: boolean;
    startSentinelProps?: SentinelProps;
    endSentinelProps?: SentinelProps;
}

function getFocusableElements(element: Element) {
    return element.querySelectorAll(
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
