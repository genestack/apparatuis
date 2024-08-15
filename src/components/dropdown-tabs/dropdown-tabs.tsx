/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import React from 'react';

import {ArrowBottomThinIcon} from '../../icons';
import {
    OverridableProps,
    mergeClassesProps,
    chain,
    chainRefs,
    OverridableComponent
} from '../../utils';
import {Button, ButtonProps} from '../button';
import {Menu, MenuProps, MenuItem} from '../menu';
import {Tab, TabProps} from '../tab';

import * as styles from './dropdown-tabs.module.css';
import {getTabsInfo} from './utils';

/** Dropdown tabs props */
export interface Props extends Pick<TabProps, 'value' | 'variant'> {
    /** Tabs onChange handler */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onValueChange?: (value: any) => void;
    /** Size of tab control (default: "normal") */
    size?: 'normal' | 'small';

    /** Control props */
    controlProps?: TabProps;
    /** Button icon props */
    buttonIconProps?: ButtonProps;
    /** Menu props */
    menuProps?: MenuProps;
}

interface TypeMap {
    props: Props;
    defaultType: 'div';
}

/** Dropdown tabs wrapper component */
export const DropdownTabs: OverridableComponent<TypeMap> = React.forwardRef<
    HTMLDivElement,
    OverridableProps<TypeMap>
>(function DropdownTabsComponent(props, ref) {
    const {
        component: Component = 'div',
        value: selectedValue,
        onValueChange,
        variant = 'ghost',
        size = 'normal',
        children,

        controlProps = {},
        buttonIconProps = {},
        menuProps = {},
        classes,
        ...restProps
    } = mergeClassesProps(props, styles);

    const emitterRef = React.useRef<HTMLDivElement>(null);
    const [isMenuVisible, setMenuVisibility] = React.useState<boolean>(false);
    const {tabs, selectedTabData} = getTabsInfo(selectedValue, children);

    const handleMenuOpen = () => {
        setMenuVisibility(true);
    };

    const handleMenuClose = () => {
        setMenuVisibility(false);
    };

    return (
        <>
            <Component
                className={classes.root}
                ref={chainRefs(emitterRef, ref)}
                onClick={chain(handleMenuOpen, restProps.onClick)}
                {...restProps}
            >
                <Tab
                    selected
                    prepend={selectedTabData?.prepend}
                    append={selectedTabData?.append}
                    size={size}
                    variant={variant}
                    classes={{
                        selected: classes.selected,
                        normal: classes.normal,
                        small: classes.small,
                        tiny: classes.tiny
                    }}
                    {...controlProps}
                    className={classNames(styles.control, controlProps.className)}
                >
                    {selectedTabData?.children ?? selectedValue}
                </Tab>

                <Button
                    component="span"
                    tabIndex={undefined}
                    size={size === 'normal' ? 'small' : 'tiny'}
                    iconStart={<ArrowBottomThinIcon />}
                    {...buttonIconProps}
                    onClick={chain(handleMenuOpen, buttonIconProps.onClick)}
                    className={classNames(classes.icon, buttonIconProps.className)}
                />
            </Component>

            <Menu
                role="listbox"
                open={isMenuVisible}
                referenceElement={emitterRef.current}
                {...menuProps}
                onClose={chain(handleMenuClose, menuProps.onClose)}
                onValueSelect={chain(handleMenuClose, onValueChange, menuProps.onValueSelect)}
            >
                {tabs.map((tabElement, tabIndex) => {
                    const childValue = tabElement.props.value ?? tabIndex;
                    const active = childValue === selectedValue;

                    return (
                        <MenuItem
                            key={tabElement.key ?? tabIndex}
                            role="option"
                            active={active}
                            value={childValue}
                            {...tabElement.props}
                        />
                    );
                })}
            </Menu>
        </>
    );
});
