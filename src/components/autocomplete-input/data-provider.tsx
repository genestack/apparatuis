/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';
import debounce from 'lodash.debounce';


export default class DataProvider extends React.PureComponent<DataProviderProps> {

    static initialState = {isLoading: false, error: null, items: [], value: null};

    state = DataProvider.initialState;

    mounted: boolean = false;

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    fetch = () => {
        const value = this.state.value;
        const checkIfActual = () => value === this.state.value;

        return this.props.fetch(value)
            .then((result) => {
                if (checkIfActual() && this.mounted) {
                    this.setState({
                        items: result,
                        isLoading: false,
                        error: null
                    }, () => this.props.onLoaded && this.props.onLoaded(result));
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
    }

    debouncedFetch = debounce(this.fetch, 200, false);

    handleValueChange = (value) => this.setState({
        isLoading: true,
        value
    }, this.debouncedFetch)

    render() {
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

type DataProviderChildrenProps = {
    value: string,
    items: any[],
    isLoading: boolean,
    error: any,
    onValueChange: (value: string) => any
};

type DataProviderProps = {
    fetch: (value: string) => Promise<any>,
    onLoaded?: (array) => any,
    children: (prop: DataProviderChildrenProps) => JSX.Element
};
