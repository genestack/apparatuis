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
    disableRestoreFocus?: boolean;
    /** Makes backdrop invisible. Shortcut to Backdrop.invisible */
    invisible?: boolean;
    /** Properties of nested Backdrop component */
    backdropProps?: Omit<BackdropProps, 'open' | 'invisible'>;
}

interface State {
    exited: boolean;
}

/**
 * Overlay component is a modal element that blocks any content on the page.
 * The component could be closed:
 *   - with click on `<Backdrop />`
 *   - with `Escape` keydown
 */
export class Overlay extends React.Component<Props, State> {
    public static getDerivedStateFromProps(props: Props, state: State): State {
        if (props.open) {
            return {
                exited: false
            };
        }

        return state;
    }

    public state: State = {
        exited: true
    };

    public componentDidMount() {
        if (this.props.open) {
            this.open();
        }
    }

    public componentDidUpdate(props: Props) {
        if (this.props.open && !props.open) {
            this.open();
        }
    }

    public componentWillUnmount() {
        manager.unmount(this, {
            restoreFocus: !this.props.disableRestoreFocus
        });
    }

    private open() {
        manager.mount(this);
    }

    private close() {
        manager.unmount(this, {
            restoreFocus: !this.props.disableRestoreFocus
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

    private handleBackdropExited = () => {
        this.close();
        this.setState({exited: true});
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
            disableRestoreFocus,
            invisible,
            backdropProps = {},
            children,
            className,
            ...rest
        } = this.props;

        const {exited} = this.state;

        if (!open && exited) {
            return null;
        }

        return ReactDOM.createPortal(
            <div
                {...rest}
                className={classNames(className, styles.root)}
                onKeyDown={chain(rest.onKeyDown, this.handleKeyDown)}
            >
                <Backdrop
                    {...backdropProps}
                    invisible={invisible}
                    open={open}
                    onExited={chain(backdropProps.onExited, this.handleBackdropExited)}
                    onClick={chain(backdropProps.onClick, this.handleBackdropClick)}
                />
                {children}
            </div>,
            container
        );
    }
}
