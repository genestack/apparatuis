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
import {chainRefs} from '../../utils/set-ref';
import {useControlledProp} from '../../utils/use-controlled-prop';
import {List} from '../list';
import {PopoverProps} from '../popover';
import {Suggest, SuggestProps} from '../suggest';

import {SuggestInputItem, Props as SuggestInputItemProps} from './suggest-input-item';

/**
 * Suggest component get their children with no knowledge of Downshift under the hood. To
 * achieve this abstraction, we clone those children and enrich them with props, provided
 * by Downshift.
 */
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
        // do not allow a child without value to be selected
        if (typeof childValue !== 'string') {
            return child;
        }

        const childProps = child.props as SuggestInputItemProps;

        index += 1;

        // `downshift.getItemProps` uses `AllHTMLProps` that are conflict with `SuggestInputItemProps`
        // we should omit the next properties:
        // `as` for <link /> elements
        // `wrap` for `<textarea />` elements
        const itemProps: Omit<SuggestInputItemProps, 'as' | 'wrap'> = {
            ...childProps,
            focused: downshift.highlightedIndex === index
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
    const [value, onValueChange] = useControlledProp(
        rest.value,
        rest.defaultValue || '',
        rest.onValueChange
    );
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
                const {rootRef, ...rootProps} = downshift.getRootProps(
                    {refKey: 'rootRef'},
                    {suppressRefError: true}
                );

                const inputProps = downshift.getInputProps<SuggestProps>({
                    ...rest,
                    onFocus: chain(rest.onFocus, handleInputFocus)
                });

                const inputPopoverProps = inputProps.popoverProps || {};

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

                const popoverProps: PopoverProps = {
                    ...inputPopoverProps,
                    ...menuProps,
                    rootRef: chainRefs(menuProps.rootRef, inputPopoverProps.rootRef),
                    keepMounted: true,
                    style: {
                        ...inputPopoverProps.style,
                        display: open ? 'block' : 'none'
                    }
                };

                // Downshift prevents default event behaviour on Escape key down regardless the open state.
                // Ignore downshift keydown handler for properly work the suggest into dialogs.
                const handleInputKeyDown: SuggestProps['onKeyDown'] = (event) => {
                    if (!open && event.key === 'Escape') {
                        if (rest.onKeyDown) {
                            rest.onKeyDown(event);
                        }
                    } else {
                        if (inputProps.onKeyDown) {
                            inputProps.onKeyDown(event);
                        }
                    }
                };

                return (
                    <Suggest
                        {...inputProps}
                        onKeyDown={handleInputKeyDown}
                        value={value}
                        onValueChange={onValueChange}
                        rootProps={{
                            ...rootProps,
                            ref: rootRef
                        }}
                        popoverProps={popoverProps}
                        open={open}
                    >
                        {open ? <List>{children}</List> : null}
                    </Suggest>
                );
            }}
        </Downshift>
    );
}
