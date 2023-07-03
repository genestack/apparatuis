/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {ControlsItem, PageContent} from '../../src';

import {PresentationContext} from './presentation-context';

interface Props {
    children?: ((state: {[key: string]: unknown}) => React.ReactNode) | React.ReactNode;
}

/** Renders main presentation component with injected presentation state */
export function PresentationPane(props: Props) {
    const [state] = React.useContext(PresentationContext);

    return (
        <ControlsItem grow>
            <PageContent style={{textAlign: 'center'}}>
                <div
                    style={{
                        display: state.fullWidth ? 'block' : 'inline-block',
                        textAlign: 'left'
                    }}
                >
                    {typeof props.children === 'function' ? props.children(state) : props.children}
                </div>
            </PageContent>
        </ControlsItem>
    );
}
