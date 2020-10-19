/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react';

import {OverridableComponent, OverridableProps} from '../../utils';
import {Indicator, IndicatorProps, IndicatorPosition} from '../tab';

import {Variant} from './common-tabs-props';

/** TabIndicator props */
export interface Props extends IndicatorProps {
    /** Style of tab indicator (default: "ghost") */
    variant?: Variant;
    /** Tab list DOM node */
    tabListNode: HTMLElement;
    /** Selected tab DOM node */
    selectedTabNode?: Element;
}

interface TypeMap {
    props: Props;
    defaultType: 'span';
}

interface IndicatorStyles {
    top: number;
    left: number;
    width: number;
    height: number;
}

/** Tab indicator component */
export const TabIndicator: OverridableComponent<TypeMap> = React.forwardRef<
    HTMLSpanElement,
    OverridableProps<TypeMap>
>(function TabIndicatorComponent(props, ref) {
    const {
        variant = 'ghost',
        tabListNode,
        selectedTabNode,
        position = 'bottom',
        ...restProps
    } = props;

    if (!selectedTabNode) {
        return null;
    }

    const [tabIndicatorStyles, setTabIndicatorStyles] = React.useState<IndicatorStyles>({
        top: 0,
        left: 0,
        width: 0,
        height: 0
    });

    React.useEffect(() => {
        if (tabListNode && selectedTabNode) {
            const indicatorStyles = getPositionStyles(
                tabListNode,
                selectedTabNode,
                position,
                variant
            );

            const isSameObject = Object.keys(indicatorStyles).every(
                (prop) =>
                    tabIndicatorStyles[prop as keyof IndicatorStyles] ===
                    indicatorStyles[prop as keyof IndicatorStyles]
            );

            if (!isSameObject) {
                setTabIndicatorStyles(indicatorStyles);
            }
        }
    });

    return (
        <Indicator
            {...restProps}
            ref={ref}
            selected
            style={{
                ...tabIndicatorStyles,
                ...restProps.style
            }}
        />
    );
});

function getPositionStyles(
    tabListNode: HTMLElement,
    selectedTabNode: Element,
    indicatorPosition: IndicatorPosition,
    variant: Variant
): IndicatorStyles {
    const wrapperClientRect = tabListNode.getBoundingClientRect();
    const tabClientRect = selectedTabNode.getBoundingClientRect();

    const top = tabClientRect.y - wrapperClientRect.y;
    const left = tabClientRect.x - wrapperClientRect.x;

    const indicatorHeight = variant === 'ghost' ? 2 : tabClientRect.height;
    const indicatorWidth = variant === 'ghost' ? 2 : tabClientRect.width;

    switch (indicatorPosition) {
        case 'bottom':
            return {
                left,
                top: top + tabClientRect.height - indicatorHeight,
                width: tabClientRect.width,
                height: indicatorHeight
            };
        case 'top':
            return {
                left,
                top,
                width: tabClientRect.width,
                height: indicatorHeight
            };
        case 'right':
            return {
                top,
                left: left + tabClientRect.width - indicatorWidth,
                height: tabClientRect.height,
                width: indicatorWidth
            };
        case 'left':
            return {
                top,
                left,
                height: tabClientRect.height,
                width: indicatorWidth
            };
        default:
            throw new Error('Invalid value for tab indicator position');
    }
}
