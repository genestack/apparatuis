/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';

import {debounce} from '../../utils/debounce';

const FETCH_DEBOUNCE_DURATION = 100;

interface State {
    isLoading: boolean;
    error: any;
    items: any[];
    value: string;
}

interface DataProviderChildrenProps {
    value: string;
    items: any[];
    isLoading: boolean;
    error: any;
    onValueChange: (value: string) => any;
}

/** DataProvider public properties */
export interface Props {
    fetch: (value: string) => Promise<any>;
    onLoaded?: (array: any) => any;
    children: (prop: DataProviderChildrenProps) => JSX.Element;
}

/** DataProvider */
export class AutocompleteDataProvider extends React.PureComponent<Props, State> {
    public state: State = {isLoading: false, error: null, items: [], value: ''};

    private mounted = false;

    public componentDidMount() {
        this.mounted = true;
    }

    public componentWillUnmount() {
        this.mounted = false;
    }

    private fetch = () => {
        const value = this.state.value;
        const checkIfActual = () => value === this.state.value;

        return this.props
            .fetch(value)
            .then((result) => {
                if (checkIfActual() && this.mounted) {
                    this.setState(
                        {
                            items: result,
                            isLoading: false,
                            error: null
                        },
                        () => this.props.onLoaded && this.props.onLoaded(result)
                    );
                }
            })
            .catch((error) => {
                if (checkIfActual() && this.mounted) {
                    this.setState({
                        items: [],
                        isLoading: false,
                        error: error || true
                    });
                }
            });
    };

    private debouncedFetch = debounce(this.fetch, FETCH_DEBOUNCE_DURATION);

    private handleValueChange = (value: string) => {
        this.setState(
            {
                isLoading: true,
                value
            },
            this.debouncedFetch
        );
    };

    public render() {
        const {items, isLoading, error, value} = this.state;

        return this.props.children({
            value,
            items,
            isLoading,
            error,
            onValueChange: this.handleValueChange
        });
    }
}
