/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';

import {
    OverridableComponent,
    OverridableProps,
    mergeClassesProps,
    chain,
    chainRefs
} from '../../utils';

import {Orientation, Variant, Size} from './common-tabs-props';
import {TabIndicator} from './tab-indicator';
import * as styles from './tabs.module.css';

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
        value: tabsValue,
        onValueChange,

        component: Component = 'div',
        orientation = 'horizontal',
        variant = 'ghost',
        size = 'normal',
        classes,
        children,
        ...restProps
    } = mergeClassesProps(props, styles);

    let childIndex = 0;
    const valueToIndex = new Map();
    const tabListRef = React.useRef(null);
    const [activeTabNode] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
        console.log(123, tabListRef);
    });

    return (
        <Component
            role="tablist"
            {...restProps}
            ref={chainRefs(tabListRef, ref)}
            className={classNames(classes.root, {
                [classes.vertical]: orientation === 'vertical'
            })}
        >
            <TabIndicator
                wrapperNode={tabListRef.current}
                activeTabNode={activeTabNode}
                variant={variant}
            />

            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) {
                    return null;
                }

                const {onClick, value, ...restChildProps} = child.props;
                const childValue = value ?? childIndex;
                const selected = childValue === tabsValue;

                valueToIndex.set(childValue, childIndex);
                childIndex += 1;

                const handleClick = React.useCallback(() => {
                    if (onValueChange) {
                        onValueChange(childValue);
                    }
                }, [onValueChange, childValue]);

                return React.cloneElement(child, {
                    value: childValue,
                    onClick: chain(handleClick, onClick),
                    selected,
                    variant,
                    size,
                    ...restChildProps
                });
            })}
        </Component>
    );
});
