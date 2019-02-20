/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {chain} from '../../utils/chain';
import {Omit} from '../../utils/omit';
import {Backdrop, BackdropProps} from '../backdrop';
import {FocusTrap} from '../focus-trap';

import {OverlayManager} from './overlay-manager';
import * as styles from './overlay.module.css';

const container = document.body;
const manager = new OverlayManager(container);

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Reason of overlay close
 */
export enum OverlayCloseReason {
    /** Overlay closed when user clicked to Backdrop */
    BACKDROP_CLICK = 'BACKDROP_CLICK',
    /** Overlay closed when user pressed Escape key */
    ESCAPE_KEYDOWN = 'ESCAPE_KEYDOWN'
}

type CloseHandler = (reason: OverlayCloseReason, event?: React.SyntheticEvent) => void;

/** Overlay public properties */
export interface Props extends TargetProps {
    /**
     * If `true` overlay is shown. The Overlay uses transition component
     * so in fact it is hidden after some time when transition is completed
     * and `onClosed` callback is called.
     */
    open: boolean;
    /**
     * Request to close overlay. It accepts close reason and event.
     * @see CloseReason
     */
    onClose: CloseHandler;
    /**
     * Calls when the overlay is closed, all transitions are completed
     * and the component is ready for unmount
     */
    onClosed?: () => void;
    /** Do not listen clicks on Backdrop for closing */
    disableClickHandler?: boolean;
    /** Do not listen `Escape` keypress for closing */
    disableEscHandler?: boolean;
    /** Do not restore focus on last active element when overlay has hidden */
    disableAutoFocus?: boolean;
    /** Properties of nested Backdrop component */
    backdropProps?: Omit<BackdropProps, 'open'>;
}

/**
 * Overlay component is a modal element that blocks any content on the page.
 * The component could be closed:
 *   - with click on `<Backdrop />`
 *   - with `Escape` keydown
 */
export class Overlay extends React.Component<Props> {
    private focusTrapRef = React.createRef<FocusTrap>();

    public componentDidMount() {
        if (this.props.open) {
            this.open();
        }
    }

    public componentDidUpdate(props: Props) {
        if (props.open !== this.props.open) {
            if (this.props.open) {
                this.open();
            }
        }
    }

    public componentWillUnmount() {
        manager.unmount(this, {
            restoreFocus: !this.props.disableAutoFocus
        });
    }

    private open() {
        manager.mount(this);

        if (this.focusTrapRef.current) {
            this.focusTrapRef.current.focus();
        }
    }

    private close() {
        manager.unmount(this, {
            restoreFocus: !this.props.disableAutoFocus
        });

        if (this.props.onClosed) {
            this.props.onClosed();
        }
    }

    private handleBackdropClick: BackdropProps['onClick'] = (event) => {
        const {onClose, disableClickHandler} = this.props;

        if (disableClickHandler || event.defaultPrevented) {
            return;
        }

        onClose(OverlayCloseReason.BACKDROP_CLICK, event);
    };

    private handleBackdropTransitionEnd = () => {
        this.close();
    };

    private handleKeyDown: TargetProps['onKeyDown'] = (event) => {
        const {disableEscHandler, onClose} = this.props;

        if (disableEscHandler || event.defaultPrevented || !manager.isTopOverlay(this)) {
            return;
        }

        if (event.key === 'Escape') {
            onClose(OverlayCloseReason.ESCAPE_KEYDOWN, event);
        }
    };

    public render() {
        const {
            open,
            onClose,
            onClosed,
            disableClickHandler,
            disableEscHandler,
            disableAutoFocus,
            backdropProps = {},
            children,
            className,
            ...rest
        } = this.props;

        const {fadeProps = {}} = backdropProps;

        return ReactDOM.createPortal(
            <div
                {...rest}
                className={classNames(className, styles.root)}
                onKeyDown={chain(rest.onKeyDown, this.handleKeyDown)}
            >
                <Backdrop
                    {...backdropProps}
                    open={open}
                    fadeProps={{
                        ...fadeProps,
                        onExited: chain(fadeProps.onExited, this.handleBackdropTransitionEnd)
                    }}
                    onClick={chain(backdropProps.onClick, this.handleBackdropClick)}
                />
                <FocusTrap enableSelfFocus ref={this.focusTrapRef}>
                    {children}
                </FocusTrap>
            </div>,
            container
        );
    }
}
