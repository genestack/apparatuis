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
    // ie 11
    if ((element as any).msMatchesSelector) {
        return (element as any).msMatchesSelector(FOCUSABLE_SELECTOR) as boolean;
    }

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

    return null;
}

function getAncestors(startNode: Node | null) {
    const nodes = [];
    let node = startNode;

    while (node) {
        nodes.unshift(node);
        node = node.parentNode;
    }

    return nodes;
}

function getCommonAncestor(firstNode: Node, secondNode: Node) {
    const firstAncestors = getAncestors(firstNode);
    const secondAncestors = getAncestors(secondNode);

    if (firstAncestors[0] !== secondAncestors[0]) {
        return null;
    }
    for (let i = 0; i < firstAncestors.length; i++) {
        if (firstAncestors[i] !== secondAncestors[i]) {
            return firstAncestors[i - 1];
        }
    }

    return null;
}

/**
 * Determines the focus direction based on targets of FocusEvent
 */
export function getFocusDirection(
    event: Pick<FocusEvent, 'target' | 'relatedTarget'>
): 'next' | 'prev' | null {
    const {target, relatedTarget} = event;

    if (!(target instanceof Element) || !(relatedTarget instanceof Element)) {
        return null;
    }

    const ancestor = getCommonAncestor(target, relatedTarget);
    if (!(ancestor instanceof Element)) {
        return null;
    }

    const focusableElements = Array.from(getFocusableElements(ancestor));

    const currentIndex = focusableElements.indexOf(target);
    const previousIndex = focusableElements.indexOf(relatedTarget);

    if (currentIndex === -1 || previousIndex === -1 || currentIndex === previousIndex) {
        return null;
    }

    return currentIndex > previousIndex ? 'next' : 'prev';
}
