/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import {IndicatorPosition} from '../tab';

import {Variant} from './common-tabs-props';

/** Props of position and size */
export interface PositionStyles {
    top: number;
    left: number;
    width: number;
    height: number;
}

/** Calculation of size and position of indicator */
export function getPositionStyles(
    tabListNode: HTMLElement,
    selectedTabNode: Element,
    indicatorPosition: IndicatorPosition,
    variant: Variant
): PositionStyles {
    const wrapperClientRect = tabListNode.getBoundingClientRect();
    const tabClientRect = selectedTabNode.getBoundingClientRect();

    const top = tabClientRect.top - wrapperClientRect.top;
    const left = tabClientRect.left - wrapperClientRect.left;

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
