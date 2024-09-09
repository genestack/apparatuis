/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {chainRefs} from '../../utils';
import {chain} from '../../utils/chain';
import {DataAttributes} from '../../utils/slot-props';
import {Backdrop, BackdropProps} from '../backdrop';
import {FocusTrap} from '../focus-trap';

import {OverlayManager} from './overlay-manager';
import * as styles from './overlay.module.css';

const container = document.body;
const manager = new OverlayManager(container);

type TargetProps = React.HTMLAttributes<HTMLDivElement> & DataAttributes;

/** Reason of overlay close */
export type OverlayCloseReason = 'backdrop-click' | 'escape-keydown';

type OverlayCloseHandler = (reason: OverlayCloseReason, event?: React.SyntheticEvent) => void;

/** Overlay public properties */
export interface Props extends TargetProps {
    /**
     * If `true` overlay is shown. The Overlay uses transition component
     * so in fact it is hidden after some time when transition is completed
     * and `onClosed` callback is called.
     */
    open?: boolean;
    /**
     * Request to close overlay. It accepts close reason and event.
     * @see OverlayCloseReason
     */
    onClose?: OverlayCloseHandler;
    /**
     * Calls when the overlay is closed, all transitions are completed
     * and the component is ready for unmount
     */
    onClosed?: () => void;
    /** Do not listen clicks on Backdrop for closing */
    disableClickListener?: boolean;
    /** Do not listen `Escape` keypress for closing */
    disableEscListener?: boolean;
    /** Makes backdrop invisible. Shortcut to Backdrop.invisible */
    invisible?: boolean;
    /** Always keep the overlay in the DOM. */
    keepMounted?: boolean;
    /** Properties of nested Backdrop component */
    backdropProps?: Omit<BackdropProps, 'open' | 'invisible'>;
    children?: React.ReactElement;
}

/**
 * Overlay component is a modal element that blocks any content on the page.
 * The component could be closed:
 *   - with click on `<Backdrop />`
 *   - with `Escape` keydown
 */
export const Overlay = React.forwardRef<HTMLElement, Props>(function Overlay(props, ref) {
    const {
        open,
        keepMounted,
        onClose,
        onClosed,
        disableClickListener,
        disableEscListener,
        invisible,
        backdropProps = {},
        children,
        className,
        ...rest
    } = props;

    const rootRef = React.useRef<HTMLElement>(null);
    const childRef = React.useRef<HTMLElement>(null);
    const [exited, setExited] = React.useState(!open);

    React.useEffect(() => {
        if (open) {
            setExited(false);
            openOverlay();
        }
    }, [open]);

    React.useLayoutEffect(() => {
        return () => {
            if (rootRef.current) {
                manager.unmount(rootRef.current);
            }
        };
    }, []);

    function openOverlay() {
        if (rootRef.current) {
            manager.mount(rootRef.current);
        }

        // Revert scroll position when focused element triggers scroll
        // changes into scrollable overlay.
        // May be it is better to move scroll container to overlay.
        if (childRef.current) {
            childRef.current.scrollTop = 0;
        }
    }

    function closeOverlay() {
        if (rootRef.current) {
            manager.unmount(rootRef.current);
        }

        if (onClosed) {
            onClosed();
        }
    }

    const handleBackdropClick: BackdropProps['onClick'] = (event) => {
        if (disableClickListener) {
            return;
        }

        if (onClose) {
            onClose('backdrop-click', event);
        }
    };

    const handleBackdropExited = () => {
        closeOverlay();
        setExited(true);
    };

    const handleKeyDown: TargetProps['onKeyDown'] = (event) => {
        if (disableEscListener || (rootRef.current && !manager.isTopOverlay(rootRef.current))) {
            return;
        }

        if (event.key === 'Escape' && !event.defaultPrevented && onClose) {
            event.preventDefault();
            onClose('escape-keydown', event);
        }
    };

    if (!keepMounted && !open && exited) {
        return null;
    }

    return ReactDOM.createPortal(
        <div
            {...rest}
            ref={chainRefs(rootRef, ref)}
            className={classNames(
                className,
                {
                    [styles.invisible]: !open && exited
                },
                styles.root
            )}
            onKeyDown={chain(rest.onKeyDown, handleKeyDown)}
        >
            <Backdrop
                {...backdropProps}
                invisible={invisible}
                open={open}
                onExited={chain(backdropProps.onExited, handleBackdropExited)}
                onClick={chain(backdropProps.onClick, handleBackdropClick)}
            />
            {children ? (
                <FocusTrap focusOnMount>
                    {React.cloneElement(children, {
                        ref: childRef
                    })}
                </FocusTrap>
            ) : null}
        </div>,
        container
    );
});
