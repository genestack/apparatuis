/*
 * Copyright (c) 2011-2021 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';

import {chain, chainRefs, DarkContext} from '../../utils';
import {Menu, MenuProps} from '../menu';

import {CommonSelectProps} from './common-select-props';
import {SelectEmitter} from './select-emitter';

/** Select Menu Props */
export interface Props extends CommonSelectProps {
    /** Use native select instead Menu (default false) */
    native?: false;
    /** Select onChange handler */
    onValueChange?: MenuProps['onValueSelect'];
    /** Other menu props */
    selectProps?: MenuProps;
}

/** Menu based select */
export const SelectMenu = React.forwardRef<HTMLElement, Props>(function SelectMenu(props, ref) {
    const {native, selectProps, value, onValueChange, children, ...rest} = props;

    const emitterRef = React.useRef<HTMLButtonElement>(null);

    const [isMenuVisible, setMenuVisibility] = React.useState<boolean>(false);

    const handleMenuOpen = () => {
        setMenuVisibility(true);
    };

    const handleMenuClose = () => {
        setMenuVisibility(false);
    };

    return (
        <>
            <SelectEmitter
                {...rest}
                isButton
                onClick={chain(handleMenuOpen, rest.onClick)}
                ref={chainRefs(emitterRef, ref)}
            />
            <DarkContext.Provider value={false}>
                <Menu
                    data-qa="select-menu"
                    {...selectProps}
                    open={isMenuVisible}
                    referenceElement={emitterRef.current}
                    onClose={chain(handleMenuClose, selectProps?.onClose)}
                    onValueSelect={chain(
                        handleMenuClose,
                        selectProps?.onValueSelect,
                        onValueChange
                    )}
                >
                    {children}
                </Menu>
            </DarkContext.Provider>
        </>
    );
});
