/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import closest from 'dom-helpers/query/closest';
import * as React from 'react';

import {Omit} from '../../utils/omit';
import {Ref} from '../../utils/set-ref';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {HiddenScrollbar, HiddenScrollbarProps} from '../hidden-scrollbar';
import {PopoverProps, Popover} from '../popover';

import * as styles from './menu-popover.module.css';

type TargetProps = Omit<
    PopoverProps,
    'classes' | 'popperProps' | 'focusTrapProps' | 'popperElementProps'
>;

/**
 * This data attribute is used to find closest menu container.
 * Menu items are placed in container with `overflow: hidden` and
 * we can not place sub menus near the items. So we find closest
 * container through this attribute and create portal in it.
 */
const MENU_POPOVER_DATA_ATTRIBUTE = 'data-menu-popover';

/** MenuPopover Public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    popoverRef?: Ref<Popover>;
    hiddenScrollbarProps?: Omit<HiddenScrollbarProps, 'children'>;
}

const popperProps: PopoverProps['popperProps'] = {
    modifiers: {
        preventOverflow: {
            boundariesElement: 'viewport'
        }
    }
};

const focusTrapProps: PopoverProps['focusTrapProps'] = {
    enableSelfFocus: true
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
        const {
            className,
            popoverRef,
            classes,
            children,
            hiddenScrollbarProps,
            ...rest
        } = mergeClassesProps(this.props, styles);

        return (
            <Popover
                {...rest}
                ref={popoverRef}
                className={classNames(className, classes.root)}
                classes={{root: classes.popover}}
                popperProps={popperProps}
                focusTrapProps={focusTrapProps}
                popperElementProps={popperElementProps}
            >
                <HiddenScrollbar {...hiddenScrollbarProps}>{children}</HiddenScrollbar>
            </Popover>
        );
    }
}
