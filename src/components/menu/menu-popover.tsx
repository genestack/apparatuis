/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import closest from 'dom-helpers/closest';
import * as React from 'react';

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

const modifiers: PopoverProps['modifiers'] = [
    {
        name: 'preventOverflow',
        options: {
            altAxis: true
        }
    }
];

const popperElementProps: PopoverProps['popperElementProps'] = {
    [MENU_POPOVER_DATA_ATTRIBUTE.toString()]: 'true'
};

export function getClosestMenuContainer(element: HTMLElement): Element | null {
    return closest(element, `[${MENU_POPOVER_DATA_ATTRIBUTE}]`, document.body);
}

/** Shortcut to Popover that is used in menu  */
export const MenuPopover = React.forwardRef<HTMLElement, Props>(function MenuPopover(props, ref) {
    const {className, children, hiddenScrollbarProps, ...rest} = props;

    return (
        <Popover
            roundCorners
            {...rest}
            ref={ref}
            className={classNames(className, styles.root)}
            modifiers={modifiers}
            popperElementProps={popperElementProps}
        >
            <HiddenScrollbar {...hiddenScrollbarProps}>{children}</HiddenScrollbar>
        </Popover>
    );
});
