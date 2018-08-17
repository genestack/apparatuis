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
import Input from '../input/input';
import classnames from 'classnames';
import styles from './autocomplete-input.module.css';

//console.log(Downshift);

// appending to body to prevent from being hided by parent "overflow: hidden" css-rule
const SuggestionsPortal = ({children}) => ReactDOM.createPortal(children, document.body);


function Suggestions(props) {
    console.log(props);
    return <SuggestionsPortal>
        <div ref={props.innerRef}>fff</div>
        </SuggestionsPortal>
}


const fakeData = [
  "Don Perry",
  "Olivia Nguyen",
  "Donald Edwards",
  "Jeremiah Phelps",
  "Virgie Jefferson",
  "Mitchell Schultz",
  "Aiden Dunn",
  "Rhoda Martin",
  "William Burns",
  "Brett Haynes",
  "Steve Lyons",
  "Chase Lynch",
  "Troy Walsh",
  "Adrian Fox",
  "Aiden Dixon",
  "Tony George",
  "Mabelle Martinez",
  "Dollie Cunningham",
  "Melvin Williams",
  "Harriet Carroll"
];

const fetchFromSomewhere = (value) => new Promise((resolve, reject) => {
    const timeout = 200;
    const items = fakeData.filter(item => item.includes(value));
    setTimeout(
        () =>
            Math.random() > 0.9 ?
            reject() :
            resolve(items),
        timeout
    );
});

function debounce(func, wait, immediate) { // source: https://gist.github.com/sagiavinash/5c9084b79f68553c4b7d
    let timeout;
    return function(...args:any[]) {
	var context = this;//, args = arguments;
	var later = function() {
	    timeout = null;
	    if (!immediate) func.apply(context, args);
	};
	var callNow = immediate && !timeout;
	clearTimeout(timeout);
	timeout = setTimeout(later, wait);
	if (callNow) func.apply(context, args);
    };
}


class SuggestionsProvider extends React.PureComponent<any> {

    static initialState = {loading: false, error: null, items: []}

    state = SuggestionsProvider.initialState

    reset = (overrides) => {
        this.setState({
            ...SuggestionsProvider.initialState,
            ...overrides
        });
    }


    componentDidMount() {
        this.fetch(this.props.value);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.debouncedFetch(this.props.value);
        }
    }

    fetch(value) {
        this.reset({
            loading: true
        });

        const isActual = () => value === this.props.value;

        return fetchFromSomewhere(value)
            .then((result) => {
                if (isActual) {
                    this.setState({
                        items: result,
                        loading: false,
                        error: false
                    }, () => this.props.onLoaded(result));
                }
            })
            .catch((error) => {
                if (isActual) {
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
                  loading: this.state.loading
              })}
            </div>
        );
    }
}

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

class AutocompleteInput extends React.Component<any> {

    inputRef = React.createRef()

    state = {
        menuIsOpen: false,
        selectedItem: null,
        inputValue: ''
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
            selectedItem,
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

    handleInputValueChange = (inputValue, downshift) => {
        console.log(inputValue, downshift);
        this.setState({
            inputValue
        });
    }

    handleStateChange = (state, downshift) => {
        console.log(state, downshift);
    }

    render() {

        return (
            <Downshift
              stateReducer={stateReducer}

              selectedItem={this.state.selectedItem}
              onChange={this.handleChange}

              defaultHighlightedIndex={0}

              onOuterClick={() => this.setState({menuIsOpen: false})}
              onInputValueChange={this.handleInputValueChange}
              onStateChange={this.handleStateChange}
              inputValue={this.state.inputValue}
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
                  <Input
                    ref={this.inputRef}
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
                          <SuggestionsProvider value={inputValue} render={
                                ({items: suggestions, loading}) => {

                                    if (loading) {
                                        return <div>Loading ....</div>;
                                    }



                                return suggestions.map((item, index) => {
                                    const isActive = highlightedIndex === index;
                                    const isSelected = selectedItem === item;
                                    const itemClassNames = classnames({
                                        [styles.selectedSuggestion]: isActive
                                    });

                                    return (
                                        <div
                                          className={itemClassNames}
                                          key={item}
                                          {...getItemProps({
                                              item,
                                              index,
                                              //isActive,
                                              //isSelected,
                                          })}>
                                          {item}
                                        </div>
                                    );
                                });
                            }}

                            onLoaded={({items: suggestions}) => {
                                clearItems();
                                if (suggestions) {
                                    setHighlightedIndex(suggestions.length ? 0 : null);
                                    setItemCount(suggestions.length);
                                }
                            }} />

                      ) : null
                  }

                </div>
            )}
         </Downshift>);
    }
}

export default AutocompleteInput;
