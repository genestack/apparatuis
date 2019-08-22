/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable max-file-line-count
import classNames from 'classnames';
import contains from 'dom-helpers/query/contains';
import * as React from 'react';

import {KeyboardArrowRightIcon} from '../../icons/keyboard-arrow-right-icon';
import {chain} from '../../utils/chain';
import {debounce} from '../../utils/debounce';
import {
    getSiblingElement,
    getReachableElements,
    getFirstReachableElement
} from '../../utils/focusable-elements';
import {Omit} from '../../utils/omit';
import {chainRefs} from '../../utils/set-ref';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {FocusTrap} from '../focus-trap';
import {IconProps} from '../icon';
import {ListItem, ListItemProps} from '../list';
import {RootRef} from '../root-ref';

import {MenuContext, MenuContextValue} from './menu-context';
import * as styles from './menu-item.module.css';
import {MenuPopover, Props as MenuPopoverProps} from './menu-popover';
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
    >;
    /** Properties for right arrow icon */
    subMenuArrowIconProps?: IconProps;
}

interface State {
    item: HTMLElement | null;
    container: Element | null;
    highlighted?: boolean;
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
export class MenuItem extends React.PureComponent<Props, State> {
    private itemRef = React.createRef<HTMLElement>();
    private subMenuPaperRef = React.createRef<HTMLDivElement>();

    public state: State = {
        item: null,
        container: null,
        highlighted: false
    };

    public componentWillUnmount() {
        this.closeSubMenuDebounced.cancel();
        this.openSubMenuDebounced.cancel();
        this.exitKeyboardMode();
    }

    private openSubMenu = (callback?: () => void) => {
        const item = this.itemRef.current;

        if (!item) {
            return;
        }

        const container = MenuPopover.getClosestMenuContainer(item);
        this.setState({item, container, highlighted: true}, callback);
    };

    private closeSubMenu = (callback?: () => void) => {
        const state = {
            item: null,
            container: null,
            highlighted: false
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

    private enterKeyboardMode() {
        window.addEventListener('mousemove', this.handleWindowMouseMove);
    }

    private exitKeyboardMode() {
        window.removeEventListener('mousemove', this.handleWindowMouseMove);
    }

    private handleWindowMouseMove = (event: MouseEvent) => {
        this.exitKeyboardMode();

        const {target} = event;
        const item = this.itemRef.current;

        if (target instanceof Node && item && contains(item, target)) {
            item.focus();
            this.openSubMenuImmediately();
        }
    };

    private handleKeyDown: Props['onKeyDown'] = (event) => {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            this.enterKeyboardMode();
            this.openSubMenuImmediately(() => {
                const subMenuPaper = this.subMenuPaperRef.current;
                const subMenuItem = subMenuPaper && getFirstReachableElement(subMenuPaper);
                if (subMenuItem) {
                    subMenuItem.focus();
                }
            });
        }

        const item = this.itemRef.current;
        const direction = selectFocusDirection(event);

        if (item && direction) {
            event.preventDefault();
            this.enterKeyboardMode();
            this.closeSubMenuImmediately();
            const reachableElements =
                item.parentElement && Array.from(getReachableElements(item.parentElement));
            const nextItem =
                reachableElements && getSiblingElement(reachableElements, item, direction);
            if (nextItem) {
                nextItem.focus();
            }
        }
    };

    private handleSubMenuKeyDown: Props['onKeyDown'] = (event) => {
        const item = this.itemRef.current;

        if (event.key === 'ArrowLeft' && item) {
            event.preventDefault();
            event.stopPropagation();
            this.closeSubMenuImmediately();
            item.focus();
        }
    };

    /**
     * We focus any item under the cursor for following comfortable navigation
     * through keyboard.
     */
    private handleMouseEnter = () => {
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
        this.scheduleSubMenuClose();
    };

    private handleSubMenuFocus = () => {
        this.setState({highlighted: true});
        this.scheduleSubMenuOpen();
    };

    private handleSubMenuBlur = () => {
        this.scheduleSubMenuClose();
    };

    private handleFocus = () => {
        this.setState({highlighted: true});
    };

    private handleBlur = () => {
        this.setState({highlighted: false});
    };

    private createClickHandler = (menuContext: MenuContextValue | null) => (
        event: React.SyntheticEvent
    ) => {
        if (menuContext) {
            menuContext.onItemSelect(this, event);
        }
    };

    public render() {
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
        } = mergeClassesProps(this.props, styles);

        const {container, item} = this.state;

        const subMenuPopover =
            subMenu && item && container && !rest.disabled ? (
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
                    className={classes.subMenu}
                >
                    <FocusTrap>{typeof subMenu === 'function' ? subMenu() : subMenu}</FocusTrap>
                </MenuPopover>
            ) : null;

        return (
            <MenuContext.Consumer>
                {(menuContext) => (
                    <React.Fragment>
                        <RootRef rootRef={this.itemRef}>
                            <ListItem
                                {...rest}
                                interactive
                                focused={this.state.highlighted}
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
                                append={
                                    append || subMenu ? (
                                        <React.Fragment>
                                            {append}
                                            {subMenu ? (
                                                <KeyboardArrowRightIcon
                                                    {...subMenuArrowIconProps}
                                                />
                                            ) : null}
                                        </React.Fragment>
                                    ) : null
                                }
                                onClick={chain(rest.onClick, this.createClickHandler(menuContext))}
                                onFocus={chain(rest.onFocus, this.handleFocus)}
                                onBlur={chain(rest.onFocus, this.handleBlur)}
                                onKeyDown={chain(rest.onKeyDown, this.handleKeyDown)}
                                onMouseEnter={chain(rest.onMouseEnter, this.handleMouseEnter)}
                                onMouseLeave={chain(rest.onMouseLeave, this.handleMouseLeave)}
                            />
                        </RootRef>
                        {subMenuPopover}
                    </React.Fragment>
                )}
            </MenuContext.Consumer>
        );
    }
}
