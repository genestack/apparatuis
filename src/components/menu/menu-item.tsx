/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import contains from 'dom-helpers/contains';
import * as React from 'react';

import {KeyboardArrowRightIcon} from '../../icons/keyboard-arrow-right-icon';
import {chain} from '../../utils/chain';
import {debounce} from '../../utils/debounce';
import {
    getFirstReachableElement,
    getReachableElements,
    getSiblingElement
} from '../../utils/focusable-elements';
import {chainRefs} from '../../utils/set-ref';
import {mergeClassesProps, WithClasses} from '../../utils/styles';
import {FocusTrap} from '../focus-trap';
import {IconProps} from '../icon';
import {ListItem, ListItemProps} from '../list';

import {MenuContext} from './menu-context';
import * as styles from './menu-item.module.css';
import {getClosestMenuContainer, MenuPopover, Props as MenuPopoverProps} from './menu-popover';
import {Props as SubMenuProps} from './sub-menu';

const OPEN_TIMEOUT = 200;
const CLOSE_TIMEOUT = 150;

type TargetProps = Omit<ListItemProps, 'classes' | 'value' | 'interactive'>;

type SubMenuProp = React.ReactElement<SubMenuProps> | (() => React.ReactElement<SubMenuProps>);

/** MenuItem public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /**
     * SubMenu is shown when user focuses on menu item.
     * Accepts only `<SubMenu />` elements or functions that returns it.
     */
    subMenu?: SubMenuProp;
    /** Value that is used for `Menu.onValueSelect` callback */
    value?: unknown;
    /** Properties for popover that shows SubMenu */
    subMenuPopoverProps?: Omit<
        MenuPopoverProps,
        | 'children'
        | 'open'
        | 'portalContainer'
        | 'referenceElement'
        | 'disableTransition'
        | 'placement'
    > & {ref?: React.Ref<HTMLElement>};
    /** Properties for right arrow icon */
    subMenuArrowIconProps?: IconProps;
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
 * MenuItem is a ListItem that is used in any Menu elements.
 *
 * It has three cells:
 *   - left icon cell, that could be omitted,
 *   - main content cell, that could have any React.Elements.
 *   - right icon cell, that is shown when menu item has `subMenu`.
 */
export const MenuItem = React.forwardRef<HTMLElement, Props>(function MenuItem(props, ref) {
    const {
        classes,
        className,

        prepend,
        append,
        subMenu,
        value,

        subMenuPopoverProps = {},
        prependProps = {},
        appendProps = {},

        subMenuArrowIconProps,
        titleProps = {},
        ...rest
    } = mergeClassesProps(props, styles);

    const itemRef = React.useRef<HTMLElement>(null);
    const subMenuPaperRef = React.useRef<HTMLDivElement>(null);
    const [keyboardMode, setKeyboardMode] = React.useState(false);

    const [highlighted, setHighlighted] = React.useState(false);
    const [item, setItem] = React.useState<HTMLElement | null>(null);
    const [container, setContainer] = React.useState<Element | null>(null);

    const openSubMenu = () => {
        const item = itemRef.current;

        if (!item) {
            return;
        }

        const container = getClosestMenuContainer(item);
        setItem(item);
        setContainer(container);
        setHighlighted(true);
    };

    React.useEffect(() => {
        if (container) {
            const subMenuPaper = subMenuPaperRef.current;
            const subMenuItem = subMenuPaper && getFirstReachableElement(subMenuPaper);

            if (subMenuItem) {
                subMenuItem.focus();
            }
        }
    }, [container]);

    const closeSubMenu = () => {
        setItem(null);
        setContainer(null);
        setHighlighted(false);
    };

    const openSubMenuDebouncedRef = React.useRef(debounce(openSubMenu, OPEN_TIMEOUT));
    const closeSubMenuDebouncedRef = React.useRef(debounce(closeSubMenu, CLOSE_TIMEOUT));

    function scheduleSubMenuOpen() {
        closeSubMenuDebouncedRef.current.cancel();
        if (openSubMenuDebouncedRef.current.active) {
            return;
        }

        openSubMenuDebouncedRef.current();
    }

    function scheduleSubMenuClose() {
        openSubMenuDebouncedRef.current.cancel();
        closeSubMenuDebouncedRef.current();
    }

    function closeSubMenuImmediately() {
        openSubMenuDebouncedRef.current.cancel();
        closeSubMenuDebouncedRef.current.cancel();
        closeSubMenu();
    }

    function openSubMenuImmediately() {
        openSubMenuDebouncedRef.current.cancel();
        closeSubMenuDebouncedRef.current.cancel();
        openSubMenu();
    }

    React.useEffect(() => {
        const handleWindowMouseMove = (event: MouseEvent) => {
            if (!keyboardMode) {
                return;
            }

            setKeyboardMode(false);

            const {target} = event;
            const item = itemRef.current;

            if (target instanceof Element && item && contains(item, target)) {
                item.focus();
                openSubMenuImmediately();
            }
        };

        window.addEventListener('mousemove', handleWindowMouseMove);

        return () => {
            closeSubMenuDebouncedRef.current.cancel();
            openSubMenuDebouncedRef.current.cancel();
            window.removeEventListener('mousemove', handleWindowMouseMove);
        };
    }, [keyboardMode]);

    const handleKeyDown: Props['onKeyDown'] = (event) => {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            setKeyboardMode(true);
            openSubMenuImmediately();
        }

        const item = itemRef.current;
        const direction = selectFocusDirection(event);

        if (item && direction) {
            event.preventDefault();
            setKeyboardMode(true);
            closeSubMenuImmediately();
            const reachableElements =
                item.parentElement && Array.from(getReachableElements(item.parentElement));
            const nextItem =
                reachableElements && getSiblingElement(reachableElements, item, direction);
            if (nextItem) {
                nextItem.focus();
            }
        }
    };

    const handleSubMenuKeyDown: Props['onKeyDown'] = (event) => {
        const item = itemRef.current;

        if (event.key === 'ArrowLeft' && item) {
            event.preventDefault();
            event.stopPropagation();
            closeSubMenuImmediately();
            item.focus();
        }
    };

    /**
     * We focus any item under the cursor for following comfortable navigation
     * through keyboard.
     */
    const handleMouseEnter = () => {
        const item = itemRef.current;
        if (item instanceof HTMLElement && document.activeElement !== item) {
            item.focus();
        }

        scheduleSubMenuOpen();
    };

    const handleMouseLeave = () => {
        scheduleSubMenuClose();
    };

    const handleSubMenuEnter = () => {
        scheduleSubMenuOpen();
    };

    const handleSubMenuLeave = () => {
        scheduleSubMenuClose();
    };

    const handleSubMenuFocus = () => {
        setHighlighted(true);
        scheduleSubMenuOpen();
    };

    const handleSubMenuBlur = () => {
        scheduleSubMenuClose();
    };

    const handleFocus = () => {
        setHighlighted(true);
    };

    const handleBlur = () => {
        setHighlighted(false);
    };

    const subMenuPopover =
        subMenu && item && container && (!rest.disabled || !rest.inclusiveDisabled) ? (
            <MenuPopover
                {...subMenuPopoverProps}
                open
                portalContainer={container}
                referenceElement={item}
                disableTransition
                placement="right-start"
                ref={chainRefs(subMenuPopoverProps.ref, subMenuPaperRef)}
                onKeyDown={chain(subMenuPopoverProps.onKeyDown, handleSubMenuKeyDown)}
                onBlur={chain(subMenuPopoverProps.onBlur, handleSubMenuBlur)}
                onFocus={chain(subMenuPopoverProps.onFocus, handleSubMenuFocus)}
                onMouseEnter={chain(subMenuPopoverProps.onMouseEnter, handleSubMenuEnter)}
                onMouseLeave={chain(subMenuPopoverProps.onMouseLeave, handleSubMenuLeave)}
                className={classes.subMenu}
            >
                <FocusTrap>{typeof subMenu === 'function' ? subMenu() : subMenu}</FocusTrap>
            </MenuPopover>
        ) : null;

    const menuContext = React.useContext(MenuContext);

    function handleClick() {
        if (menuContext) {
            menuContext.onItemSelect({
                value,
                hasSubMenu: !!subMenu
            });
        }
    }

    return (
        <React.Fragment>
            <ListItem
                data-qa="menu-item"
                {...rest}
                interactive
                focused={highlighted}
                className={classNames(className, classes.root)}
                prependProps={{
                    ...prependProps,
                    className: classNames(prependProps.className, classes.prepend)
                }}
                prepend={<React.Fragment>{prepend}</React.Fragment>}
                appendProps={{
                    ...appendProps,
                    className: classNames(appendProps.className, classes.append)
                }}
                titleProps={titleProps}
                append={
                    append || subMenu ? (
                        <React.Fragment>
                            {append}
                            {subMenu ? <KeyboardArrowRightIcon {...subMenuArrowIconProps} /> : null}
                        </React.Fragment>
                    ) : null
                }
                onClick={chain(rest.onClick, handleClick)}
                onFocus={chain(rest.onFocus, handleFocus)}
                onBlur={chain(rest.onBlur, handleBlur)}
                onKeyDown={chain(rest.onKeyDown, handleKeyDown)}
                onMouseEnter={chain(rest.onMouseEnter, handleMouseEnter)}
                onMouseLeave={chain(rest.onMouseLeave, handleMouseLeave)}
                ref={chainRefs(ref, itemRef)}
            />
            {subMenuPopover}
        </React.Fragment>
    );
});
