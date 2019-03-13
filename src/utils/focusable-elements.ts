/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

const FOCUSABLE_SELECTOR = [
    'button:not([disabled]):not([tabindex^="-"])',
    'a[href]:not([disabled]):not([tabindex^="-"])',
    'input:not([disabled]):not([tabindex^="-"])',
    'select:not([disabled]):not([tabindex^="-"])',
    'textarea:not([disabled]):not([tabindex^="-"])',
    '[tabindex]:not([tabindex^="-"])'
].join(', ');

/** Returns true if element could be focused */
export function isElementFocusable(element: Element) {
    return element.matches(FOCUSABLE_SELECTOR);
}

/** Returns all focusable elements are contained in target element */
export function getFocusableElements(element: Element) {
    return element.querySelectorAll(FOCUSABLE_SELECTOR);
}

/** Returns the first HTMLElement that could be focusable in target element */
export function getFirstFocusableElement(element: HTMLElement) {
    const focusableElements = getFocusableElements(element);

    const firstElement = focusableElements.item(0);

    return firstElement instanceof HTMLElement ? firstElement : null;
}

/** Returns the last HTMLElement that could be focusable in target element */
export function getLastFocusableElement(element: HTMLElement) {
    const focusableElements = getFocusableElements(element);

    const lastElement = focusableElements.item(focusableElements.length - 1);

    return lastElement instanceof HTMLElement ? lastElement : null;
}

/** Returns sibling element that could be focused according to direction */
export function getSiblingFocusableElement(element: HTMLElement, direction: 'prev' | 'next') {
    if (!element.parentElement) {
        return null;
    }

    const focusableElements = Array.from(getFocusableElements(element.parentElement));

    if (!focusableElements.length) {
        return null;
    }

    let currentIndex = focusableElements.indexOf(element);

    if (currentIndex === -1) {
        currentIndex = direction === 'next' ? -1 : focusableElements.length;
    }

    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex < 0) {
        nextIndex = 0;
    }

    if (nextIndex >= focusableElements.length) {
        nextIndex = focusableElements.length - 1;
    }

    const nextElement = focusableElements[nextIndex];

    if (nextElement instanceof HTMLElement && nextElement !== element) {
        return nextElement;
    }
}
