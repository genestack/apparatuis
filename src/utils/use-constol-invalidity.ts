/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

/** Subscribe to native control invalidity */
export function useControlInvalidity(
    controlRef: React.RefObject<HTMLInputElement | HTMLSelectElement>,
    invalid?: boolean
) {
    // Control is valid by default
    const [invalidState, setInvalidState] = React.useState(invalid || false);

    // Use native control validation before browser paint
    React.useLayoutEffect(() => {
        if (controlRef.current) {
            const nextInvalidState = !controlRef.current.validity.valid;
            if (nextInvalidState !== invalidState) {
                setInvalidState(nextInvalidState);
            }
        }
    });

    return invalid === undefined ? invalidState : invalid;
}
