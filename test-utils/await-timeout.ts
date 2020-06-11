/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/** Returns promise thar will be resolve after duration */
export async function awaitTimeout(duration?: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}
