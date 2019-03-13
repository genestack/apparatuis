/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

/**
 * Extends debounced function with debounce cancellation
 */
export type Debounced<T> = T & {
    /** Cancel debounced function */
    cancel: () => void;
    /** Indicates that debounced callback will be invoked */
    active: boolean;
};

/**
 * Creates a debounced function that delays invoking `callback` until after
 * `duration` milliseconds have elapsed since the last time the debounced
 * function was invoked.
 */
export function debounce<T extends (...args: any[]) => void>(
    callback: T,
    duration?: number
): Debounced<T> {
    let timeout: number | null = null;

    const debouncedCallback = ((...args: any[]) => {
        cancel();

        debouncedCallback.active = true;
        timeout = window.setTimeout(() => {
            debouncedCallback.active = false;
            callback(...args);
        }, duration);
    }) as Debounced<T>;

    debouncedCallback.cancel = cancel;
    debouncedCallback.active = false;

    function cancel() {
        debouncedCallback.active = false;
        if (timeout) {
            window.clearTimeout(timeout);
        }
    }

    return debouncedCallback;
}
