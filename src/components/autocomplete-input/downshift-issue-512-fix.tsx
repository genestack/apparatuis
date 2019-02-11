/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

// TODO: see https://github.com/paypal/downshift/issues/512
// tslint:disable-next-line:match-default-export-name
import OriginalDownshift, {Actions} from 'downshift';

const stateKeys = ['highlightedIndex', 'inputValue', 'isOpen', 'selectedItem', 'type'];

const pickState = (state: any = {}) => {
    const result: any = {};
    stateKeys.forEach((k) => {
        if (state.hasOwnProperty(k)) {
            result[k] = state[k];
        }
    });

    return result;
};

/** Patched Downshift */
export class Downshift extends OriginalDownshift {
    public selectItem: Actions<any>['selectItem'] = (item, otherStateToSet, cb) =>
        (this as any).internalSetState(
            {
                isOpen: false,
                highlightedIndex: this.props.defaultHighlightedIndex,
                selectedItem: item,
                inputValue: (this.props.itemToString as any)(item),
                ...pickState(otherStateToSet)
            },
            cb
        );
}
