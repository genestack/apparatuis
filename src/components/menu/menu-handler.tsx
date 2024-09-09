/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {Props as MenuProps} from './menu';
import {useMenuHandler} from './use-menu-handler';

type MenuProp = (() => React.ReactElement<MenuProps>) | React.ReactElement<MenuProps>;

interface ChildProps {
    onClick?: React.ReactEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
    ref?: React.Ref<unknown>;
}

type ChildrenProp =
    | ((state: {open: boolean}) => React.ReactElement<ChildProps>)
    | React.ReactElement<ChildProps>;

/** MenuHandler public properties */
export interface Props {
    /** React element or function that returns React element that is used as menu. */
    menu: MenuProp;
    /**
     * Element that is used as reference node.
     * Could be a function that accepts open state.
     */
    children: ChildrenProp;
    /**
     * If `true` the handler stops listen any events onto reference element
     * that could affect menu opening.
     */
    disableListeners?: boolean;
}

/** Imperative MenuHandler API */
export interface MenuHandlerApi {
    open: () => void;
    close: () => void;
}

/**
 * UI Kit provides common menu handler that manages menu open state.
 * It opens menu by children click event and closes menu on a item click
 * that does not have subMenu.
 */
export const MenuHandler = React.forwardRef<MenuHandlerApi, Props>(function MenuHandlerRef(
    props,
    ref
) {
    const childRef = React.useRef<HTMLElement>(null);

    const menuHandler = useMenuHandler({
        disableListeners: props.disableListeners,
        referenceElement: childRef.current
    });

    React.useImperativeHandle(
        ref,
        () => ({
            open: menuHandler.open,
            close: menuHandler.close
        }),
        []
    );

    const renderChild = () => {
        const child =
            typeof props.children === 'function'
                ? props.children({open: menuHandler.isOpen})
                : (props.children as React.ReactElement<ChildProps>);

        return React.cloneElement(child, {
            ...menuHandler.getReferenceProps(child.props),
            ref: childRef
        });
    };

    const renderMenu = () => {
        const menu = menuHandler.isOpen
            ? typeof props.menu === 'function'
                ? props.menu()
                : props.menu
            : null;

        return menu ? React.cloneElement(menu, menuHandler.getMenuProps(menu.props)) : null;
    };

    return (
        <React.Fragment>
            {renderChild()}
            {renderMenu()}
        </React.Fragment>
    );
});
