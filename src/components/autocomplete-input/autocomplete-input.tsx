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

import Input from '../input/input';

import styles from './styles.module.css';


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
            dangerouslySetInnerHTML={{__html: itemWithHighlights}}
        />
    );
};


export default class AutocompleteInput extends React.Component<AutocompleteInputProps> {

    inputRef: React.RefObject<{}> = React.createRef();

    handleStateChange = (changes) => {
        if (changes.hasOwnProperty('selectedItem')) {
            this.props.onValueChange(changes.selectedItem);
        } else if (changes.hasOwnProperty('inputValue')) {
            this.props.onValueChange(changes.inputValue);
        }
    }

    renderMenuContent({getItemProps, highlightedIndex, selectedItem}) {
        const {isLoading, error, items, value} = this.props;
        if (isLoading) {
            return renderLoading();
        }
        if (error) {
            return renderError();
        }
        if (items && items.length === 0) {
            return renderNoMatches();
        }
        const renderSuggestionFn = this.props.renderSuggestion || renderSuggestion;

        return items.map(
            (item, index) => renderSuggestionFn({
                item,
                index,
                value,
                getItemProps,
                highlightedIndex,
                selectedItem
            })
        );
    }

    render() {
        const {value} = this.props;
        return (
            <Downshift
                selectedItem={value}
                onStateChange={this.handleStateChange}
                defaultHighlightedIndex={0}
            >
                {({
                    getItemProps,
                    getInputProps,
                    getMenuProps,
                    highlightedIndex,
                    inputValue,
                    isOpen,
                    selectedItem
                }) => {
                    const menuStyle = calcMenuStyles(this.inputRef.current); // todo: memoize
                    const isMenuVisible = isOpen && Boolean(inputValue);
                    return (
                        <div>
                            <Input ref={this.inputRef} {...getInputProps()} />
                            <Menu {...getMenuProps({isOpen: isMenuVisible, style: menuStyle})}>
                                {this.renderMenuContent({
                                    getItemProps,
                                    highlightedIndex,
                                    selectedItem
                                })}
                            </Menu>
                        </div>
                    );
                }}
            </Downshift>
        );
    }
}

type RenderSuggestionProps = {
    item: string,
    index: number,
    value: string,
    getItemProps: (any) => any,
    selectedItem: string,
    highlightedIndex: number
};

type AutocompleteInputProps = {
    items: any[],
    isLoading: boolean,
    error: any,
    onValueChange: (value: string) => any
    value: string,
    renderSuggestion?: (props: RenderSuggestionProps) => JSX.Element
};

function calcMenuStyles(inputDOMNode) {
    if (!inputDOMNode) return {};
    const inputDOMRect = inputDOMNode.getBoundingClientRect();
    return {
        position: 'absolute',
        zIndex: 1070,
        top: inputDOMNode.offsetHeight + inputDOMRect.y + window.pageYOffset + 'px',
        minWidth: inputDOMNode.offsetWidth + 'px',
        left: inputDOMRect.x + window.pageXOffset + 'px'
    };
}
