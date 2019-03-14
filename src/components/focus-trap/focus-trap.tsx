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
    isElementFocusable,
    getFocusDirection
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

    public componentDidMount() {
        if (this.props.focusOnMount) {
            this.focus('next');
        }
    }

    private handleStartFocus: SentinelProps['onFocus'] = (event) => {
        this.focus(getFocusDirection(event) || 'next');
    };

    private handleEndFocus: SentinelProps['onFocus'] = (event) => {
        const trapElement = this.trapRef.current;

        if (!trapElement) {
            return;
        }

        const direction = getFocusDirection(event) || 'prev';

        if (direction === 'next' && isElementFocusable(trapElement)) {
            focusElement(trapElement);
        } else {
            this.focus(direction);
        }
    };

    private focus(direction: 'next' | 'prev') {
        const trapElement = this.trapRef.current;

        if (!trapElement) {
            return;
        }

        let element =
            direction === 'next'
                ? getFirstFocusableElement(trapElement)
                : getLastFocusableElement(trapElement);

        if (!element && isElementFocusable(trapElement)) {
            element = trapElement;
        }

        focusElement(element);
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
