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
    children?: JSX.Element;
    rootRef?: React.Ref<HTMLDivElement>;
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

        // Revert scroll position when focused element triggers scroll
        // changes into scrollable overlay.
        // May be it is better to move scroll container to overlay.
        if (this.childRef.current) {
            this.childRef.current.scrollTop = 0;
        }
    }

    private close() {
        manager.unmount(this);

        if (this.props.onClosed) {
            this.props.onClosed();
        }
    }

    private handleBackdropClick: BackdropProps['onClick'] = (event) => {
        const {onClose, disableClickListener} = this.props;

        if (disableClickListener) {
            return;
        }

        if (onClose) {
            onClose('backdrop-click', event);
        }
    };

    private handleBackdropExited = () => {
        this.close();
        this.setState({exited: true});
    };

    private handleKeyDown: TargetProps['onKeyDown'] = (event) => {
        const {disableEscListener, onClose} = this.props;

        if (disableEscListener || !manager.isTopOverlay(this)) {
            return;
        }

        if (event.key === 'Escape' && !event.defaultPrevented && onClose) {
            event.preventDefault();
            onClose('escape-keydown', event);
        }
    };

    public render() {
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
            rootRef,
            ...rest
        } = this.props;

        const {exited} = this.state;

        if (!keepMounted && !open && exited) {
            return null;
        }

        return ReactDOM.createPortal(
            <div
                {...rest}
                ref={rootRef}
                className={classNames(
                    className,
                    {
                        [styles.invisible]: !open && exited
                    },
                    styles.root
                )}
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
