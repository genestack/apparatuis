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
import {RootRef} from '../root-ref';

import {OverlayManager} from './overlay-manager';
import * as styles from './overlay.module.css';

const container = document.body;
const manager = new OverlayManager(container);

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** Reason of overlay close */
export type OverlayCloseReason = 'backdrop_click' | 'escape_keydown';

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
    disableClickHandler?: boolean;
    /** Do not listen `Escape` keypress for closing */
    disableEscHandler?: boolean;
    /** Makes backdrop invisible. Shortcut to Backdrop.invisible */
    invisible?: boolean;
    /** Properties of nested Backdrop component */
    backdropProps?: Omit<BackdropProps, 'open' | 'invisible'>;
    children?: JSX.Element;
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
    private childRef = React.createRef<HTMLElement>();

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
        manager.unmount(this);
    }

    private open() {
        manager.mount(this);
    }

    private close() {
        manager.unmount(this);

        if (this.props.onClosed) {
            this.props.onClosed();
        }
    }

    private handleBackdropClick: BackdropProps['onClick'] = (event) => {
        const {onClose, disableClickHandler} = this.props;

        if (disableClickHandler) {
            return;
        }

        if (onClose) {
            onClose('backdrop_click', event);
        }
    };

    private handleBackdropExited = () => {
        this.close();
        this.setState({exited: true});
    };

    private handleKeyDown: TargetProps['onKeyDown'] = (event) => {
        const {disableEscHandler, onClose} = this.props;

        if (disableEscHandler || !manager.isTopOverlay(this)) {
            return;
        }

        if (event.key === 'Escape' && onClose) {
            onClose('escape_keydown', event);
        }
    };

    public render() {
        const {
            open,
            onClose,
            onClosed,
            disableClickHandler,
            disableEscHandler,
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
                {children ? (
                    <FocusTrap focusOnMount>
                        <RootRef rootRef={this.childRef}>{children}</RootRef>
                    </FocusTrap>
                ) : null}
            </div>,
            container
        );
    }
}
