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
import SuggestionsList from './autocomplete-suggestions-list';
import styles from './autocomplete-input.module.css';


// appending to body to prevent from being hided by parent "overflow: hidden" css-rule





console.log(Object.keys(Downshift.stateChangeTypes));

function stateReducer(state, changes) {
  // this prevents the menu from being closed when the user
  // selects an item with a keyboard or mouse
    switch (changes.type) {
    case Downshift.stateChangeTypes.changeInput:
        return {
            ...changes,
            isOpen: true
        };
    case Downshift.stateChangeTypes.keyDownEnter:
    case Downshift.stateChangeTypes.clickItem:
      return {
        ...changes,
        isOpen: state.isOpen,
        highlightedIndex: state.highlightedIndex,
      }
    default:
      return changes
  }
}


const renderLoader = () => (<div>{'Loading...'}</div>);

const renderError = () => (<div>{'ERROR'}</div>);

const renderSuggestion = ({item, index, getItemProps, highlightedIndex}) => {
    const isActive = highlightedIndex === index;
    const itemClassNames = classnames({
        [styles.activeSuggestion]: isActive
    });

    return (
        <div
          className={itemClassNames}
          key={item}
          {...getItemProps({
              item,
              index
          })}>
          {item}
        </div>
    );
}


class AutocompleteInput extends React.Component<any> {

    inputRef: any = React.createRef()

    state = {
        menuIsOpen: false,
        value: ''
    }

    handleKeyDown = ({
        event,
        isOpen,
        highlightedIndex,
        selectHighlightedItem,
        reset
    }) => {
        if (isOpen && ['Tab', ',', ';'].includes(event.key)) {
            event.preventDefault();
            if (highlightedIndex != null) {
                selectHighlightedItem();
            } else {
                reset();
            }
        }
    }

    handleChange = (selectedItem, downshift) => {
        console.log(selectedItem, downshift);
        this.setState({
            value: selectedItem,
            menuIsOpen: false
        }, () => {

            downshift.reset();

        });
        /*this.setState(
            (state) => ({
                ...state
            })
            () => {
                downshift.reset()
                //this.props.onChange(this.state.selectedContacts)
            },
        )*/
    }


    handleStateChange = (changes, downshift) => {
        console.log(changes, downshift);

        if (changes.hasOwnProperty('selectedItem')) {
            this.setState({value: changes.selectedItem})
        } else if (changes.hasOwnProperty('inputValue')) {
            this.setState({value: changes.inputValue})
        }

    }


    render() {



        return (
            <Downshift

              selectedItem={this.state.value}
              onChange={this.handleChange}

              defaultHighlightedIndex={0}

              onOuterClick={() => this.setState({
                  menuIsOpen: false
              })}
              onStateChange={this.handleStateChange}
          >
            {({
                clearItems,
                getItemProps,
                getInputProps,
                getLabelProps,
                getMenuProps,
                highlightedIndex,
                inputValue,
                isOpen,
                reset,

                selectedItem,
                setHighlightedIndex,
                setItemCount,
                selectHighlightedItem

            }) => (
                <div>
                  <input

                    {...getInputProps({
                        onKeyDown: (event) => this.handleKeyDown({
                            event,
                            isOpen,
                            highlightedIndex,
                            selectHighlightedItem,
                            reset
                        })
                    })} />


                  {isOpen ?
                      (
                          <SuggestionsList
                            inputRef={this.inputRef}
                            value={inputValue}
                            render={({loading, error, items}) => {
                                   if (loading) {
                                       return renderLoader();
                                   }

                                   if (error) {
                                       return renderError();
                                   }

                                   return items.map((item, index) =>
                                      renderSuggestion({
                                           item,
                                           index,
                                           getItemProps,
                                           highlightedIndex
                                      })
                                   );
                            }}
                            onLoaded={({items: suggestions}) => {
                                clearItems();
                                if (suggestions) {
                                    setHighlightedIndex(suggestions.length ? 0 : null);
                                    setItemCount(suggestions.length);
                                }
                            }} />

                      ) :
                   null}

                </div>
            )}
         </Downshift>);
    }
}

export default AutocompleteInput;
