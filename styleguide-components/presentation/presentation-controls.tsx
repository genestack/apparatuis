/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {ControlsItem, List} from '../../src';
import {DarkContext} from '../../src/utils/dark-context';

interface Props {
    children?: React.ReactNode;
}

/** Panel with presentation controls */
export function PresentationControls(props: Props) {
    return (
        <ControlsItem>
            <DarkContext.Provider value={false}>
                <form style={{display: 'flex', background: '#fff'}}>
                    <List>{props.children}</List>
                </form>
            </DarkContext.Provider>
        </ControlsItem>
    );
}
