/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

/** Purify any react component */
export function wrapPureComponent<P>(Component: React.ReactType<P>) {
    class PureComponent extends React.PureComponent<P> {
        public render() {
            return <Component {...this.props} />;
        }
    }

    return PureComponent;
}
