/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

// TODO: see https://github.com/paypal/downshift/issues/512
import OriginalDownshift from 'downshift';


const stateKeys = [
    'highlightedIndex',
    'inputValue',
    'isOpen',
    'selectedItem',
    'type'
];

const pickState = (state = {}) => {
    const result = {};
    stateKeys.forEach((k) => {
        if (state.hasOwnProperty(k)) {
            result[k] = state[k];
        }
    });
    return result;
};

export default class Downshift extends OriginalDownshift {
    selectItem = (item, otherStateToSet, cb) =>
        (this as any).internalSetState({
            isOpen: false,
            highlightedIndex: this.props.defaultHighlightedIndex,
            selectedItem: item,
            inputValue: this.props.itemToString(item),
            ...pickState(otherStateToSet),
        }, cb)
}
