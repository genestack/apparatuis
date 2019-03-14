/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable max-file-line-count
import classNames from 'classnames';
import * as React from 'react';

import {KeyboardArrowRightIcon} from '../../icons/keyboard-arrow-right-icon';
import {chain} from '../../utils/chain';
import {debounce} from '../../utils/debounce';
import {getSiblingFocusableElement, getFirstFocusableElement} from '../../utils/focusable-elements';
import {Omit} from '../../utils/omit';
import {chainRefs} from '../../utils/set-ref';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {FlexExpander, FlexExpanderProps} from '../flex-expander';
import {FocusTrap} from '../focus-trap';
import {IconProps} from '../icon';
import {ListItem, ListItemProps, ListItemCell, ListItemCellProps} from '../list';
import {RootRef} from '../root-ref';

import * as styles from './menu-item.module.css';
import {MenuPopover, Props as MenuPopoverProps} from './menu-popover';
import {Props as SubMenuProps} from './sub-menu';

const OPEN_TIMEOUT = 200;
const CLOSE_TIMEOUT = 150;

type TargetProps = Omit<ListItemProps, 'classes' | 'as' | 'focused'>;

type SubMenuProp = React.ReactElement<SubMenuProps> | (() => React.ReactElement<SubMenuProps>);

/** MenuItem public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /**
     * Left icon for a menu item.
     * Anyway If no icon passed a menu item will have empty left margin
     * for menu items align.
     */
    icon?: React.ReactNode;
    /**
     * SubMenu is shown when user focuses on menu item.
     * Accepts only `<SubMenu />` elements or functions that returns it.
     */
    subMenu?: SubMenuProp;
    /** Properties for the left list item cell that contains icon */
    iconCellProps?: Omit<ListItemCellProps, 'children'>;
    /** Properties list item cell with main content */
    contentProps?: Omit<FlexExpanderProps, 'children'>;
    /** Properties for popover that shows SubMenu */
    subMenuPopoverProps?: Omit<
        MenuPopoverProps,
        | 'children'
        | 'open'
        | 'portalContainer'
        | 'referenceElement'
        | 'disableTransition'
        | 'placement'
    >;
    /**
     * Properties the right list item cell that contains arrow icon
     * indicated that MenuItem has a SubMenu
     */
    subMenuArrowIconCellProps?: Omit<ListItemCellProps, 'children'>;
    /** Properties for arrow icon in the right cell */
    subMenuArrowIconProps?: IconProps;
}

interface State {
    item: HTMLElement | null;
    container: Element | null;
    focused?: boolean;
}

const selectFocusDirection = (event: React.KeyboardEvent): 'next' | 'prev' | null => {
    if (event.key === 'ArrowDown') {
        return 'next';
    }

    if (event.key === 'ArrowUp') {
        return 'prev';
    }

    return null;
};

/**
 * Menu item should be a button to support native keyboard shortcuts
 * for clicking (by Enter or Space keys press)
 */
const renderButton = (props: React.HTMLAttributes<HTMLElement>) => (
    <button {...props} type="button" />
);

/**
 * MenuItem is a ListItem that is used in any Menu elements.
 *
 * It has three cells:
 *   - left icon cell, that could be omitted,
 *   - main content cell, that could have any React.Elements.
 *     Basically it should be `<ListItemText />`
 *   - right icon cell, that is shown when menu item has `subMenu`.
 */
export class MenuItem extends React.PureComponent<Props, State> {
    private itemRef = React.createRef<HTMLElement>();
    private subMenuPaperRef = React.createRef<HTMLDivElement>();

    public state: State = {
        item: null,
        container: null,
        focused: false
    };

    public componentWillUnmount() {
        this.closeSubMenuDebounced.cancel();
        this.openSubMenuDebounced.cancel();
    }

    private openSubMenu = (callback?: () => void) => {
        const item = this.itemRef.current;

        if (!item) {
            return;
        }

        const container = MenuPopover.getClosestMenuContainer(item);
        this.setState({item, container}, callback);
    };

    private closeSubMenu = (callback?: () => void) => {
        const state = {
            item: null,
            container: null
        };

        this.setState(state, callback);
    };

    private openSubMenuDebounced = debounce(this.openSubMenu, OPEN_TIMEOUT);
    private closeSubMenuDebounced = debounce(this.closeSubMenu, CLOSE_TIMEOUT);

    private scheduleSubMenuOpen() {
        this.closeSubMenuDebounced.cancel();
        if (this.openSubMenuDebounced.active) {
            return;
        }

        this.openSubMenuDebounced();
    }

    private scheduleSubMenuClose() {
        this.openSubMenuDebounced.cancel();
        this.closeSubMenuDebounced();
    }

    private closeSubMenuImmediately() {
        this.openSubMenuDebounced.cancel();
        this.closeSubMenuDebounced.cancel();
        this.closeSubMenu();
    }

    private openSubMenuImmediately(callback?: () => void) {
        this.openSubMenuDebounced.cancel();
        this.closeSubMenuDebounced.cancel();
        this.openSubMenu(callback);
    }

    private handleKeyDown: Props['onKeyDown'] = (event) => {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            this.openSubMenuImmediately(() => {
                const subMenuPaper = this.subMenuPaperRef.current;
                const subMenuItem = subMenuPaper && getFirstFocusableElement(subMenuPaper);
                if (subMenuItem) {
                    subMenuItem.focus();
                }
            });
        }

        const item = this.itemRef.current;
        const direction = selectFocusDirection(event);

        if (item && direction) {
            event.preventDefault();
            this.closeSubMenuImmediately();
            const nextItem = getSiblingFocusableElement(item, direction);
            if (nextItem) {
                nextItem.focus();
            }
        }
    };

    private handleSubMenuKeyDown: Props['onKeyDown'] = (event) => {
        const item = this.itemRef.current;

        if (event.key === 'ArrowLeft' && item && !event.defaultPrevented) {
            event.preventDefault();
            this.closeSubMenuImmediately();
            item.focus();
        }
    };

    /**
     * We focus any item under the cursor for following comfortable navigation
     * through keyboard.
     */
    private handleMouseMove = () => {
        const item = this.itemRef.current;
        if (item instanceof HTMLElement && document.activeElement !== item) {
            item.focus();
        }

        this.scheduleSubMenuOpen();
    };

    private handleMouseLeave = () => {
        this.scheduleSubMenuClose();
    };

    private handleSubMenuEnter = () => {
        this.scheduleSubMenuOpen();
    };

    private handleSubMenuLeave = () => {
        this.setState({focused: false});
        this.scheduleSubMenuClose();
    };

    private handleSubMenuFocus = () => {
        this.setState({focused: true});
        this.scheduleSubMenuOpen();
    };

    private handleSubMenuBlur = () => {
        this.scheduleSubMenuClose();
    };

    private handleFocus = () => {
        this.setState({focused: true});
    };

    private handleBlur = () => {
        this.setState({focused: false});
    };

    public render() {
        const {
            classes,
            className,
            children,
            icon,
            subMenu,
            iconCellProps = {},
            contentProps = {},
            subMenuPopoverProps = {},
            subMenuArrowIconCellProps = {},
            subMenuArrowIconProps = {},
            ...rest
        } = mergeClassesProps(this.props, styles);

        const {container, item} = this.state;

        const subMenuPopover =
            subMenu && item && container ? (
                <MenuPopover
                    {...subMenuPopoverProps}
                    open
                    portalContainer={container}
                    referenceElement={item}
                    disableTransition
                    placement="right-start"
                    rootRef={chainRefs(subMenuPopoverProps.rootRef, this.subMenuPaperRef)}
                    onKeyDown={chain(subMenuPopoverProps.onKeyDown, this.handleSubMenuKeyDown)}
                    onBlur={chain(subMenuPopoverProps.onBlur, this.handleSubMenuBlur)}
                    onFocus={chain(subMenuPopoverProps.onFocus, this.handleSubMenuFocus)}
                    onMouseEnter={chain(subMenuPopoverProps.onMouseEnter, this.handleSubMenuEnter)}
                    onMouseLeave={chain(subMenuPopoverProps.onMouseLeave, this.handleSubMenuLeave)}
                >
                    <FocusTrap>{typeof subMenu === 'function' ? subMenu() : subMenu}</FocusTrap>
                </MenuPopover>
            ) : null;

        const subMenuArrowIcon = subMenu ? (
            <ListItemCell {...subMenuArrowIconCellProps}>
                <KeyboardArrowRightIcon {...subMenuArrowIconProps} />
            </ListItemCell>
        ) : null;

        return (
            <React.Fragment>
                <RootRef rootRef={this.itemRef}>
                    <ListItem
                        {...rest}
                        as={renderButton}
                        focused={this.state.focused}
                        onFocus={chain(rest.onFocus, this.handleFocus)}
                        onBlur={chain(rest.onFocus, this.handleBlur)}
                        onKeyDown={chain(rest.onKeyDown, this.handleKeyDown)}
                        onMouseMove={chain(rest.onMouseMove, this.handleMouseMove)}
                        onMouseLeave={chain(rest.onMouseLeave, this.handleMouseLeave)}
                        className={classNames(className, classes.root)}
                        classes={{
                            focused: classes.focused,
                            hovered: classes.hovered
                        }}
                    >
                        <ListItemCell
                            {...iconCellProps}
                            className={classNames(iconCellProps.className, classes.iconCell)}
                        >
                            {icon}
                        </ListItemCell>
                        <FlexExpander
                            {...contentProps}
                            className={classNames(contentProps.className, classes.content)}
                        >
                            {children}
                        </FlexExpander>
                        {subMenuArrowIcon}
                    </ListItem>
                </RootRef>
                {subMenuPopover}
            </React.Fragment>
        );
    }
}
