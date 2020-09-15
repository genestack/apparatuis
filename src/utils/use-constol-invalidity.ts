/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

/** Subscribe to native input invalidity */
export function useInputInvalidity(inputRef: React.RefObject<HTMLInputElement>, invalid?: boolean) {
    // Input is valid by default
    const [invalidState, setInvalidState] = React.useState(invalid || false);

    // Use native input validation before browser paint
    React.useLayoutEffect(() => {
        if (inputRef.current) {
            const nextInvalidState = !inputRef.current.validity.valid;
            if (nextInvalidState !== invalidState) {
                setInvalidState(nextInvalidState);
            }
        }
    });

    return invalid === undefined ? invalidState : invalid;
}
