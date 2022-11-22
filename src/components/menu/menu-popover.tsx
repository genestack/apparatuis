/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import closest from 'dom-helpers/closest';
import * as React from 'react';

import {Omit} from '../../utils/omit';
import {HiddenScrollbar, HiddenScrollbarProps} from '../hidden-scrollbar';
import {PopoverProps, Popover} from '../popover';

import * as styles from './menu-popover.module.css';

type TargetProps = Omit<PopoverProps, 'classes' | 'modifiers' | 'popperElementProps'>;

/**
 * This data attribute is used to find closest menu container.
 * Menu items are placed in container with `overflow: hidden` and
 * we can not place sub menus near the items. So we find closest
 * container through this attribute and create portal in it.
 */
const MENU_POPOVER_DATA_ATTRIBUTE = 'data-menu-popover';

/** MenuPopover Public properties */
export interface Props extends TargetProps {
    hiddenScrollbarProps?: Omit<HiddenScrollbarProps, 'children'>;
}

const modifiers: PopoverProps['modifiers'] = {
    preventOverflow: {
        boundariesElement: 'viewport'
    }
};

const popperElementProps: PopoverProps['popperElementProps'] = {
    [MENU_POPOVER_DATA_ATTRIBUTE.toString()]: true
};

/** Shortcut to Popover that is used in menu  */
export class MenuPopover extends React.Component<Props> {
    public static getClosestMenuContainer(element: HTMLElement): Element | null {
        return closest(element, `[${MENU_POPOVER_DATA_ATTRIBUTE}]`, document.body);
    }

    public render() {
        const {className, children, hiddenScrollbarProps, ...rest} = this.props;

        return (
            <Popover
                roundCorners
                {...rest}
                className={classNames(className, styles.root)}
                modifiers={modifiers}
                popperElementProps={popperElementProps}
            >
                <HiddenScrollbar {...hiddenScrollbarProps}>{children}</HiddenScrollbar>
            </Popover>
        );
    }
}
