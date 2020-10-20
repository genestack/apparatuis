/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';

import {OverridableComponent, OverridableProps, mergeClassesProps, chain} from '../../utils';
import {IndicatorProps, IndicatorPosition, Indicator} from '../tab';

import {Orientation, Variant, Size} from './common-tabs-props';
import * as styles from './tabs.module.css';
import {PositionStyles, getPositionStyles} from './utils';

/** Tabs props */
export interface Props {
    /** Value of selected tab */
    value: any;
    /** Tabs onChange handler */
    onValueChange?: (value: any) => void;

    /** Tabs orientation (default: "horizontal") */
    orientation?: Orientation;
    /** Style of tabs (default: "ghost") */
    variant?: Variant;
    /** Size of tabs (default: "normal") */
    size?: Size;
    /** Animation of the tab indicator(default: true) */
    animated?: boolean;

    /** Props of tabs wrapper */
    tabListProps?: React.HTMLAttributes<HTMLDivElement>;
    /**
     * Indicator position
     * Default value for horizontal tabs: "bottom"
     * Default value for vertical tabs: "right"
     */
    indicatorPosition?: IndicatorPosition;
    /** Props of tab indicator */
    indicatorProps?: IndicatorProps;
}

interface TypeMap {
    props: Props;
    defaultType: 'div';
}

/**
 *  Tabs wrapper component
 *
 *  If you are planning to use only the icon,
 *  then you need to insert it into "prepend" or "append" for correct display of paddings
 */
export const Tabs: OverridableComponent<TypeMap> = React.forwardRef<
    HTMLDivElement,
    OverridableProps<TypeMap>
>(function TabsComponent(props, ref) {
    const {
        value: selectedValue,
        onValueChange,

        component: Component = 'div',
        orientation = 'horizontal',
        variant = 'ghost',
        size = 'normal',
        animated = true,

        tabListProps = {},
        indicatorPosition: outlinePosition,
        indicatorProps = {},

        classes,
        children: childrenList,
        ...restProps
    } = mergeClassesProps(props, styles);

    const valueToIndex = new Map();
    const [mounted, setMounted] = React.useState(false);
    const tabListRef = React.useRef<HTMLDivElement>(null);
    const [indicatorStyles, setIndicatorStyles] = React.useState<PositionStyles | null>(null);

    const indicatorPosition = React.useMemo(() => {
        if (outlinePosition) {
            return outlinePosition;
        }

        if (orientation === 'vertical') {
            return 'right';
        }

        return 'bottom';
    }, [outlinePosition, orientation]);

    const children: React.ReactElement[] = React.Children.toArray(childrenList).filter(
        React.isValidElement
    );

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        if (!tabListRef.current) {
            return undefined;
        }

        const selectedTabNode = tabListRef.current.children[valueToIndex.get(selectedValue)];
        if (!selectedTabNode) {
            setIndicatorStyles(null);

            return undefined;
        }

        const tabIndicatorStyles = getPositionStyles(
            tabListRef.current,
            selectedTabNode,
            indicatorPosition,
            variant
        );

        setIndicatorStyles(tabIndicatorStyles);
    }, [indicatorPosition, variant, size, orientation, selectedValue, childrenList]);

    return (
        <Component {...restProps} ref={ref} className={classes.root}>
            <div
                role="tablist"
                {...tabListProps}
                ref={tabListRef}
                className={classNames(classes.tabList, {
                    [classes.vertical]: orientation === 'vertical'
                })}
            >
                {children.map((child, childIndex) => {
                    const {
                        onClick,
                        value,
                        indicatorProps: tabIndicatorProps = {},
                        ...restChildProps
                    } = child.props;

                    const childValue = value ?? childIndex;
                    const selected = childValue === selectedValue;

                    valueToIndex.set(childValue, childIndex);

                    const handleClick = React.useCallback(() => {
                        if (onValueChange) {
                            onValueChange(childValue);
                        }
                    }, [onValueChange, childValue]);

                    return React.cloneElement(child, {
                        className: animated && classes.tab,
                        value: childValue,
                        onClick: chain(handleClick, onClick),
                        selected,
                        variant,
                        size,
                        classes: {
                            indicator: animated && classes.indicator
                        },
                        indicatorPosition,
                        indicatorProps: {
                            ...tabIndicatorProps,
                            selected: !animated && selected
                        },
                        ...restChildProps
                    });
                })}
            </div>

            {animated && mounted && indicatorStyles && (
                <Indicator
                    {...indicatorProps}
                    selected
                    className={classes.indicator}
                    style={indicatorStyles}
                />
            )}
        </Component>
    );
});
