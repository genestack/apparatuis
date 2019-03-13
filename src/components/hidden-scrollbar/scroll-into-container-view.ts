/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
interface ScrollIntoContainerViewArgs {
    target: HTMLElement;
    container: HTMLElement;
    startControl: HTMLElement;
    endControl: HTMLElement;
}

/**
 * Scrolls container to position when target component is visible.
 * It takes in account start and end absolute elements that could
 * overlap target element.
 */
export function scrollIntoContainerView(args: ScrollIntoContainerViewArgs) {
    const {target, container, startControl, endControl} = args;

    const scrollTop = container.scrollTop;
    const startControlRect = startControl.getBoundingClientRect();
    const endControlRect = endControl.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const startControlVisible = startControlRect.height > 0;
    const endControlVisible = endControlRect.height > 0;

    if (startControlVisible && !target.previousElementSibling) {
        container.scrollTop = 0;

        return;
    }

    if (endControlVisible && !target.nextElementSibling) {
        container.scrollTop = container.scrollHeight - container.clientHeight;

        return;
    }

    if (startControlVisible && targetRect.top < startControlRect.bottom) {
        container.scrollTop = scrollTop + targetRect.top - startControlRect.bottom;

        return;
    }

    if (endControlRect.height && targetRect.bottom > endControlRect.top) {
        container.scrollTop = scrollTop + targetRect.bottom - endControlRect.top;

        return;
    }
}
