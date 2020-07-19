/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {Paper, Controls} from '../../src';
import {DarkContext} from '../../src/utils/dark-context';

import {PresentationContext, StateValue} from './presentation-context';

interface Props {
    initialState?: StateValue;
    children?: React.ReactNode;
}

/** Component that is used to simple presentation of UI Kit component */
export function Presentation(props: Props) {
    const state = React.useState<StateValue>(props.initialState || {});

    return (
        <PresentationContext.Provider value={state}>
            <DarkContext.Provider value={state[0].inverted}>
                <Paper>
                    <Controls>{props.children}</Controls>
                </Paper>
            </DarkContext.Provider>
        </PresentationContext.Provider>
    );
}
