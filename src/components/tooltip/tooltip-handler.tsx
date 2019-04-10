/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {chain} from '../../utils/chain';
import {debounce} from '../../utils/debounce';
import {RootRef} from '../root-ref';

import {Props as TooltipProps} from './tooltip';

const OPEN_DEBOUNCE_DURATION = 160;

interface ChildProps {
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    onFocus?: React.FocusEventHandler;
    onBlur?: React.FocusEventHandler;
}

type TooltipProp = React.ReactElement<TooltipProps> | (() => React.ReactElement<TooltipProps>);
type ChildrenRenderProp =
    | ((state: {open: boolean}) => React.ReactElement<ChildProps>)
    | React.ReactElement<ChildProps>;

/** TooltipHandler public properties */
export interface Props {
    /** Tooltip React element that will be shown on tooltip open */
    tooltip: TooltipProp;
    /** Tooltip will be shown near reference element passed as children */
    children: ChildrenRenderProp;
    /** Disable all listeners that could open a tooltip */
    disableListeners?: boolean;
    /** Disable focus listener */
    disableFocusListener?: boolean;
    /** Disable mouse events listener */
    disableHoverListener?: boolean;
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

    public componentWillUnmount() {
        this.openDebounced.cancel();
    }

    public close() {
        this.openDebounced.cancel();
        this.setState({open: false});
    }

    public open() {
        this.setState({open: true, exited: false});
    }

    private openDebounced = debounce(() => {
        this.open();
    }, OPEN_DEBOUNCE_DURATION);

    private handleReferenceMouseEnter = () => {
        if (
            this.openDebounced.active ||
            this.props.disableListeners ||
            this.props.disableHoverListener
        ) {
            return;
        }

        this.openDebounced();
    };

    private handleReferenceMouseLeave: ChildProps['onMouseLeave'] = (event) => {
        if (
            (event.relatedTarget instanceof Node &&
                event.currentTarget.contains(event.relatedTarget)) ||
            this.props.disableListeners ||
            this.props.disableHoverListener
        ) {
            return;
        }

        this.close();
    };

    private handleReferenceFocus: ChildProps['onFocus'] = (event) => {
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
                event.currentTarget.contains(event.relatedTarget)) ||
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