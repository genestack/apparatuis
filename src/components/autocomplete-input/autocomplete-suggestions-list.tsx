/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {debounce} from './utils';
import fetchFromSomewhere from './test-fixtures';


class SuggestionsList extends React.PureComponent<any> {

    static initialState = {loading: false, error: null, items: []}

    state = SuggestionsList.initialState

    isMounted: boolean = false

    reset = (overrides) => {
        this.setState({
            ...SuggestionsList.initialState,
            ...overrides
        });
    }

    componentDidMount() {
        this.isMounted = true;
        this.fetch(this.props.value);
        setTimeout(() => {
            console.log(this.props.inputRef);
        }, 1000);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.debouncedFetch(this.props.value);
        }
    }

    componentWillUnmount() {
        this.isMounted = false;
    }

    fetch(value) {
        this.reset({
            loading: true
        });

        const isActual = () => value === this.props.value;

        return fetchFromSomewhere(value)
            .then((result) => {
                if (isActual && this.isMounted) {
                    this.setState({
                        items: result,
                        loading: false,
                        error: null
                    }, () => this.props.onLoaded(result));
                }
            })
            .catch((error) => {
                if (isActual && this.isMounted) {
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
        return (
            <div>
              {this.props.render({
                  items: this.state.items,
                  loading: this.state.loading,
                  error: this.state.error
              })}
            </div>
        );
    }
}

export default SuggestionsList;
