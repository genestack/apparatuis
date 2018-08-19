/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';
import {debounce} from './utils';
import fetchFromSomewhere from './test-fixtures';


export default class DataProvider extends React.PureComponent<any> {

    static initialState = {loading: false, error: null, items: []}

    state = DataProvider.initialState

    mounted: boolean = false

    componentDidMount() {
        this.mounted = true;

        this.setState({
            loading: true
        }, () => this.fetch(this.props.value));
    }

    componentDidUpdate(prevProps) {
        const value = this.props.value;
        if (prevProps.value !== value) {
            this.setState({
                loading: true
            }, () => this.debouncedFetch(value));
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    fetch(value) {
        const isActual = () => value === this.props.value;

        return (this.props.fetch || fetchFromSomewhere)(value)
            .then((result) => {
                if (isActual && this.mounted) {
                    this.setState({
                        items: result,
                        loading: false,
                        error: null
                    }, () => this.props.onLoaded && this.props.onLoaded(result));
                }
            })
            .catch((error) => {
                if (isActual && this.mounted) {
                    this.setState({
                        items: [],
                        loading: false,
                        error: error || true
                    });
                }
            });
    }

    debouncedFetch = debounce(this.fetch, 200, false)

    render() {
        return (this.props.children as (any) => JSX.Element)({
            items: this.state.items,
            loading: this.state.loading,
            error: this.state.error
        });
    }
}

