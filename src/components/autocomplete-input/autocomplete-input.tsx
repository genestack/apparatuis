/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Downshift from 'downshift';
import classnames from 'classnames';
import DataProvider from './data-provider';
import {calcMenuStyles} from './utils';
import styles from './styles.module.css';


const Input = React.forwardRef((props, ref: React.RefObject<HTMLInputElement>) => (
    <input ref={ref} {...props} className={styles.input} />
));

// appending to body to prevent from being hided by parent "overflow: hidden" css-rule
const MenuPortal = ({children}) => ReactDOM.createPortal(children, document.body);

const Menu = React.forwardRef((props: any, ref: React.RefObject<HTMLUListElement>) => {
    const {children, isOpen, ...rest} = props;
    const style = {
        ...props.style,
        display: isOpen ? 'block' : 'none'
    };
    return (
        <MenuPortal>
            <ul ref={ref} {...rest} style={style} className={styles.suggestions}>
                {children}
            </ul>
        </MenuPortal>
    );
});

const renderLoading = () => <li className={styles.loadingState}>{'Searching...'}</li>;

const renderError = () => <li className={styles.errorState}>{'Network error occurred. Try again later.'}</li>;

const renderNoMatches = () => <li className={styles.emptyResultState}>{'No results found'}</li>;

const renderSuggestion = ({item, index, value, getItemProps, selectedItem, highlightedIndex}) => {
    const isActive = highlightedIndex === index;
    const isSelected = selectedItem === item;
    const itemClassNames = classnames(styles.suggestion, {
        [styles.activeSuggestion]: isActive,
        [styles.selectedSuggestion]: isSelected
    });
    const highlightRegExp = new RegExp(`(${value})`, 'ig');
    const itemWithHighlights = item.replace(highlightRegExp, '<mark>$1</mark>');

    return (
        <li
            className={itemClassNames}
            key={item}
            {...getItemProps({item, index})}
            dangerouslySetInnerHTML={{__html: itemWithHighlights}} />
    );
};


export default class AutocompleteInput extends React.Component<any> {
    inputRef: React.RefObject<HTMLInputElement> = React.createRef()

    state = {
        value: this.props.value || ''
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    handleChange = () => {
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }

    handleStateChange = (changes) => {
        if (changes.hasOwnProperty('selectedItem')) {
            this.setState({
                value: changes.selectedItem
            }, this.handleChange);
        } else if (changes.hasOwnProperty('inputValue')) {
            this.setState({
                value: changes.inputValue
            }, this.handleChange);
        }
    }

    render() {
        return (
            <Downshift
                selectedItem={this.state.value}
                onStateChange={this.handleStateChange}
            >
                {({
                    clearItems,
                    getItemProps,
                    getInputProps,
                    getMenuProps,
                    highlightedIndex,
                    inputValue,
                    isOpen,
                    selectedItem,
                    setHighlightedIndex,
                    setItemCount
                }) => {
                    const cssStyle = calcMenuStyles(this.inputRef.current); // todo: memoize
                    const isMenuVisible = isOpen && Boolean(inputValue);
                    return (
                        <div className={styles.autocomplete}>
                            <Input ref={this.inputRef} {...getInputProps()} />
                            <Menu {...getMenuProps({isOpen: isMenuVisible, style: cssStyle})}>
                                <DataProvider
                                    value={inputValue}
                                    fetch={this.props.fetch}
                                    onLoaded={(items) => {
                                        clearItems();
                                        if (items) {
                                            setHighlightedIndex(items.length ? 0 : null);
                                            setItemCount(items.length);
                                        }
                                    }}
                                >
                                    {
                                        ({items, loading, error, value}) => {
                                            if (isOpen === false) {
                                                return null;
                                            }
                                            if (loading) {
                                                return renderLoading();
                                            }
                                            if (error) {
                                                return renderError();
                                            }
                                            if (value !== inputValue) {
                                                return null;
                                            }
                                            if (items && items.length === 0) {
                                                return renderNoMatches();
                                            }
                                            return items.map(
                                                (item, index) => renderSuggestion({
                                                    item,
                                                    index,
                                                    value,
                                                    getItemProps,
                                                    highlightedIndex,
                                                    selectedItem
                                                })
                                            );
                                        }
                                    }
                                </DataProvider>
                            </Menu>
                        </div>
                    );
                }}
            </Downshift>
        );
    }
}
