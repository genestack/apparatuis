/*
 * Copyright (c) 2011-2021 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import contains from 'dom-helpers/contains';
import * as React from 'react';

import {debounce, chain} from '../../utils';

const defaultOpenDelay = 400;
const defaultCloseDelay = 200;

interface PopoverContentProps {
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
}

interface ReferenceProps {
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
}

interface Props {
    referenceElement: HTMLElement | null;
    openDelay?: number;
    closeDelay?: number;
}

/** Hook to using popover */
export function usePopoverHandler(props: Props) {
    const [referenceElement, setReferenceElement] = React.useState<HTMLElement | null>(
        props.referenceElement
    );
    const {openDelay = defaultOpenDelay, closeDelay = defaultCloseDelay} = props;

    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const openDebouncedRef = React.useRef(debounce(handleOpen, props.openDelay ?? openDelay));

    function handleClose() {
        openDebouncedRef.current.cancel();
        setReferenceElement(null);
        setIsOpen(false);
    }

    const closeDebounceRef = React.useRef(debounce(handleClose, props.closeDelay ?? closeDelay));

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        setReferenceElement(target);

        openDebouncedRef.current();
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.relatedTarget instanceof Element && contains(e.currentTarget, e.relatedTarget)) {
            return;
        }

        closeDebounceRef.current();
    };

    const handleContentMouseEnter = () => {
        closeDebounceRef.current.cancel();
    };

    const handleContentMouseLeave = () => {
        closeDebounceRef.current();
    };

    React.useEffect(() => {
        return () => {
            openDebouncedRef.current.cancel();
            closeDebounceRef.current.cancel();
        };
    }, []);

    const getPopoverContentProps = <T extends PopoverContentProps>(
        popoverContentProps: T = {} as T
    ): T => ({
        ...popoverContentProps,
        // open: isOpen,
        // referenceElement,
        onMouseEnter: chain(popoverContentProps.onMouseEnter, handleContentMouseEnter),
        onMouseLeave: chain(popoverContentProps.onMouseLeave, handleContentMouseLeave)
    });

    const getReferenceProps = <T extends ReferenceProps>(referenceProps: T = {} as T): T => ({
        ...referenceProps,
        onMouseEnter: chain(referenceProps.onMouseEnter, handleMouseEnter),
        onMouseLeave: chain(referenceProps.onMouseLeave, handleMouseLeave)
    });

    return {
        isOpen,
        getPopoverContentProps,
        getReferenceProps,
        referenceElement
    };
}
