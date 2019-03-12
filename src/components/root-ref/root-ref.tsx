/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {setRef, Ref} from '../../utils/set-ref';

/** Root Ref props */
export interface Props {
    rootRef: Ref<HTMLElement>;
    children: JSX.Element;
}

/** Root Ref props */
export class RootRef extends React.Component<Props> {
    private node: HTMLElement | null = null;

    public componentDidMount() {
        this.node = this.getHTMLNode();
        setRef(this.props.rootRef, this.node);
    }

    public componentDidUpdate(prevProps: Props) {
        const node = this.getHTMLNode();

        if (prevProps.rootRef !== this.props.rootRef || this.node !== node) {
            if (prevProps.rootRef !== this.props.rootRef) {
                setRef(prevProps.rootRef, null);
            }

            this.node = node;
            setRef(this.props.rootRef, this.node);
        }
    }

    public componentWillUnmount() {
        this.node = null;

        setRef(this.props.rootRef, null);
    }

    private getHTMLNode() {
        const node = ReactDOM.findDOMNode(this);

        return node instanceof HTMLElement ? node : null;
    }

    public render() {
        const {rootRef, children, ...rest} = this.props;

        return React.cloneElement(children, rest);
    }
}
