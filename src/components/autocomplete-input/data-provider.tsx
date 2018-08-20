/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';
import {debounce} from './utils';


export default class DataProvider extends React.PureComponent<DataProviderProps> {

    static initialState = {loading: false, error: null, items: [], value: null}

    state = DataProvider.initialState

    mounted: boolean = false

    componentDidMount() {
        this.mounted = true;

        this.setState({
            ...DataProvider.initialState,
            loading: true
        }, () => this.fetch(this.props.value));
    }

    componentDidUpdate(prevProps) {
        const value = this.props.value;
        if (prevProps.value !== value) {
            this.setState({
                ...DataProvider.initialState,
                loading: true
            }, () => this.debouncedFetch(value));
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    fetch(value) {
        const isActual = () => value === this.props.value;

        return this.props.fetch(value)
            .then((result) => {
                if (isActual && this.mounted) {
                    this.setState({
                        items: result,
                        loading: false,
                        error: null,
                        value
                    }, () => this.props.onLoaded && this.props.onLoaded(result));
                }
            })
            .catch((error) => {
                if (isActual && this.mounted) {
                    this.setState({
                        items: [],
                        loading: false,
                        error: error || true,
                        value
                    });
                }
            });
    }

    debouncedFetch = debounce(this.fetch, 200, false)

    render() {
        const {items, loading, error, value} = this.state;
        return this.props.children({
            items,
            loading,
            error,
            value
        });
    }
}

type DataProviderProps = {
    children: ({
        items: array,
        loading: boolean,
        error: any,
        value: string
    }) => JSX.Element,
    value: string,
    fetch: (value: string) => Promise<any>,
    onLoaded?: (array) => any
};
