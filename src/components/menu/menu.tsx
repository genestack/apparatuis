/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {chain} from '../../utils/chain';
import {getFirstReachableElement, getLastReachableElement} from '../../utils/focusable-elements';
import {Overlay, OverlayProps} from '../overlay';

import {MenuContext, MenuContextValue, MenuItemRef} from './menu-context';
import {MenuPopover, Props as MenuPopoverProps} from './menu-popover';
import * as styles from './menu.module.css';
import {Props as ListProps, SubMenu} from './sub-menu';

type TargetProps = ListProps;

type RestOverlayProps = Omit<OverlayProps, 'invisible' | 'open' | 'onClose' | 'onClosed'> & {
    ref?: React.Ref<HTMLElement>;
};
type RestPopoverProps = Omit<
    MenuPopoverProps,
    'referenceElement' | 'open' | 'withArrow' | 'positionFixed' | 'placement' | 'tabIndex'
>;

/** Menu public properties */
export interface Props extends TargetProps {
    open?: boolean;
    onClose?: OverlayProps['onClose'];
    onClosed?: OverlayProps['onClosed'];
    referenceElement?: MenuPopoverProps['referenceElement'];
    placement?: MenuPopoverProps['placement'];
    /** Always keep the menu in the DOM. */
    keepMounted?: boolean;
    overlayProps?: RestOverlayProps;
    popoverProps?: RestPopoverProps;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onValueSelect?: (value: any, item: MenuItemRef) => void;
}

/**
 * A Menu displays a list of choices on a temporary surface.
 * They appear when users interact with a button, action, or other control.
 *
 * @example ./focus-to-input-after-menu-item-click.md
 */
export const Menu = React.forwardRef<HTMLElement, Props>(function Menu(props, ref) {
    const {
        open,
        onClose,
        onClosed,
        referenceElement,
        placement = 'bottom-start',
        keepMounted,
        popoverProps = {},
        onValueSelect,
        overlayProps = {} as RestOverlayProps,
        ...rest
    } = props;

    const menuContext: MenuContextValue = {
        onItemSelect: (item) => {
            onValueSelect?.(item.value, item);
        }
    };

    const handleKeyDown: MenuPopoverProps['onKeyDown'] = (event) => {
        if (event.target !== event.currentTarget) {
            return;
        }

        let itemToFocus: HTMLElement | null = null;

        if (event.key === 'ArrowDown') {
            itemToFocus = getFirstReachableElement(event.currentTarget);
        }

        if (event.key === 'ArrowUp') {
            itemToFocus = getLastReachableElement(event.currentTarget);
        }

        if (itemToFocus) {
            event.preventDefault();
            itemToFocus.focus();
        }
    };

    return (
        <MenuContext.Provider value={menuContext}>
            <Overlay
                {...overlayProps}
                open={open}
                keepMounted={keepMounted}
                onClose={onClose}
                onClosed={onClosed}
                invisible
            >
                <MenuPopover
                    data-qa="menu"
                    {...popoverProps}
                    referenceElement={referenceElement}
                    open={open}
                    placement={placement}
                    keepMounted={keepMounted}
                    positionFixed
                    tabIndex={-1}
                    onKeyDown={chain(popoverProps.onKeyDown, handleKeyDown)}
                    ref={ref}
                >
                    <SubMenu
                        {...rest}
                        className={classNames(rest.className, {[styles.closed]: !open})}
                    />
                </MenuPopover>
            </Overlay>
        </MenuContext.Provider>
    );
});
