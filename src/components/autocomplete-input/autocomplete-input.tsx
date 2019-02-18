/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import {DownshiftProps, PropGetters, DownshiftState} from 'downshift';
import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

import {Omit} from '../../utils/omit';
import {Input, InputProps} from '../input';

import {Downshift} from './downshift-issue-512-fix';
import styles from './styles.module.css';

interface RenderSuggestionProps {
    item: string;
    index: number;
    value: string;
    getItemProps: (any: any) => any;
    selectedItem: string;
    highlightedIndex: number;
}

type RenderSuggestion = (props: RenderSuggestionProps) => JSX.Element;

/** AutocompleteInput public properties */
export interface Props extends Omit<InputProps, 'targetRef'> {
    items: any[];
    isLoading: boolean;
    error: any;
    renderSuggestion?: RenderSuggestion;
    renderLoading?: () => JSX.Element;
    renderNoMatches?: () => JSX.Element;
    renderError?: (error: any) => JSX.Element;
}

function calcMenuStyles(inputDOMNode: HTMLInputElement | null) {
    if (!inputDOMNode) {
        return {};
    }

    const inputDOMRect = inputDOMNode.getBoundingClientRect();

    return {
        position: 'absolute',
        zIndex: 1070,
        top: `${inputDOMNode.offsetHeight + inputDOMRect.top + window.pageYOffset}px`,
        minWidth: `${inputDOMNode.offsetWidth}px`,
        left: `${inputDOMRect.left + window.pageXOffset}px`
    };
}

function omit(omitProps: string[], props: {[key: string]: any}) {
    return Object.keys(props).reduce(
        (newObj, key) => (omitProps.includes(key) ? newObj : {...newObj, [key]: props[key]}),
        {} as any
    );
}

// appending to body to prevent from being hided by parent "overflow: hidden" css-rule
const MenuPortal = ({children}: {children: React.ReactNode}) => (
    <Fragment>{ReactDOM.createPortal(children, document.body)}</Fragment>
);

const Menu = React.forwardRef<HTMLUListElement, any>((props, ref) => {
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

const renderError = () => (
    <li className={styles.errorState}>{'Network error occurred. Try again later.'}</li>
);

const renderNoMatches = () => <li className={styles.emptyResultState}>{'No results found'}</li>;

const renderSuggestion: RenderSuggestion = ({
    item,
    index,
    value,
    getItemProps,
    selectedItem,
    highlightedIndex
}) => {
    const isActive = highlightedIndex === index;
    const isSelected = selectedItem === item;
    const itemClassNames = classNames(styles.suggestion, {
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

interface RenderMenuContentProps<Item> {
    getItemProps: PropGetters<Item>['getItemProps'];
    highlightedIndex: DownshiftProps<Item>['highlightedIndex'];
    selectedItem: DownshiftState<Item>['selectedItem'];
}

/** AutocompleteInput */
export class AutocompleteInput extends React.Component<Props> {
    private inputRef = React.createRef<HTMLInputElement>();

    private handleStateChange: DownshiftProps<string>['onStateChange'] = (changes) => {
        const {onValueChange} = this.props;

        if (!onValueChange) {
            return;
        }

        if (changes.hasOwnProperty('selectedItem')) {
            onValueChange(changes.selectedItem);
        } else if (changes.hasOwnProperty('inputValue')) {
            onValueChange(changes.inputValue);
        }
    };

    private renderMenuContent({
        getItemProps,
        highlightedIndex,
        selectedItem
    }: RenderMenuContentProps<string>) {
        const {isLoading, error, items, value} = this.props;
        const renderSuggestionFn = this.props.renderSuggestion || renderSuggestion;
        const renderLoadingFn = this.props.renderLoading || renderLoading;
        const renderErrorFn = this.props.renderError || renderError;
        const renderNoMatchesFn = this.props.renderNoMatches || renderNoMatches;

        if (isLoading) {
            return renderLoadingFn();
        }
        if (error) {
            return renderErrorFn(error);
        }
        if (items && items.length === 0) {
            return renderNoMatchesFn();
        }

        return items.map((item, index) =>
            renderSuggestionFn({
                item,
                index,
                value: value as any,
                getItemProps,
                highlightedIndex: highlightedIndex as any,
                selectedItem: selectedItem as any
            })
        );
    }

    public render() {
        const inputProps: InputProps = omit(
            [
                'items',
                'isLoading',
                'error',
                'renderSuggestion',
                'renderLoading',
                'renderNoMatches',
                'renderError'
            ],
            this.props
        );

        return (
            <Downshift
                selectedItem={inputProps.value}
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
                    const inputComponentProps: InputProps = getInputProps(
                        inputProps as React.InputHTMLAttributes<HTMLInputElement>
                    );
                    const menuStyle = calcMenuStyles(this.inputRef.current); // todo: memoize
                    const isMenuVisible = isOpen && Boolean(inputValue);

                    return (
                        <div>
                            <Input targetRef={this.inputRef} {...inputComponentProps} />
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
