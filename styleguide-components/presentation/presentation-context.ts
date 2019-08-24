/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

/** StateValue */
export interface StateValue {
    [key: string]: any;
}

/** SetState */
export type SetState = (state: StateValue) => void;

/** PresentationContextValue */
export type PresentationContextValue = [StateValue, SetState];

/** Sharing state in context */
export const PresentationContext = React.createContext<PresentationContextValue>([
    {},
    // tslint:disable-next-line: no-empty
    () => {}
]);

/** Hook for injecting presentation state */
export function usePresentation() {
    const [state] = React.useContext(PresentationContext);

    return state;
}
