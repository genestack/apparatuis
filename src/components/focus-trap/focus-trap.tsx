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
    getLastFocusableElement,
    getFirstFocusableElement,
    isElementFocusable
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

    private handleStartFocus = () => {
        this.focus();
    };

    private handleEndFocus = () => {
        this.focus();
    };

    private focus() {
        const trapElement = this.trapRef.current;

        if (!trapElement) {
            return;
        }

        const isTrapElementFocusable = isElementFocusable(trapElement);
        let nextElement: HTMLElement | null;

        if (isTrapElementFocusable && trapElement !== this.lastActiveElement) {
            nextElement = trapElement;
        } else {
            nextElement = this.focusDirectionInversed
                ? getLastFocusableElement(trapElement)
                : getFirstFocusableElement(trapElement);
        }

        if (!nextElement && isTrapElementFocusable) {
            nextElement = trapElement;
        }

        if (nextElement && nextElement !== document.activeElement) {
            nextElement.focus();
        }
    }

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
