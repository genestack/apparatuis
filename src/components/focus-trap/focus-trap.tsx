/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {chain} from '../../utils/chain';
import {getLastFocusableElement, getFirstFocusableElement} from '../../utils/focusable-elements';
import {Omit} from '../../utils/omit';
import {Ref} from '../../utils/set-ref';
import {RootRef} from '../root-ref';

type SentinelProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'tabIndex'>;
// type TargetProps = React.HTMLAttributes<HTMLDivElement>;

interface ChildProps {
    onFocus?: React.FocusEventHandler;
    tabIndex?: number;
}

/** FocusTrap public properties */
export interface Props {
    /** Trap focus when component is mounted */
    focusOnMount?: boolean;
    /** Enable to focus root container */
    enableSelfFocus?: boolean;
    /** Properties of start sentinel */
    startSentinelProps?: SentinelProps;
    /** Start sentinel React.Ref */
    startSentinelRef?: Ref<HTMLDivElement>;
    /** Properties of end sentinel */
    endSentinelProps?: SentinelProps;
    /** End sentinel React.Ref */
    endSentinelRef?: Ref<HTMLDivElement>;
    /** React.Ref for the main element */
    rootRef?: Ref<HTMLDivElement>;
    /** This component clones passed child */
    children: React.ReactElement<ChildProps>;
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

    private handleSelfFocus: ChildProps['onFocus'] = (event) => {
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

    private focus() {
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
                ? getLastFocusableElement(trapElement)
                : getFirstFocusableElement(trapElement);
        }

        focusElement(nextFocusedElement || trapElement);
    }

    public render() {
        const {
            startSentinelProps = {},
            startSentinelRef,
            endSentinelProps = {},
            endSentinelRef,
            children
        } = this.props;

        const child = React.Children.only(children);

        const {tabIndex = -1} = child.props;

        return (
            <React.Fragment>
                <div
                    {...startSentinelProps}
                    ref={startSentinelRef}
                    tabIndex={0}
                    onFocus={chain(startSentinelProps.onFocus, this.handleStartFocus)}
                />
                <RootRef rootRef={this.trapRef}>
                    {React.cloneElement(child, {
                        onFocus: chain(child.props.onFocus, this.handleSelfFocus),
                        tabIndex
                    })}
                </RootRef>
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
