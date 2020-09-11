/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';

import {DarkContext, chain} from '../../utils';
import {Menu, MenuProps} from '../menu';

import {CommonSelectProps} from './common-select-props';
import {Emitter} from './emitter';

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
export function SelectMenu(props: Props) {
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
            <Emitter
                {...rest}
                isButton
                onClick={chain(handleMenuOpen, rest.onClick)}
                ref={emitterRef}
            />
            <DarkContext.Provider value={false}>
                <Menu
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
}
