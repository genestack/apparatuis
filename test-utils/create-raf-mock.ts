/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

/** Mock window.requestAnimationFrame */
export function createRafMock() {
    let rafCallbacks: Array<(() => void) | null> = [];

    return {
        beforeEach: () => {
            jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
                rafCallbacks.push(() => {
                    callback(0);
                });

                return rafCallbacks.length - 1;
            });

            jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((index: number) => {
                rafCallbacks[index] = null;
            });
        },

        afterEach: () => {
            rafCallbacks = [];
            (window.requestAnimationFrame as any).mockRestore();
            (window.cancelAnimationFrame as any).mockRestore();
        },

        runAll: () => {
            rafCallbacks.forEach((callback, index) => {
                if (callback) {
                    rafCallbacks[index] = null;
                    callback();
                }
            });
        }
    };
}
