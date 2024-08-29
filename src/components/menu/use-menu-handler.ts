/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {chain} from '../../utils/chain';

import {Props as MenuProps} from './menu';

interface ReferenceProps {
    onClick?: React.MouseEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
}

interface State {
    open: boolean;
    exited: boolean;
}

interface Props {
    referenceElement: HTMLElement | null;
    disableListeners?: boolean;
}

/** Hook for using menu  */
export function useMenuHandler(props: Props) {
    const [state, setState] = React.useState<State>({
        open: false,
        exited: true
    });

    function open() {
        setState({open: true, exited: false});
    }

    function close() {
        setState((prevState) => ({...prevState, open: false}));
    }

    const handleMenuValueSelect: MenuProps['onValueSelect'] = (_, item) => {
        if (!item.hasSubMenu) {
            close();
        }
    };

    const handleReferenceClick = () => {
        if (!props.disableListeners) {
            open();
        }
    };

    const handleReferenceKeyDown: React.KeyboardEventHandler = (event) => {
        if (!props.disableListeners && event.key === 'ArrowDown') {
            event.preventDefault();
            open();
        }
    };

    const handleMenuClose = () => {
        close();
    };

    const handleMenuClosed = () => {
        setState((prevState) => ({...prevState, exited: true}));
    };

    const getMenuProps = (menuProps: MenuProps = {}): MenuProps => ({
        open: state.open,
        referenceElement: props.referenceElement,
        ...menuProps,
        onClose: chain(menuProps.onClose, handleMenuClose),
        onClosed: chain(menuProps.onClosed, handleMenuClosed),
        onValueSelect: chain(menuProps.onValueSelect, handleMenuValueSelect)
    });

    const getReferenceProps = <T extends ReferenceProps>(referenceProps: T = {} as T): T => ({
        ...referenceProps,
        onClick: chain(referenceProps.onClick, handleReferenceClick),
        onKeyDown: chain(referenceProps.onKeyDown, handleReferenceKeyDown)
    });

    return {
        isOpen: state.open || !state.exited,
        open,
        close,
        getMenuProps,
        getReferenceProps
    };
}
