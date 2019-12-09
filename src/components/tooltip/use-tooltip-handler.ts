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
import {debounce} from '../../utils/debounce';

import {Props as TooltipProps} from './tooltip';

const DEFAULT_OPEN_DELAY = 500;

interface ReferenceProps {
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    onFocus?: React.FocusEventHandler;
    onBlur?: React.FocusEventHandler;
}

interface Props {
    referenceElement: HTMLElement | null;
    disableListeners?: boolean;
    disableHoverListener?: boolean;
    disableFocusListener?: boolean;
    openDelay?: number;
}

interface State {
    open: boolean;
    exited: boolean;
}

/** Hook to using tooltip */
export function useTooltipHandler(props: Props) {
    const {openDelay = DEFAULT_OPEN_DELAY} = props;

    const [state, setState] = React.useState<State>({
        exited: true,
        open: false
    });

    function open() {
        setState({open: true, exited: false});
    }

    const openDebouncedRef = React.useRef(debounce(open, openDelay));
    const referenceElementRef = React.useRef(props.referenceElement);
    referenceElementRef.current = props.referenceElement;

    const handleWindowMouseMove = React.useCallback((event: MouseEvent) => {
        if (
            referenceElementRef.current &&
            event.target instanceof Node &&
            !contains(referenceElementRef.current, event.target)
        ) {
            close();
        }
    }, []);

    function close() {
        window.removeEventListener('mousemove', handleWindowMouseMove);
        openDebouncedRef.current.cancel();
        setState((currentState) => ({...currentState, open: false}));
    }

    const handleReferenceMouseEnter = () => {
        if (
            openDebouncedRef.current.active ||
            props.disableListeners ||
            props.disableHoverListener
        ) {
            return;
        }

        openDebouncedRef.current();
        window.addEventListener('mousemove', handleWindowMouseMove);
    };

    const handleReferenceMouseLeave: React.MouseEventHandler = (event) => {
        if (
            event.relatedTarget instanceof Node &&
            contains(event.currentTarget, event.relatedTarget)
        ) {
            return;
        }

        close();
    };

    const handleReferenceFocus: React.FocusEventHandler = () => {
        if (
            openDebouncedRef.current.active ||
            props.disableListeners ||
            props.disableFocusListener
        ) {
            return;
        }

        openDebouncedRef.current();
    };

    const handleReferenceBlur: React.FocusEventHandler = (event) => {
        if (
            event.relatedTarget instanceof Node &&
            contains(event.currentTarget, event.relatedTarget)
        ) {
            return;
        }

        close();
    };

    const handleTooltipClose = () => {
        close();
    };

    const handleTooltipClosed = () => {
        setState((currentState) => ({...currentState, exited: true}));
    };

    React.useEffect(() => {
        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
            openDebouncedRef.current.cancel();
        };
    }, []);

    const getTooltipProps = (tooltipProps: TooltipProps = {}): TooltipProps => ({
        open: state.open,
        referenceElement: props.referenceElement,
        ...tooltipProps,
        onClose: chain(tooltipProps.onClose, handleTooltipClose),
        onClosed: chain(tooltipProps.onClosed, handleTooltipClosed)
    });

    // tslint:disable-next-line: no-object-literal-type-assertion
    const getReferenceProps = <T extends ReferenceProps>(referenceProps: T = {} as T): T => ({
        ...referenceProps,
        onMouseEnter: chain(referenceProps.onMouseEnter, handleReferenceMouseEnter),
        onMouseLeave: chain(referenceProps.onMouseLeave, handleReferenceMouseLeave),
        onFocus: chain(referenceProps.onFocus, handleReferenceFocus),
        onBlur: chain(referenceProps.onBlur, handleReferenceBlur)
    });

    return {
        isOpen: state.open || !state.exited,
        open,
        close,
        getTooltipProps,
        getReferenceProps
    };
}
