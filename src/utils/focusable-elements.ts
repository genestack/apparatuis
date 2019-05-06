/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

/**
 * See difference between focusable and reachable elements at
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
 */
const FOCUSABLE_SELECTOR = [
    'button:not([disabled])',
    'a[href]:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]'
].join(', ');

const REACHABLE_SELECTOR = [
    'button:not([disabled]):not([tabindex^="-"])',
    'a[href]:not([disabled]):not([tabindex^="-"])',
    'input:not([disabled]):not([tabindex^="-"])',
    'select:not([disabled]):not([tabindex^="-"])',
    'textarea:not([disabled]):not([tabindex^="-"])',
    '[tabindex]:not([tabindex^="-"])'
].join(', ');

function matches(element: Element, selector: string) {
    // ie 11
    if ((element as any).msMatchesSelector) {
        return (element as any).msMatchesSelector(selector) as boolean;
    }

    return element.matches(selector);
}

/** Returns true if element could be focused */
export function isElementFocusable(element: Element) {
    return matches(element, FOCUSABLE_SELECTOR);
}

/** Returns true if element could be reached by Tab key */
export function isElementReachable(element: Element) {
    return matches(element, REACHABLE_SELECTOR);
}

/** Returns all focusable elements are contained in target element */
export function getFocusableElements(element: Element) {
    return element.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
}

/** Returns all focusable elements are contained in target element */
export function getReachableElements(element: Element) {
    return element.querySelectorAll<HTMLElement>(REACHABLE_SELECTOR);
}

/** Returns the first reachable element in container */
export function getFirstReachableElement(container: Element) {
    const items = getReachableElements(container);
    const item = items.item(0);

    return item instanceof HTMLElement ? item : null;
}

/** Returns the last reachable element in container */
export function getLastReachableElement(container: Element) {
    const items = getReachableElements(container);
    const item = items.item(items.length - 1);

    return item instanceof HTMLElement ? item : null;
}

/** Returns sibling element according to direction */
export function getSiblingElement(
    elements: Element[],
    element: Element,
    direction: 'prev' | 'next'
) {
    if (!element.parentElement || !elements.length) {
        return null;
    }

    let currentIndex = elements.indexOf(element);

    if (currentIndex === -1) {
        currentIndex = direction === 'next' ? -1 : elements.length;
    }

    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex < 0) {
        nextIndex = 0;
    }

    if (nextIndex >= elements.length) {
        nextIndex = elements.length - 1;
    }

    const nextElement = elements[nextIndex];

    if (nextElement instanceof HTMLElement && nextElement !== element) {
        return nextElement;
    }

    return null;
}

function getAncestors(startNode: Node | null) {
    const nodes: Node[] = [];
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
    for (let i = 0; i < firstAncestors.length; i += 1) {
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

    if (!(target instanceof HTMLElement) || !(relatedTarget instanceof HTMLElement)) {
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
