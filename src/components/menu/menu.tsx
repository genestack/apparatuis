/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {chain} from '../../utils/chain';
import {getFirstReachableElement, getLastReachableElement} from '../../utils/focusable-elements';
import {Omit} from '../../utils/omit';
import {Overlay, OverlayProps} from '../overlay';

import {MenuPopover, Props as MenuPopoverProps} from './menu-popover';
import {SubMenu, Props as ListProps} from './sub-menu';

type TargetProps = ListProps;

type RestOverlayProps = Omit<OverlayProps, 'invisible' | 'open'>;
type RestPopoverProps = Omit<
    MenuPopoverProps,
    'referenceElement' | 'open' | 'withArrow' | 'positionFixed' | 'placement' | 'tabIndex'
>;

/** Menu public properties */
export interface Props extends TargetProps {
    open: boolean;
    onClose: OverlayProps['onClose'];
    referenceElement: MenuPopoverProps['referenceElement'];
    placement?: MenuPopoverProps['placement'];
    overlayProps?: RestOverlayProps;
    popoverProps?: RestPopoverProps;
}

/**
 * A Menu displays a list of choices on a temporary surface.
 * They appear when users interact with a button, action, or other control.
 */
export class Menu extends React.Component<Props> {
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
            referenceElement,
            placement = 'bottom-start',
            popoverProps = {},
            // tslint:disable-next-line no-object-literal-type-assertion
            overlayProps = {} as RestOverlayProps,
            ...rest
        } = this.props;

        return (
            <Overlay {...overlayProps} open={open} onClose={onClose} invisible>
                <MenuPopover
                    {...popoverProps}
                    referenceElement={referenceElement}
                    open={open}
                    placement={placement}
                    positionFixed
                    tabIndex={-1}
                    onKeyDown={chain(popoverProps.onKeyDown, this.handleKeyDown)}
                >
                    <SubMenu {...rest} />
                </MenuPopover>
            </Overlay>
        );
    }
}
