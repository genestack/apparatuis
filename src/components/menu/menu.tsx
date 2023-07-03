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

import {MenuContext, MenuContextValue} from './menu-context';
import {MenuItem} from './menu-item';
import {MenuPopover, Props as MenuPopoverProps} from './menu-popover';
import * as styles from './menu.module.css';
import {SubMenu, Props as ListProps} from './sub-menu';

type TargetProps = ListProps;

type RestOverlayProps = Omit<OverlayProps, 'invisible' | 'open' | 'onClose' | 'onClosed'>;
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
    onValueSelect?: (value: any, event: React.SyntheticEvent, ref: MenuItem) => void;
}

/**
 * A Menu displays a list of choices on a temporary surface.
 * They appear when users interact with a button, action, or other control.
 *
 * @example ./focus-to-input-after-menu-item-click.md
 */
export class Menu extends React.Component<Props> {
    private menuContext: MenuContextValue = {
        onItemSelect: (item, event) => {
            if (this.props.onValueSelect) {
                this.props.onValueSelect(item.props.value, event, item);
            }
        }
    };

    private handleKeyDown: MenuPopoverProps['onKeyDown'] = (event) => {
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

    public render() {
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
        } = this.props;

        return (
            <MenuContext.Provider value={this.menuContext}>
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
                        onKeyDown={chain(popoverProps.onKeyDown, this.handleKeyDown)}
                    >
                        <SubMenu
                            {...rest}
                            className={classNames(rest.className, {[styles.closed]: !open})}
                        />
                    </MenuPopover>
                </Overlay>
            </MenuContext.Provider>
        );
    }
}
