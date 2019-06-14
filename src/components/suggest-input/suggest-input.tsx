/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import Downshift, {ControllerStateAndHelpers, StateChangeOptions} from 'downshift';
import * as React from 'react';

import {chain} from '../../utils/chain';
import {Omit} from '../../utils/omit';
import {useControlledProp} from '../../utils/use-controlled-prop';
import {List} from '../list';
import {Suggest, SuggestProps} from '../suggest';

import {SuggestInputItem, Props as SuggestInputItemProps} from './suggest-input-item';

function getSuggestInputChildren(
    children: React.ReactNode,
    downshift: ControllerStateAndHelpers<string>
) {
    let index = -1;

    return React.Children.map(children, (child) => {
        if (!React.isValidElement(child) || child.type !== SuggestInputItem) {
            return child;
        }

        const childValue = (child.props as SuggestInputItemProps).value;

        if (typeof childValue !== 'string') {
            return child;
        }

        const childProps = child.props as SuggestInputItemProps;

        index += 1;

        const itemProps: Omit<SuggestInputItemProps, 'as'> = {
            ...childProps,
            active: downshift.highlightedIndex === index
        };

        return React.cloneElement(child, {
            ...downshift.getItemProps({
                ...itemProps,
                index,
                item: childValue
            })
        });
    });
}

type SuggestInputChildren = React.ReactNode | ((value?: string) => React.ReactNode[]);

/** SuggestInput public properties */
export interface Props extends SuggestProps {
    /** Open suggest when user focuses in input */
    openOnFocus?: boolean;
    /** Calls when user selects a suggested item */
    onComplete?: (value: string) => void;
    /** Calls when open state is changed */
    onOpenChange?: (open: boolean) => void;
    children?: SuggestInputChildren;
}

/**
 * Binding Suggest implementation to
 * [downshift](https://github.com/downshift-js/downshift).
 *
 * It supports only string values.
 */
export function SuggestInput(props: Props) {
    const {onComplete, openOnFocus, onOpenChange, ...rest} = props;
    const [value, onValueChange] = useControlledProp(rest.value, rest.onValueChange);
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSelect = (item: string) => {
        if (rest.value === undefined) {
            onValueChange(item);
        }

        if (onComplete) {
            onComplete(item);
        }
    };

    const handleStateChange = (changes: StateChangeOptions<string>) => {
        if (changes.isOpen !== undefined) {
            setIsOpen(changes.isOpen);

            if (onOpenChange) {
                onOpenChange(changes.isOpen);
            }
        }
    };

    const handleInputFocus = () => {
        if (openOnFocus) {
            setIsOpen(true);

            if (onOpenChange) {
                onOpenChange(true);
            }
        }
    };

    return (
        <Downshift onSelect={handleSelect} isOpen={isOpen} onStateChange={handleStateChange}>
            {(downshift: ControllerStateAndHelpers<string>) => {
                const {rootRef, ...rootProps} = downshift.getRootProps({refKey: 'rootRef'});

                const inputProps = downshift.getInputProps<SuggestProps>({
                    ...rest,
                    onFocus: chain(rest.onFocus, handleInputFocus)
                });

                const children = isOpen
                    ? getSuggestInputChildren(
                          typeof rest.children === 'function'
                              ? rest.children(value)
                              : rest.children,
                          downshift
                      )
                    : null;

                const menuProps = downshift.getMenuProps({refKey: 'rootRef'});

                const open = !!children;

                return (
                    <Suggest
                        {...inputProps}
                        value={value}
                        onValueChange={onValueChange}
                        rootRef={rootRef}
                        rootProps={rootProps}
                        popoverProps={{
                            ...menuProps,
                            keepMounted: true,
                            style: {
                                display: open ? 'block' : 'none'
                            }
                        }}
                        open={open}
                    >
                        {open ? <List>{children}</List> : null}
                    </Suggest>
                );
            }}
        </Downshift>
    );
}
