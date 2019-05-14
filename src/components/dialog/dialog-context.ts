/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

interface DialogContextValue {
    scrollable: boolean;
    hideCloseButton: boolean;
}

/**
 * Private Dialog Context.
 * It is used to inform nested dialog elements about dialog settings.
 */
export const DialogContext = React.createContext<DialogContextValue>({
    scrollable: false,
    hideCloseButton: false
});
