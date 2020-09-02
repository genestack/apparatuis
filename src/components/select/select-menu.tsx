/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';

import {DarkContext} from '../../utils';
import {Menu} from '../menu';

import {SelectProps} from './';
import {Emitter} from './emitter';
import {OnChangeSelectHandler} from './select';
import {getSelectLabel} from './utils';

type TargetProps = React.SelectHTMLAttributes<HTMLDivElement>;
type Props = TargetProps & SelectProps;

/** Menu based select */
export function SelectMenu(props: Props) {
    const {value, onValueChange, disabled, emitterProps, children} = props;

    const wrapperRef = React.useRef<HTMLButtonElement>(null);
    const [isMenuVisible, setMenuVisibility] = React.useState<boolean>(false);

    const handleMenuOpen = React.useCallback(() => {
        setMenuVisibility((visibility) => !visibility);
    }, []);

    const onCloseSelect = React.useCallback(() => {
        setMenuVisibility(false);
    }, []);

    const onValueSelect: OnChangeSelectHandler = React.useCallback(
        (...args) => {
            onValueChange(...args);
            onCloseSelect();
        },
        [onValueChange]
    );

    const label = getSelectLabel(children, value);

    return (
        <>
            <Emitter
                label={label}
                ref={wrapperRef}
                {...emitterProps}
                isButton
                onClick={handleMenuOpen}
                disabled={disabled}
            />
            <DarkContext.Provider value={false}>
                <Menu
                    open={isMenuVisible}
                    onClose={onCloseSelect}
                    onValueSelect={onValueSelect}
                    referenceElement={wrapperRef.current}
                >
                    {children}
                </Menu>
            </DarkContext.Provider>
        </>
    );
}
