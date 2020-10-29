/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {PresentationContext} from './presentation-context';

interface Props {
    depends: string;
    value?: unknown;
    children: React.ReactNode;
}

/** Rendering of a section depending on state of field */
export function PresentationSection({depends, value, children}: Props) {
    const [state] = React.useContext(PresentationContext);

    const selectedValue = state[depends];
    const type = value === undefined ? 'checkbox' : 'radio';

    if (type === 'checkbox' && selectedValue) {
        return children;
    }

    if (type === 'radio' && selectedValue === value) {
        return children;
    }

    return null;
}
