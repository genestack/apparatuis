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
    <input ref={ref} {...props} />
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

const renderLoading = () => <li>{'loading...'}</li>;

const renderError = () => <li>{'error'}</li>;

const renderNoMatches = () => <li>{'no matches'}</li>;

const renderSuggestion = ({item, index, getItemProps, selectedItem, highlightedIndex}) => {
    const isActive = highlightedIndex === index;
    const isSelected = selectedItem === item;
    const itemClassNames = classnames(styles.suggestion, {
        [styles.activeSuggestion]: isActive,
        [styles.selectedSuggestion]: isSelected
    });
    return (
        <li
            className={itemClassNames}
            key={item}
            {...getItemProps({
                item,
                index
            })}>
            {item}
        </li>
    );
};


export default class AutocompleteInput extends React.Component<any> {

    inputRef: React.RefObject<HTMLInputElement> = React.createRef()

    state = {
        value: ''
    }

    handleStateChange = (changes, downshift) => {
        if (changes.hasOwnProperty('selectedItem')) {
            this.setState({value: changes.selectedItem});
        } else if (changes.hasOwnProperty('inputValue')) {
            this.setState({value: changes.inputValue});
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
                    return (
                        <div>
                            <Input ref={this.inputRef} {...getInputProps()} />
                            <Menu {...getMenuProps({isOpen: isOpen && Boolean(inputValue), style: cssStyle})}>
                                <DataProvider value={inputValue} onLoaded={(items) => {
                                    clearItems();
                                    if (items) {
                                        setHighlightedIndex(items.length ? 0 : null);
                                        setItemCount(items.length);
                                    }
                                }}>
                                    {
                                        ({items, loading, error}) => {
                                            if (isOpen === false) {
                                                return null;
                                            }
                                            if (loading) {
                                                return renderLoading();
                                            }
                                            if (error) {
                                                return renderError();
                                            }
                                            if (items && items.length === 0) {
                                                return renderNoMatches();
                                            }
                                            return items.map(
                                                (item, index) => renderSuggestion({
                                                    item,
                                                    index,
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
