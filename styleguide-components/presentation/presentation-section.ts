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
    /** The name of the field on which the display of the section depends */
    depends: string;
    /**
     * Field value at which the section will be displayed
     * if the value is undefined, it will be used as boolean
     */
    value?: unknown;
    /** Section content */
    children: React.ReactNode;
}

/** Rendering of a section depending on value of field */
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
