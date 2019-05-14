/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import contains from 'dom-helpers/query/contains';
import * as React from 'react';

import {chain} from '../../utils/chain';
import {debounce, Debounced} from '../../utils/debounce';
import {RootRef} from '../root-ref';

import {Props as TooltipProps} from './tooltip';

const DEFAULT_OPEN_DELAY = 500;

interface ChildProps {
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    onFocus?: React.FocusEventHandler;
    onBlur?: React.FocusEventHandler;
}

type TooltipElement = React.ReactElement<TooltipProps> | null | undefined;
type TooltipProp = TooltipElement | (() => TooltipElement);

type ChildrenRenderProp =
    | ((state: {open: boolean}) => React.ReactElement<ChildProps>)
    | React.ReactElement<ChildProps>;

/** TooltipHandler public properties */
export interface Props {
    /** Tooltip React element that will be shown on tooltip open */
    tooltip?: TooltipProp;
    /** Tooltip will be shown near reference element passed as children */
    children: ChildrenRenderProp;
    /** Disable all listeners that could open a tooltip */
    disableListeners?: boolean;
    /** Disable focus listener */
    disableFocusListener?: boolean;
    /** Disable mouse events listener */
    disableHoverListener?: boolean;
    /** Delay before tooltip will be shown (default 500ms) */
    openDelay?: number;
}

interface State {
    open: boolean;
    exited: boolean;
}

/**
 * Common tooltip handler.
 * It listen hover and focus on the reference element.
 */
export class TooltipHandler extends React.Component<Props, State> {
    private childRef = React.createRef<HTMLElement>();

    public state: State = {
        open: false,
        exited: true
    };

    private openDebounced: Debounced<() => void>;

    constructor(props: Props) {
        super(props);

        const {openDelay = DEFAULT_OPEN_DELAY} = props;

        this.openDebounced = debounce(() => {
            this.open();
        }, openDelay);
    }

    public componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleWindowMouseMove);
        this.openDebounced.cancel();
    }

    public close() {
        window.removeEventListener('mousemove', this.handleWindowMouseMove);
        this.openDebounced.cancel();
        this.setState({open: false});
    }

    public open() {
        this.setState({open: true, exited: false});
    }

    private handleWindowMouseMove = (event: MouseEvent) => {
        if (
            this.childRef.current &&
            event.target instanceof Node &&
            !contains(this.childRef.current, event.target)
        ) {
            this.close();
        }
    };

    private handleReferenceMouseEnter = () => {
        if (
            this.openDebounced.active ||
            this.props.disableListeners ||
            this.props.disableHoverListener
        ) {
            return;
        }

        this.openDebounced();
        window.addEventListener('mousemove', this.handleWindowMouseMove);
    };

    private handleReferenceMouseLeave: ChildProps['onMouseLeave'] = (event) => {
        if (
            (event.relatedTarget instanceof Node &&
                contains(event.currentTarget, event.relatedTarget)) ||
            this.props.disableListeners ||
            this.props.disableHoverListener
        ) {
            return;
        }

        this.close();
    };

    private handleReferenceFocus: ChildProps['onFocus'] = () => {
        if (
            this.openDebounced.active ||
            this.props.disableListeners ||
            this.props.disableFocusListener
        ) {
            return;
        }

        this.openDebounced();
    };

    private handleReferenceBlur: ChildProps['onBlur'] = (event) => {
        if (
            (event.relatedTarget instanceof Node &&
                contains(event.currentTarget, event.relatedTarget)) ||
            this.props.disableListeners ||
            this.props.disableFocusListener
        ) {
            return;
        }

        this.close();
    };

    private handleTooltipClose = () => {
        this.close();
    };

    private handleTooltipClosed = () => {
        this.setState({exited: true});
    };

    private renderChild() {
        const child = (typeof this.props.children === 'function'
            ? this.props.children({open: !this.state.exited})
            : this.props.children) as React.ReactElement<ChildProps>;

        const childProps: ChildProps = {
            onMouseEnter: chain(child.props.onMouseEnter, this.handleReferenceMouseEnter),
            onMouseLeave: chain(child.props.onMouseLeave, this.handleReferenceMouseLeave),
            onFocus: chain(child.props.onFocus, this.handleReferenceFocus),
            onBlur: chain(child.props.onBlur, this.handleReferenceBlur)
        };

        return React.cloneElement(child, childProps);
    }

    private renderTooltip() {
        const {open, exited} = this.state;
        const referenceElement = this.childRef.current;

        const tooltip = referenceElement
            ? typeof this.props.tooltip === 'function'
                ? this.props.tooltip()
                : this.props.tooltip
            : null;

        const tooltipProps: TooltipProps | null =
            tooltip && referenceElement
                ? {
                      open,
                      referenceElement,
                      onClose: chain(tooltip.props.onClose, this.handleTooltipClose),
                      onClosed: chain(tooltip.props.onClosed, this.handleTooltipClosed)
                  }
                : null;

        return tooltip && tooltipProps && !exited
            ? React.cloneElement(tooltip, tooltipProps)
            : null;
    }

    public render() {
        return (
            <React.Fragment>
                {this.renderTooltip()}
                <RootRef rootRef={this.childRef}>{this.renderChild()}</RootRef>
            </React.Fragment>
        );
    }
}
