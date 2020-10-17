/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react';

import {Variant} from './common-tabs-props';
import {Indicator, Props as IndicatorProps, IndicatorPosition} from './indicator';

/** TabIndicator props */
export interface Props extends IndicatorProps {
    wrapperNode: HTMLElement | null;
    activeTabNode: HTMLElement | null;
    variant: Variant;
}

/** Tab indicator component */
export function TabIndicator({
    className,
    wrapperNode,
    activeTabNode,
    variant,
    position = 'bottom',
    ...restProps
}: Props) {
    const [tabIndicatorStyles, setTabIndicatorStyles] = React.useState<React.CSSProperties>({});

    console.log(666, wrapperNode);

    React.useEffect(() => {
        if (wrapperNode && activeTabNode) {
            const indicatorPositionStyles = getPositionStyles(
                wrapperNode,
                activeTabNode,
                position,
                variant
            );

            if (JSON.stringify(indicatorPositionStyles) !== JSON.stringify(tabIndicatorStyles)) {
                // FIXME
                setTabIndicatorStyles(indicatorPositionStyles);
            }
        }
    });

    if (!wrapperNode || !activeTabNode) {
        return null;
    }

    return (
        <Indicator
            {...restProps}
            selected
            style={{
                ...tabIndicatorStyles,
                ...restProps.style
            }}
        />
    );
}

function getPositionStyles(
    wrapperNode: HTMLElement,
    tabNode: HTMLElement,
    indicatorPosition: IndicatorPosition,
    variant: Variant
): React.CSSProperties {
    const wrapperClientRect = wrapperNode.getBoundingClientRect();
    const tabClientRect = tabNode.getBoundingClientRect();

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
            return {};
    }
}
